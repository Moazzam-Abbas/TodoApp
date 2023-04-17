import { Command } from 'simple-command-bus';

export default class DeleteUserCommand extends Command {
    constructor(userId) {
        super();
        this.id = userId;
    }
}
