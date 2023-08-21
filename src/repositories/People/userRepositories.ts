
import { UserInterface } from "../../interfaces /People/userInterface";

export default interface IUserRepository {
    // signUp(email: string, password: string): Promise<boolean>;
    // signIn(email: string, password: string): Promise<boolean>;
    getUser(userId: string): Promise<UserInterface>;
    getAllUsers(requestQuery: any): Promise<any>;
    // getUserId(username: string): Promise<string>;
    updateUser(payload: any, user: Partial<UserInterface>): Promise<any>;
    deleteUser(userId: string): Promise<void>;
}