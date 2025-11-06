import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../model/response.model";
import { JWT_SECRET } from "../config/env";
import { setAuthContext } from "../utils/requestContext";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json(errorResponse<any>(401, "Unauthorized"));

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET as string) as { id: number; username: string };
        (req as any).user = decoded;
        setAuthContext({ userId: decoded.id, username: decoded.username });
        next();
    } catch (error: any) {
        return res.status(401).json(errorResponse<any>(401, error.message));
    }
}
