import { db } from "../config/db";
import ToDo, { CreateToDo, UpdateToDo } from "../model/to-do/to-do.model";
import * as todoRepository from "../repository/todo.repository";

export const todoService = {
    async findAll(): Promise<ToDo[]> {
        return await todoRepository.findAll();
    },
    async create(req: CreateToDo): Promise<ToDo> {
        return await todoRepository.create(req);
    },
    async update(id: number, req: UpdateToDo): Promise<ToDo> {
        return await todoRepository.update(id, req);
    },
    async delete(id: number): Promise<boolean> {
        return await todoRepository.deleteToDo(id);
    },
    async toggleComplete(id: number): Promise<boolean> {
        return await todoRepository.toggleComplete(id);
    },
};
