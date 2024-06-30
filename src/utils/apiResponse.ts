interface apiResponseInterface {
    statusCode: number,
    data: object,
    message?: string
}

class ApiResponse implements apiResponseInterface{
    statusCode: number;
    data: object;
    message?: string | undefined;

    constructor(statusCode: number, data: object, message: string = "Task completed successfully"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
    }
}

export default ApiResponse