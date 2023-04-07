export default class DeleteTodoCommandHandler {

    constructor(todoService) {
      this.todoService = todoService;
      }

    async handle(command) {
      this.todoService.isValidTodoDeleteCommand(command)
      return await this.todoService.deleteOne(command);
    }
  }
