import { Request, Response } from "express";
import { todoService } from "../service/todo.service";
import { errorResponse, successResponse } from "../model/response.model";
import ToDo, { CreateToDo, UpdateToDo } from "../model/to-do/to-do.model";

export const todoController = {
    async findAll(_req: Request, res: Response) {
        try {
            const todos = await todoService.findAll();

            return res.status(200).json(successResponse<ToDo[]>(todos));
        } catch (error: any) {
            return res.status(500).json(errorResponse<ToDo[]>(500, error.message));
        }
    },
    async create(req: Request<CreateToDo>, res: Response) {
        try {
            const todo = await todoService.create(req.body as CreateToDo);

            return res.status(201).json(successResponse<ToDo>(todo));
        } catch (error: any) {
            return res.status(500).json(errorResponse<ToDo>(500, error.message));
        }
    },
    async update(req: Request<{ id: number }, UpdateToDo>, res: Response) {
        try {
            const todo = await todoService.update(req.params.id, req.body as UpdateToDo);

            return res.status(200).json(successResponse<ToDo>(todo));
        } catch (error: any) {
            return res.status(500).json(errorResponse<ToDo>(500, error.message));
        }
    },
    async delete(req: Request<{ id: number }>, res: Response) {
        try {
            const result = await todoService.delete(req.params.id);

            return res.status(200).json(successResponse<boolean>(result));
        } catch (error: any) {
            return res.status(500).json(errorResponse<boolean>(500, error.message));
        }
    },
    async toggleComplete(req: Request<{ id: number }>, res: Response) {
        try {
            const result = await todoService.toggleComplete(req.params.id);

            return res.status(200).json(successResponse<boolean>(result));
        } catch (error: any) {
            return res.status(500).json(errorResponse<boolean>(500, error.message));
        }
    },
};
