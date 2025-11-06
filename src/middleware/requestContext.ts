import { NextFunction, Request, Response } from "express";
import { runWithRequestContext } from "../utils/requestContext";

export function requestContextMiddleware(req: Request, res: Response, next: NextFunction) {
    runWithRequestContext(() => next());
}
