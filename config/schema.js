import { boolean, json } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

// Define the users table schema
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

// Define the courses table schema
export const coursesTable = pgTable("courses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    cid: varchar().notNull().unique(),
    name: varchar(),
    description: varchar(),
    chapters: integer().notNull(),
    includeVideo: boolean().default(false),
    level: varchar().notNull(),
    category: varchar(),
    courseJson: json(),
    courseContent: json(),
    imageURL: varchar().default(""),
    email: varchar("email").references(() => usersTable.email),
});

// Define the enrollToCourse table schema
export const enrollToCourseTable = pgTable("enrolToCourse", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    cid: varchar("cid").references(() => coursesTable.cid),
    email: varchar("email").references(() => usersTable.email),
    coursesDone: json(),
});