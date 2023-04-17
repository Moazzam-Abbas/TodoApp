import { Command } from 'simple-command-bus';

export default class UpdateTodoCommand extends Command {
    constructor(todoId, todoData) {
        super();
        this.todoId = todoId;
        this.todoData = todoData;
    }
}
