import { Command } from 'simple-command-bus';

export default class UpdateUserCommand extends Command {
    constructor(userId, userData) {
        super();
        this.userId = userId;
        this.userData = userData;
    }
}
