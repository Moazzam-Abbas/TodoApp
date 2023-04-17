import { Command } from 'simple-command-bus';

export default class DeleteTodoCommand extends Command {
    constructor(todoId) {
        super();
        this.id = todoId;
    }
}
