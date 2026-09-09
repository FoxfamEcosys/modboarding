import { headers } from "next/headers";
import ModboardingApp from "./modboarding-app";

export const dynamic = "force-dynamic";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email") ?? "preview@local";
  const encodedName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName = encodedName && requestHeaders.get("oai-authenticated-user-full-name-encoding") === "percent-encoded-utf-8"
    ? decodeURIComponent(encodedName)
    : null;
  return <ModboardingApp user={{ email, name: fullName ?? (email === "preview@local" ? "Veri" : email.split("@")[0]) }} />;
}
