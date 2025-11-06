export interface Response<T> {
    statusCode: number;
    message: string;
    data?: T;
}

export const successResponse = <T>(data: T): Response<T> => {
    return {
        statusCode: 200,
        message: "Success",
        data,
    };
};

export const errorResponse = <T>(statusCode: number, message: string): Response<T> => {
    return {
        statusCode,
        message,
        data: undefined,
    };
};
