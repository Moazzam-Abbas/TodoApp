
export default class UpdateTodoHandler {

    constructor(todoRepo) {
       this.repo = todoRepo;
      }

    async handle(command) {

      return await this.repo.UpdateTodoItem(command)
      
    }
  }
