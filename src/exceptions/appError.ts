export enum HttpCode {
    OK = 200, // The request succeeded. The result meaning of "success" depends on the HTTP method:
    NO_CONTENT = 204, // No content
    BAD_REQUEST = 400, // Bad Request The server cannot or will not process the request due to something that is perceived to be a client error
    UNAUTHORIZED = 401, // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
    FORBIDDEN = 403, // The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
    NOT_FOUND = 404, // The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
    UNPROCESSABLE = 422, // Unprocessable The request was well-formed but was unable to be followed due to semantic errors.
    INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorArgs {
    name?: string;
    httpCode: HttpCode;
    description: string;
    isOperational?: boolean;
}

export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;
    public readonly isOperational: boolean = true;

    constructor(args: AppErrorArgs) {
        super(args.description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = args.name || "Error";
        this.httpCode = args.httpCode;

        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }

        Error.captureStackTrace(this);
    }
}
