import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { authController } from "../controller/auth.controller";

export const userRoute = Router();

userRoute.post("/register", asyncHandler(authController.register));
userRoute.post("/login", asyncHandler(authController.login));
