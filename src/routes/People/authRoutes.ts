import { Router, Request, Response } from 'express';
// import { authMiddleware, isAdmin } from '../../middleware/auth';
import loginLimiter from '../../middleware/loginLimiter';
import { AuthController } from '../../controllers/People/users/authControllers';

const authController = new AuthController()

const router = Router();

// Registration User 
router.post("/register", loginLimiter, authController.registerUser);

// Login User 
router.post("/login", loginLimiter, authController.login);

// Logout User 
router.get("/logout", authController.logoutUser);

// Forgot Password
router.post("/forgotpassword", authController.forgotPassword);

// Reset Password
router.post("/resetPassword/:resetToken", authController.resetPassword);

// Reset Password
router.post("/resetPassword/:resetToken", authController.resetPassword);

// Verify User with OTP
router.post("/verifyUser/:verificationToken", authController.verifyUserWithOTP);

// Resend OTP to the user
router.post("/resendOtpToUser/:resendOtp", authController.resendOTP);

// send Login Code
router.post("/sendLoginCode/:email", loginLimiter, authController.sendLoginCode);

// Login with Code
router.post("/loginWithCode/:email", loginLimiter, authController.LoginWithCode);

// Login With Google
router.post("/google/callback", authController.loginWithGoogle);

export { router };
