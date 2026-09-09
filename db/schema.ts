import { sql } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const checklistCompletions = sqliteTable(
  "checklist_completions",
  {
    itemId: text("item_id").notNull(),
    streamDate: text("stream_date").notNull(),
    completedBy: text("completed_by").notNull(),
    completedAt: text("completed_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [primaryKey({ columns: [table.itemId, table.streamDate] })],
);

export const onboardingProgress = sqliteTable(
  "onboarding_progress",
  {
    itemId: text("item_id").notNull(),
    userEmail: text("user_email").notNull(),
    completedAt: text("completed_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [primaryKey({ columns: [table.itemId, table.userEmail] })],
);

export const reminders = sqliteTable("reminders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  body: text("body").notNull(),
  status: text("status").notNull().default("open"),
  createdBy: text("created_by").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
export const dutyStatus = sqliteTable("duty_status", {
  userEmail: text("user_email").primaryKey(),
  displayName: text("display_name").notNull(),
  status: text("status").notNull().default("off-duty"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
