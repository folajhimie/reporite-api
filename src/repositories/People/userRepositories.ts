
import { UserInterface } from "../../interfaces /People/userInterface";

export default interface IUserRepository {
    // signUp(email: string, password: string): Promise<boolean>;
    // signIn(email: string, password: string): Promise<boolean>;
    getUser(userId: string): Promise<UserInterface>;
    getAllUsers(pageQuery: number, limitQuery: number): Promise<object>;
    // getUserId(username: string): Promise<string>;
    updateUser(payload: any, user: Partial<UserInterface>): Promise<any>;
    deleteUser(userId: string): Promise<void>;
}