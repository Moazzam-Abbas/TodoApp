import express from 'express';
//import userService from '../../Service/user.service.js';
import {paginationMiddleware} from '../middleware/pagination.js';
import {container} from '../../Infrastructure/DI/container.js'
import CreateUserCommand from '../../Application/Commands/User/CreateUser/CreateUserCommand.js';
import UpdateUserCommand from '../../Application/Commands/User/UpdateUser/UpdateUserCommand.js';
import DeleteUserCommand from '../../Application/Commands/User/DeleteUser/DeleteUserCommand.js';
import FetchUsersQuery from '../../Application/Queries/FetchUsers/FetchUsersQuery.js';
import { authenticate } from '../middleware/authentications.js';
import * as errors from '../../Infrastructure/Error/Errors.js'
import UserController from '../controller/User.controller.js';

const router = express.Router()
const commandBus = container.resolve('commandBus');
const queryBus = container.resolve('queryBus');
//const user_Service = container.resolve('userService'); //check later should implement depency injection here too

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', authenticate, paginationMiddleware(), UserController.findAllUsers)

router.post('/', UserController.createUser)

router.put('/:id', authenticate, UserController.updateUser)

router.delete('/:id', authenticate, UserController.deleteUser)


export {router}
