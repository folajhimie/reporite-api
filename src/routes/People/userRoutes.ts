import { Router } from 'express';
import { authMiddleware, isAdmin, verifiedOnly } from '../../middleware/auth';
import loginLimiter from '../../middleware/loginLimiter';
import { UserController } from '../../controllers/People/users/userControllers';

const userController = new UserController()

const router = Router();

// Get All Users 
router.post("/getAllUsers", 
    loginLimiter, 
    authMiddleware, 
    verifiedOnly, 
    isAdmin("Admin"), 
    userController.getAllUsers
);

// Get User 
router.post("/getUser", 
    loginLimiter, 
    authMiddleware, 
    userController.getUser
);

// Update User 
router.post("/updateUser", 
    loginLimiter, 
    authMiddleware, 
    userController.updateUser
);

// Delete User
router.post("/deleteUser", 
    loginLimiter, 
    authMiddleware,
    verifiedOnly, 
    isAdmin("Admin"),  
    userController.deleteUser
);


export { router };
