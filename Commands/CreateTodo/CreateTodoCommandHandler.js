import { v1 as uuidv1 } from 'uuid';
import UserFactory from '../../Service/Factories/UserFactory.js';
import * as errors from '../../Error/Errors.js'
import { container } from '../../http/DI/container.js';

export default class CreateTodoCommandHandler {

    constructor(todoService) {
     this.todoService = todoService
     this.userFactory = container.resolve('userFactory')
    }

    async handle(command) {
      this.todoService.isValidTodoCommand(command)
      const todo = await this.userFactory.createTodo({ title: command.title, description: command.description, userId: command.userId})
      this.todoService.isValidTodo(todo)
      return await this.todoService.create(todo);
    }
    
  }
