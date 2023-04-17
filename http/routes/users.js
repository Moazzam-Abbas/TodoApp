import express from 'express';
//import userService from '../../Service/user.service.js';
import {paginationMiddleware} from '../middleware/pagination.js';
import { authenticate } from '../middleware/authentications.js';
import UserController from '../controller/User.controller.js';
import {userRegistrationValidation, userUpdateValidation, userDeleteValidation}from '../middleware/validations.js'

const router = express.Router()

router.get('/', authenticate, paginationMiddleware(), UserController.findAllUsers)

router.post('/', userRegistrationValidation, UserController.createUser)

router.put('/:id', authenticate, userUpdateValidation, UserController.updateUser)

router.delete('/:id', authenticate, userDeleteValidation, UserController.deleteUser)


export {router}
