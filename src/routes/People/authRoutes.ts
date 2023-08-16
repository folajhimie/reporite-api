import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../../middleware/auth'

const router = Router();

router.get('/', AuthMiddleware.currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser });
});

router.get('/protected', AuthMiddleware.currentUser, AuthMiddleware.requireAuth, (req: Request, res: Response) => {
  res.send({ message: 'You are authorized' });
});

export { router };
