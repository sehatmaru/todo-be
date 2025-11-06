import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { todoController } from "../controller/todo.controller";

export const todoRoute = Router();

todoRoute.get("/", asyncHandler(todoController.findAll));
todoRoute.post("/", asyncHandler(todoController.create));
todoRoute.put("/:id", asyncHandler(todoController.update));
todoRoute.delete("/:id", asyncHandler(todoController.delete));
todoRoute.put("/:id/toggle-complete", asyncHandler(todoController.toggleComplete));
