import express from 'express';
import {
    deleteUser,
    getAllUser,
    getDetailUser,
    updateUser,
    accessForgotPassword,
    changePassword,
    createUser,
    forgotPassword,
    verify,
    active,
    getAllStaff,
    activeButton,
} from '../controllers/userController.js';

import { verifyAdmin, verifyToken, verifyUser } from '../utils/authenticate.js';
import { checkExistPhoneNumber, checkExistUser } from '../utils/checkExist.js';
import { checkUnActiveAccount } from '../utils/checkCreate.js';

const router = express.Router();

//Update user
router.put('/profile', checkExistPhoneNumber, verifyToken, updateUser);
router.post('/active', active);
router.get('/activebutton', verifyToken, checkUnActiveAccount, activeButton);
router.put('/changepassword', verifyToken, changePassword);
router.post('/forgotpassword', forgotPassword);
router.post('/forgotpassword/verify', verify);
router.post('/forgotpassword/success', accessForgotPassword);
router.post('/create', verifyToken, verifyAdmin, createUser);

router.delete('/:id', verifyToken, verifyUser, checkExistUser, deleteUser);

//Get single user
router.get('/:id', verifyToken, verifyUser, checkExistUser, getDetailUser);

//Get all user
router.get('/', verifyToken, verifyAdmin, getAllUser);
router.get('/messenger/chat', verifyToken, verifyUser, getAllStaff);

export default router;
