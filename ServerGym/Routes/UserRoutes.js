import express from 'express';
import {login,register} from '../controllers/UserControllers.js';
const router = express.Router();


// POST /users/signup - Sign up a new user
router.post('/signup',register);

// POST /users/login - Log in a user
router.post('/login',login);

// PUT /users/account - Modify user account
/* router.put('/account',); */

export default router;