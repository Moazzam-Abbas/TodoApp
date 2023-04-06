export default class QueryBus {
    constructor() {
      this.handlers = {};
    }
  
    registerHandler(queryName, handler) {
      this.handlers[queryName] = handler;
    }
  
    async execute(query) {
      const handler = this.handlers[query.constructor.name];
      if (!handler) {
        throw new Error(`No handler registered for query ${query.constructor.name}`);
      }
      return handler.execute(query);
    }
  }