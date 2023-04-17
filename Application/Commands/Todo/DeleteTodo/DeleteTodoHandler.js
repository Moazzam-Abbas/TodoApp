
export default class DeleteTodoHandler {

    constructor(todoRepo) {
      this.repo = todoRepo;
      }

    async handle(command) {

      return await this.repo.deleteTodoItem(command)
      
    }
  }
