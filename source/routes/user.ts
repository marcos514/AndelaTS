import express from 'express';
import Logger from '../config/logging';
import UserControler from '../controllers/user';
import extractJWT from '../middleware/extractJWT';
import { Schemas, ValidateJoi } from '../middleware/joi';

const router = express.Router();

const controller = new UserControler(new Logger('user_controller'));

router.post('/validate', extractJWT, controller.validateToken);
router.post('/register', ValidateJoi(Schemas.data), controller.register);
router.post('/login', ValidateJoi(Schemas.data), controller.login);
router.get('/get/all', controller.getAllUsers);

export = router;
