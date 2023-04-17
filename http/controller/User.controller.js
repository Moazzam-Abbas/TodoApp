import {container} from '../../Infrastructure/DI/container.js'
import FetchUsersCommand from '../../Application/Commands/User/FetchUsers/FetchUsersCommand.js';
import CreateUserCommand from '../../Application/Commands/User/CreateUser/CreateUserCommand.js';
import UpdateUserCommand from '../../Application/Commands/User/UpdateUser/UpdateUserCommand.js';
import DeleteUserCommand from '../../Application/Commands/User/DeleteUser/DeleteUserCommand.js';
import PaginatedFetchUsersCommand from '../../Application/Commands/User/FetchUsers/PaginatedFetchUsersCommand.js';

export default class UserController {

    static commandBus = container.resolve('commandBus');


    static async findAllUsers(req, res, next) {
      // Validate incoming request data
      try {
        const command = new FetchUsersCommand();
        const response = await UserController.commandBus.handle(command);
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }  
    }
    
    static async createUser(req, res, next) {
      // Validate incoming request data
      try {
         const command = new CreateUserCommand(req.body.userName, req.body.password);
         const response = await UserController.commandBus.handle(command);
         res.status(201).send(response);
      } catch (error) {
        next(error);
      }
    }

    static async updateUser(req, res, next) {
      // Validate incoming request data
      try {
        const command = new UpdateUserCommand(req.params.id, req.body)
        const response = await UserController.commandBus.handle(command);
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    }

    static async deleteUser(req, res, next) {
      // Validate incoming request data
      try {
        const command = new DeleteUserCommand(req.params.id)
        const response = await UserController.commandBus.handle(command);
        res.status(204).send(response);
      } catch (error) {
        next(error);
      }
    }

    static async paginatedAllUsers(req, res, next) {
      // Validate incoming request data
      try {
        const command = new PaginatedFetchUsersCommand(req.query.page, req.query.limit);
        const response = await UserController.commandBus.handle(command);
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    }

}
