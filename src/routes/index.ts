import express from 'express';

import authentication from './People/authRoutes';
import users from './People/userRoutes';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);

    return router;
};