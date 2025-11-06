import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../model/response.model";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(500).json(errorResponse<any[]>(500, err.message));
};
