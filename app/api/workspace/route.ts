import { and, asc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { getDb } from "../../../db";
import { checklistCompletions, dutyStatus, onboardingProgress, reminders } from "../../../db/schema";

async function currentUser() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedName = requestHeaders.get("oai-authenticated-user-full-name");
  const encoded = requestHeaders.get("oai-authenticated-user-full-name-encoding") === "percent-encoded-utf-8";
  if (!email && process.env.NODE_ENV === "production") return null;
  return {
    email: email ?? "preview@local",
    name: encodedName && encoded ? decodeURIComponent(encodedName) : email?.split("@")[0] ?? "Preview Mod",
  };
}

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) return Response.json({ error: "Authentication required" }, { status: 401 });
  const date = new URL(request.url).searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
  try {
    const db = getDb();
    const [checklist, onboarding, reminderRows, dutyRows] = await Promise.all([
      db.select().from(checklistCompletions).where(eq(checklistCompletions.streamDate, date)),
      db.select().from(onboardingProgress).where(eq(onboardingProgress.userEmail, user.email)),
      db.select().from(reminders).where(eq(reminders.status, "open")).orderBy(asc(reminders.id)).limit(12),
      db.select().from(dutyStatus).orderBy(asc(dutyStatus.displayName)),
    ]);
    return Response.json({ checklist, onboarding, reminders: reminderRows, duty: dutyRows, mode: "shared" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Workspace data unavailable";
    return Response.json({ error: message }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return Response.json({ error: "Authentication required" }, { status: 401 });
  const payload = (await request.json()) as Record<string, unknown>;
  const db = getDb();

  if (payload.action === "toggle-checklist") {
    const itemId = String(payload.itemId ?? "");
    const streamDate = String(payload.streamDate ?? "");
    const completed = Boolean(payload.completed);
    if (!itemId || !streamDate) return Response.json({ error: "Missing checklist fields" }, { status: 400 });
    if (completed) {
      await db.insert(checklistCompletions).values({ itemId, streamDate, completedBy: user.email }).onConflictDoNothing();
    } else {
      await db.delete(checklistCompletions).where(and(eq(checklistCompletions.itemId, itemId), eq(checklistCompletions.streamDate, streamDate)));
    }
  } else if (payload.action === "toggle-onboarding") {
    const itemId = String(payload.itemId ?? "");
    const completed = Boolean(payload.completed);
    if (!itemId) return Response.json({ error: "Missing onboarding item" }, { status: 400 });
    if (completed) {
      await db.insert(onboardingProgress).values({ itemId, userEmail: user.email }).onConflictDoNothing();
    } else {
      await db.delete(onboardingProgress).where(and(eq(onboardingProgress.itemId, itemId), eq(onboardingProgress.userEmail, user.email)));
    }
  } else if (payload.action === "add-reminder") {
    const body = String(payload.body ?? "").trim();
    if (!body) return Response.json({ error: "Reminder cannot be empty" }, { status: 400 });
    await db.insert(reminders).values({ body, createdBy: user.email });
  } else if (payload.action === "resolve-reminder") {
    await db.update(reminders).set({ status: "done" }).where(eq(reminders.id, Number(payload.id)));
  } else if (payload.action === "duty-status") {
    const status = String(payload.status ?? "off-duty");
    if (!["on-duty", "break", "off-duty"].includes(status)) return Response.json({ error: "Invalid duty status" }, { status: 400 });
    await db.insert(dutyStatus).values({ userEmail: user.email, displayName: user.name, status }).onConflictDoUpdate({
      target: dutyStatus.userEmail,
      set: { displayName: user.name, status, updatedAt: new Date().toISOString() },
    });
  } else {
    return Response.json({ error: "Unknown action" }, { status: 400 });
  }

  return Response.json({ ok: true });
}
