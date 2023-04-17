import { Command } from 'simple-command-bus';

export default class CreateTodoCommand extends Command {
    constructor(title, description, userId) {
      super();
      this.title = title;
      this.description = description;
      this.userId = userId;

    }
}
