import express from 'express';
import userService from '../../Service/user.service.js';
import {paginationMiddleware} from '../middleware/pagination.js';
import {container} from '../DI/container.js'
import CreateUserCommand from '../../Commands/CreateUser/CreateUserCommand.js';
import UpdateUserCommand from '../../Commands/UpdateUser/UpdateUserCommand.js';
import DeleteUserCommand from '../../Commands/DeleteUser/DeleteUserCommand.js';
import FetchUsersQuery from '../../Queries/FetchUsers/FetchUsersQuery.js';
import { authenticate } from '../middleware/authentications.js';
import * as errors from '../../Error/Errors.js'

const router = express.Router()
const commandBus = container.resolve('commandBus');
const queryBus = container.resolve('queryBus');
const user_Service = container.resolve('userService'); //check later should implement depency injection here too

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', authenticate, paginationMiddleware(user_Service), async (req, res, next) => {
  try {
    //const response = await user_Service.findAllUser(req);
    const query = new FetchUsersQuery();
    const response = await queryBus.execute(query);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }  
  
})

router.post('/', async (req, res, next) => {
  try {
    //throw new errors.InvalidPasswordError();
    //const response = await user_Service.createUser(req.body);
     const command = new CreateUserCommand(req.body.userName, req.body.password);
     const response = await commandBus.dispatch(command);
     res.status(201).send(response);
  } catch (error) {
    next(error);
  }
 
})

router.put('/:id', authenticate, async (req, res, next) => {
  try {
    //const response = await user_Service.UpdateUser({id:req.params.id, body:req.body});
    const command = new UpdateUserCommand(req.params.id, req.body)
    const response = await commandBus.dispatch(command);
    const { status, message } = response;
    res.status(status).send({message: message});
  } catch (error) {
    next(error);
  }
  
})

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    //const response = await user_Service.deleteUser(req.params.id);
    const command = new DeleteUserCommand(req.params.id)
    const response = await commandBus.dispatch(command);
    const { status, message } = response;
    res.status(status).send({message: message});
  } catch (error) {
    next(error);
  }
  
})


export {router}
