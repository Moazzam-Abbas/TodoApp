import {container} from '../../Infrastructure/DI/container.js'

export default class TodoController {

    static commandBus = container.resolve('commandBus');
    static queryBus = container.resolve('queryBus');

    static async findAllTodos(req, res, next) {
      // Validate incoming request data
      try {
        const query = new FetchTodosQuery();
        const response = await queryBus.execute(query);
        res.status(200).send(response);  
      } catch (error) {
        next(error);
      }
    }
    
    static async createTodo(req, res, next) {
      // Validate incoming request data
      try {
        const command = new CreateTodoCommand(req.body.title, req.body.description, req.body.userId);
        const response = await commandBus.dispatch(command);
        res.status(201).send(response);
     } catch (error) {
       next(error);
     }
    }

    static async updateTodo(req, res, next) {
      // Validate incoming request data
      try {
        const command = new UpdateTodoCommand(req.params.id, req.body)
        const response = await commandBus.dispatch(command);
       // const { status, message } = response;
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    }

    static async deleteTodo(req, res, next) {
      // Validate incoming request data
      try {
        const command = new DeleteTodoCommand(req.params.id)
        const response = await commandBus.dispatch(command);
       // const { status, message } = response;
        res.status(204).send(response);
      } catch (error) {
        next(error);
      }
    }

}
