interface User {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface CreateUser {
    username: string;
    password: string;
}

export interface LoginUser {
    username: string;
    password: string;
}

export default User;