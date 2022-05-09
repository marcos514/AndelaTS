import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';
import { Schemas, ValidateJoi } from '../middleware/joi';

const router = express.Router();

router.post('/validate', ValidateJoi(Schemas.data), extractJWT, controller.validateToken);
router.post('/register', ValidateJoi(Schemas.data), controller.register);
router.post('/login', ValidateJoi(Schemas.data), controller.login);
router.get('/get/all', controller.getAllUsers);

export = router;
