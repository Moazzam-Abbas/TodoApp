import {container} from '../../Infrastructure/DI/container.js'
import FetchUsersQuery from '../../Application/Queries/FetchUsers/FetchUsersQuery.js';

export default class UserController {

    static commandBus = container.resolve('commandBus');
    static queryBus = container.resolve('queryBus');

    static async findAllUsers(req, res, next) {
      // Validate incoming request data
      try {
        //const response = await user_Service.findAllUser(req);
        const query = new FetchUsersQuery();
        const response = await queryBus.handle(query);
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }  
    }
    
    static async createUser(req, res, next) {
      // Validate incoming request data
      try {
        //throw new errors.InvalidPasswordError();
        //const response = await user_Service.createUser(req.body);
         const command = new CreateUserCommand(req.body.userName, req.body.password);
         const response = await commandBus.dispatch(command);
         res.status(201).send(response);
      } catch (error) {
        next(error);
      }
    }

    static async updateUser(req, res, next) {
      // Validate incoming request data
      try {
        //const response = await user_Service.UpdateUser({id:req.params.id, body:req.body});
        const command = new UpdateUserCommand(req.params.id, req.body)
        const response = await commandBus.dispatch(command);
        //const { status, message } = response;
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    }

    static async deleteUser(req, res, next) {
      // Validate incoming request data
      try {
        //const response = await user_Service.deleteUser(req.params.id);
        const command = new DeleteUserCommand(req.params.id)
        const response = await commandBus.dispatch(command);
        //const { status, message } = response;
        res.status(204).send(response);
      } catch (error) {
        next(error);
      }
    }

}
