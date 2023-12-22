import { Router } from 'express';
import { authMiddleware, isAdmin, verifiedOnly } from '../../middleware/auth';
import loginLimiter from '../../middleware/loginLimiter';
import { UserController } from '../../controllers/People/users/userControllers';

const userController = new UserController()

// const router = Router();

export default (router: Router) => {
    // Get All Users 
    router.get("/api/v1/users/get-all-users",
        loginLimiter,
        // authMiddleware,
        // verifiedOnly,
        // isAdmin("Admin"),
        userController.getAllUsers
    );

    // Get User 
    router.get("/api/v1/users/get-user",
        loginLimiter,
        authMiddleware,
        userController.getUser
    );

    // Update User 
    router.put("/api/v1/users/update-user/:userId",
        loginLimiter,
        authMiddleware,
        userController.updateUser
    );

    // Delete User
    router.delete("/api/v1/users/delete-user/:userId",
        loginLimiter,
        authMiddleware,
        verifiedOnly,
        isAdmin("Admin"),
        userController.deleteUser
    );
};
