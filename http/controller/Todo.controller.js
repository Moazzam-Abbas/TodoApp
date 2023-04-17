import {container} from '../../Infrastructure/DI/container.js'
import FetchTodosCommand from '../../Application/Commands/Todo/FetchTodos/FetchTodosCommand.js'
import CreateTodoCommand from '../../Application/Commands/Todo/CreateTodo/CreateTodoCommand.js'
import UpdateTodoCommand from '../../Application/Commands/Todo/UpdateTodo/UpdateTodoCommand.js'
import DeleteTodoCommand from '../../Application/Commands/Todo/DeleteTodo/DeleteTodoCommand.js'
import PaginatedFetchTodosCommand from '../../Application/Commands/Todo/FetchTodos/PaginatedFetchTodosCommand.js'


export default class TodoController {

    static commandBus = container.resolve('commandBus');

    static async findAllTodos(req, res, next) {
      // Validate incoming request data
      try {
        const command = new FetchTodosCommand();
        const response = await TodoController.commandBus.handle(command);
        res.status(200).send(response);  
      } catch (error) {
        next(error);
      }
    }
    
    static async createTodo(req, res, next) {
      // Validate incoming request data
      try {
        const command = new CreateTodoCommand(req.body.title, req.body.description, req.body.userId);
        const response = await TodoController.commandBus.handle(command);
        res.status(201).send(response);
     } catch (error) {
       next(error);
     }
    }

    static async updateTodo(req, res, next) {
      // Validate incoming request data
      try {
        const command = new UpdateTodoCommand(req.params.id, req.body)
        const response = await TodoController.commandBus.handle(command);
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    }

    static async deleteTodo(req, res, next) {
      // Validate incoming request data
      try {
        const command = new DeleteTodoCommand(req.params.id)
        const response = await TodoController.commandBus.handle(command);
        res.status(204).send(response);
      } catch (error) {
        next(error);
      }
    }

    static async paginatedAllTodos(req, res, next) {
      // Validate incoming request data
      try {
        const command = new PaginatedFetchTodosCommand(req.query.page, req.query.limit);
        const response = await TodoController.commandBus.handle(command);
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }

    }

}
