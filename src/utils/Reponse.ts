import { IUserInterface } from "../interfaces/People/userInterface";
import { Request } from "express";
interface IResponse<T> {
    data: T[];
    meta: {
        total: number;
        limit: number;
        totalPages: number;
        currentPage: number;
    };
}


type UserPreview = Partial<IUserInterface>

//SEND RESPONSE FOR LIST
export const jsonAll = function <T>(
    res: any,
    status: number,
    data: T | Array<T>,
    meta: Object = {}
): IResponse<T> {
    return res.status(status).json({
        data: data,
        meta: {
            ...meta,
        },
    });
};

//SEND RESPONSE FOR DETAIL
export const jsonOne = function <T>(
    res: any, 
    status: number, 
    data: T 
): IResponse<T> {
    return res.status(status).json({
        data,
    });
};

export const jsonErrorResponse = function <T>(
    res: Request | any, 
    status: number, 
    message: string 
): IResponse<T> {
    return res.status(status).json({
        status: false,
        message: message,
    });
};

