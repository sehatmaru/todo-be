import dotenv from "dotenv";

// Ensure environment variables are loaded exactly once at startup
dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured in environment");
}


