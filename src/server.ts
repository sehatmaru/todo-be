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

app.get("/api-docs", (req, res) => {
    const swaggerJsonUrl = "/swagger.json";

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>API Docs</title>
                <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
                <style>.swagger-ui .topbar { display: none }</style>
            </head>
            <body>
                <div id="swagger-ui"></div>
                <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
                <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>
                <script>
                    window.onload = () => {
                        SwaggerUIBundle({
                            url: '${swaggerJsonUrl}',
                            dom_id: '#swagger-ui'
                        });
                    };
                </script>
            </body>
        </html>
    `);
});

// Serve your Swagger JSON definition
app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

app.use("/api/v1/todos", authMiddleware, todoRoute);
app.use("/api/v1/users", userRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 8000, () =>
    console.log(`🚀 Server running at http://localhost:${process.env.PORT || 8000}`)
);
