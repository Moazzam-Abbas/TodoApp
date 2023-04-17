import { Command } from 'simple-command-bus';

export default class PaginatedFetchUsersCommand extends Command {
    constructor(requestPage, requestlimit) {
        super();
        this.requestPage = requestPage;
        this.requestlimit = requestlimit;
    }
}
