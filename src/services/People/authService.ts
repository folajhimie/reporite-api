import  User from "../../models/People/user";
import IAuthRepository from "../../repositories/People/authRepositories";
import { UserInterface } from "../../interfaces /People/userInterface";
import { AppError, HttpCode } from "../../exceptions/appError";






class UserRepository implements IAuthRepository{
    private users: UserInterface[] = [];

    public async createUser(user: UserInterface): Promise<UserInterface> {
        const { 
            username,
            email, 
            phone,
            password, 
            confirmPassword,
            isAdmin, 
            active
        } = user;


        // Check if user with email already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'User with email already existsAuthentication failed' });
        }

        // Generate unique ID for new user
        const id = Math.random().toString(36).substr(2);

        // Create new user object with generated ID
        const newUser: User = {
            id,
            name: username,
            email: user.email,
            password: user.password,
        };

        // Add new user to repository
        this.users.push(newUser);

        // Return new user object
        return newUser;
    }

    // public async findOne(email: string): Promise<User | undefined> {
    //     // Find user with matching email
    //     const foundUser = this.users.find(user => user.email === email);

    //     // Return found user or undefined if not found
    //     return foundUser;
    // }
}








// class UserRepository  {
//     // private users: UserInterface[] = [];
//     private users: User[] = [];


//     async createUser(user: Omit<UserInterface, 'id'>): Promise<UserInterface>  {
//         // const { 
//         //     username,
//         //     email, 
//         //     phone,
//         //     password, 
//         //     confirmPassword,
//         //     isAdmin, 
//         //     active
//         // } = user;

//         const existingUser = await this.findOne(user.email);
//     if (existingUser) {
//       throw new Error('User with email already exists');
//     }


//         return user
//     }

    // public loginUser(username: string, password: string): UserInterface {
    //     const user = this.users.find(
    //         (u) => u.username === username && u.password === password
    //     );
    //     return user ? { ...user } : null;
    // }

    // public getUser(id: string): User | null {
    //     const user = this.users.find((u) => u.id === id);
    //     return user ? { ...user } : null;
    // }

    // public getUserId(username: string): string | null {
    //     const user = this.users.find((u) => u.username === username);
    //     return user ? user.id : null;
    // }

    // public updateUser(id: string, updates: Partial<User>): User | null {
    //     const index = this.users.findIndex((u) => u.id === id);
    //     if (index !== -1) {
    //         const updatedUser = { ...this.users[index], ...updates };
    //         this.users[index] = updatedUser;
    //         return updatedUser;
    //     }
    //     return null;
    // }

    // public deleteUser(id: string): boolean {
    //     const index = this.users.findIndex((u) => u.id === id);
    //     if (index !== -1) {
    //         this.users.splice(index, 1);
    //         return true;
    //     }
    //     return false;
    // }
}