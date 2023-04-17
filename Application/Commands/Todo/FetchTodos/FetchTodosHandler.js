
export default class FetchTodosHandler {

    constructor(todoRepo) {
       this.repo = todoRepo;
      }

    async handle(command) {

      return await this.repo.findAllTodoItem()
      
    }
  }
