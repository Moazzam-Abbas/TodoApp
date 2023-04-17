import { Command } from 'simple-command-bus';

export default class CreateUserCommand extends Command {
    constructor(userName, password) {
      super();
      this.userName = userName;
      this.password = password;
    }
}
