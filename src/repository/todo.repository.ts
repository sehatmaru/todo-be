import { db } from "../config/db";
import ToDo, { CreateToDo, UpdateToDo } from "../model/to-do/to-do.model";
import { getUserId } from "../utils/requestContext";

export async function findAll(): Promise<ToDo[]> {
    const userId = getUserId();

    const result = await db.query(
        "SELECT * FROM todos WHERE deleted_at IS NULL AND user_id = $1 ORDER BY created_at DESC",
        [userId]
    );

    return result.rows.map(
        (row: any): ToDo => ({
            id: row.id,
            title: row.title,
            description: row.description,
            completed: Boolean(row.completed),
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
            completedAt: row.completed_at ? new Date(row.completed_at) : null,
            deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
        })
    );
}

export async function create(req: CreateToDo): Promise<ToDo> {
    const userId = getUserId();

    const result = await db.query(
        "INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
        [req.title, req.description, userId]
    );

    const row = result.rows[0];

    return {
        id: row.id,
        title: row.title,
        description: row.description,
        completed: Boolean(row.completed),
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        completedAt: row.completed_at ? new Date(row.completed_at) : null,
        deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
    };
}

export async function update(id: number, req: UpdateToDo): Promise<ToDo> {
    const userId = getUserId();

    const result = await db.query(
        "UPDATE todos SET title = $1, description = $2, updated_at = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
        [req.title, req.description, new Date(), id, userId]
    );

    const row = result.rows[0];

    return {
        id: row.id,
        title: row.title,
        description: row.description,
        completed: Boolean(row.completed),
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        completedAt: row.completed_at ? new Date(row.completed_at) : null,
        deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
    };
}

export async function deleteToDo(id: number): Promise<boolean> {
    const userId = getUserId();

    const result = await db.query(
        "UPDATE todos SET deleted_at = now() WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL",
        [id, userId]
    );

    return result.rowCount > 0;
}

export async function toggleComplete(id: number): Promise<boolean> {
    const userId = getUserId();

    const todo = await db.query(
        "SELECT * FROM todos WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL",
        [id, userId]
    );

    if (todo.rowCount === 0) {
        throw new Error("To-do not found");
    }

    const completed = todo.rows[0].completed;

    const result = await db.query(
        "UPDATE todos SET completed = $1, completed_at = CASE WHEN $1 THEN NOW() ELSE NULL END WHERE id = $2 AND user_id = $3",
        [!completed, id, userId]
    );

    return result.rowCount > 0;
}
