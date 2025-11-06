import { Pool } from "pg";

export const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todo_app",
    password: "Adapund!2023",
    port: 5432,
});
