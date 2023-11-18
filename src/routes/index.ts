import express from 'express';

import authentication from './People/authRoutes';
import users from './People/userRoutes';
import business from "./Business/businessRoutes"

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    business(router);

    return router;
};