interface apiErrorInterface {
    statusCode: number,
    message: string,
    data?: string,
    error?: string[]
}

class ApiError extends Error implements apiErrorInterface {

    statusCode: number;
    message: string;
    data: string;
    error: string[];

    constructor(statusCode: number, message: string, data: string = "", error: string[] = [], stack: string = ''){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.error = error

        if(stack) this.stack = stack
        else Error.captureStackTrace(this, this.constructor)
    }
}

export default ApiError