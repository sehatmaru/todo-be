import * as authRepository from "../repository/auth.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export async function register(username: string, password: string) {
    const exist = await authRepository.findByUsername(username);
    if (exist) throw new Error("Username already exists");

    const result = await authRepository.create(username, password);
    return result[0];
}

export async function login(username: string, password: string) {
    const user = await authRepository.findByUsername(username);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    return token;
}
