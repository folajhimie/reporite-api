import { Router } from 'express';
// import { authMiddleware, isAdmin } from '../../middleware/auth';
import loginLimiter from '../../middleware/loginLimiter';
import { AuthController } from '../../controllers/People/users/authControllers';
import { validateCreateUser } from '../../validator/user/AuthValidator';
import { body as bodyValidator, ResultFactory, validationResult } from 'express-validator';
const authController = new AuthController()

export default (router: Router) => {
  // Registration User 
  router.post("/api/v1/auth/register", 
  
    validateCreateUser,
    loginLimiter, 
    authController.registerUser
  );

  // Login User 
  router.post("/api/v1/auth/login", 
    loginLimiter, 
    authController.login
  );

  // Logout User 
  router.get("/api/v1/auth/logout", 
    authController.logoutUser
  );

  // Forgot Password
  router.post("/api/v1/auth/forgotpassword", 
    authController.forgotPassword
  );

  // Reset Password
  router.post("/api/v1/auth/resetPassword/:resetToken", 
    authController.resetPassword
  );

  // Reset Password
  router.post("/api/v1/auth/resetPassword/:resetToken", 
    authController.resetPassword
  );

  // Verify User with OTP
  router.post("/api/v1/auth/verifyUser/:verificationToken", 
    authController.verifyUserWithOTP
  );

  // Resend OTP to the user
  router.post("/api/v1/auth/resendOtpToUser/:resendOtp", 
    authController.resendOTP
  );

  // send Login Code
  router.post("/api/v1/auth/sendLoginCode/:email", 
    loginLimiter, 
    authController.sendLoginCode
  );

  // Login with Code
  router.post("/api/v1/auth/loginWithCode/:email", 
    loginLimiter, 
    authController.LoginWithCode
  );

  // Login With Google
  router.post("/api/v1/auth/google/callback", 
    authController.loginWithGoogle
  );
};