import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { todoRoute } from "./route/todo.route";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";
import { userRoute } from "./route/user.route";
import { authMiddleware } from "./middleware/authHandler";
import { requestContextMiddleware } from "./middleware/requestContext";
import { swaggerSpec } from "./config/swagger";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestContextMiddleware);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customCss: ".swagger-ui .topbar { display: none }",
    })
);

app.use("/api/v1/todos", authMiddleware, todoRoute);
app.use("/api/v1/users", userRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 8000, () =>
    console.log(`🚀 Server running at http://localhost:${process.env.PORT || 8000}`)
);
