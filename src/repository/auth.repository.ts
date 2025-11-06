import { db } from "../config/db";
import bcrypt from "bcrypt";

export async function findByUsername(username: string) {
    const result = await db.query(
        "SELECT * FROM users WHERE username = $1 AND deleted_at IS NULL LIMIT 1",
        [username]
    );

    return result.rows[0];
}

export async function create(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
    );

    return result.rows;
}
