export default class FetchTodosQueryHandler {

    constructor(todoService) {
       this.todoService = todoService;
      }

    async execute() {
      return await this.todoService.findAll();
    }
  }
