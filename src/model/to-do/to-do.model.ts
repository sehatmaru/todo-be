interface ToDo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date | null;
    deletedAt: Date | null;
}

export interface CreateToDo {
    title: string;
    description: string;
}

export interface UpdateToDo {
    title: string;
    description: string;
}

export default ToDo;
