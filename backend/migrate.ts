import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "./src/db";

await migrate(db, { migrationsFolder: "./drizzle" });