import { Pool } from "pg";
import "./env";

const useSSL = (() => {
    if (typeof process.env.POSTGRES_SSL === "string") {
        return process.env.POSTGRES_SSL.toLowerCase() === "true";
    }
    return process.env.NODE_ENV === "production";
})();

export const db = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
    ssl: useSSL ? { rejectUnauthorized: false } : undefined,
});
