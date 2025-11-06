import { Request, Response, NextFunction } from "express";
import { todoService } from "../service/todo.service";
import { errorResponse, successResponse } from "../model/response.model";
import ToDo, { CreateToDo } from "../model/to-do/to-do.model";
import * as authService from "../service/auth.service";
import { CreateUser, LoginUser } from "../model/auth/auth.model";

export const authController = {
    async register(req: Request<CreateUser>, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await authService.register(username.toLowerCase(), password)
        
        return res.status(200).json(successResponse(user));
    } catch (error: any) {
        return res.status(500).json(errorResponse(500, error.message));
    }
}
, async login(req: Request<LoginUser>, res: Response) {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const token = await authService.login(username.toLowerCase(), password)

        return res.status(201).json(successResponse<string>(token));
    } catch (error: any) {
        console.log(error);
        return res.status(500).json(errorResponse<string>(500, error.message));
    }
},
}