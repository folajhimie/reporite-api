
import { IUserInterface } from "../../../interfaces/People/userInterface";

export default interface IUserRepository {
    // signUp(email: string, password: string): Promise<boolean>;
    // signIn(email: string, password: string): Promise<boolean>;
    getUser(userId: string): Promise<IUserInterface>;
    getAllUsers(requestQuery: any): Promise<any>;
    // getUserId(username: string): Promise<string>;
    updateUser(payload: any, user: Partial<IUserInterface>): Promise<any>;
    deleteUser(userId: string): Promise<void>;
}