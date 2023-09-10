import { UserInterface } from "../interfaces/People/userInterface";
interface IResponse<T> {
    data: T[];
    meta: {
        total: number;
        limit: number;
        totalPages: number;
        currentPage: number;
    };
}

// type fieldsToUpdate: Partial<UserInterface>

type UserPreview = Partial<UserInterface>

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

