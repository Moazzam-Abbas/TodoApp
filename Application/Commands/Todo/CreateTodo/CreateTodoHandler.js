import Todo from '../../../../Domain/Entities/Todo.js'

export default class CreateTodoHandler {

    constructor(todoRepo) {
     this.repo = todoRepo;
    }

    async handle(command) {

      const todo = Todo.createTodo({ title: command.title, description: command.description, userId: command.userId})
      Todo.isValidTodo(todo)
      return await this.repo.createTodoItem(todo)
      
    }
    
  }
