import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "To-Do List API",
            version: "1.0.0",
            description: "API documentation for the To-Do List application",
            contact: {
                name: "API Support",
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                ToDo: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        title: { type: "string", example: "Complete project" },
                        description: {
                            type: "string",
                            example: "Finish the to-do list application",
                        },
                        completed: { type: "boolean", example: false },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                        completedAt: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                        },
                        deletedAt: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                        },
                    },
                },
                CreateToDo: {
                    type: "object",
                    required: ["title", "description"],
                    properties: {
                        title: { type: "string", example: "Complete project" },
                        description: {
                            type: "string",
                            example: "Finish the to-do list application",
                        },
                    },
                },
                UpdateToDo: {
                    type: "object",
                    required: ["title", "description"],
                    properties: {
                        title: { type: "string", example: "Updated title" },
                        description: {
                            type: "string",
                            example: "Updated description",
                        },
                    },
                },
                CreateUser: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string", example: "johndoe" },
                        password: {
                            type: "string",
                            format: "password",
                            example: "securepassword123",
                        },
                    },
                },
                LoginUser: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string", example: "johndoe" },
                        password: {
                            type: "string",
                            format: "password",
                            example: "securepassword123",
                        },
                    },
                },
                SuccessResponse: {
                    type: "object",
                    properties: {
                        statusCode: { type: "integer", example: 200 },
                        message: { type: "string", example: "Success" },
                        data: { type: "object" },
                    },
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        statusCode: { type: "integer", example: 500 },
                        message: { type: "string", example: "Error message" },
                        data: {
                            type: "object",
                            nullable: true,
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: "Authentication",
                description: "User authentication endpoints",
            },
            {
                name: "Todos",
                description: "To-do list management endpoints",
            },
        ],
    },
    apis: ["./src/route/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
