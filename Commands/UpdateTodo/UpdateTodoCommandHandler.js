export default class UpdateTodoCommandHandler {

    constructor(todoService) {
       this.todoService = todoService;
      }

    async handle(command) {
      this.todoService.isValidTodoUpdateCommand(command.todoData)
      return await this.todoService.update(command);
    }
  }
