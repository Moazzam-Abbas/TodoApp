import { Command } from 'simple-command-bus';

export default class PaginatedFetchTodosCommand extends Command {
    constructor(requestPage, requestlimit) {
        super();
        this.requestPage = requestPage;
        this.requestlimit = requestlimit;
    }
}
