export default class CommandBus {
    constructor() {
      this.handlers = {};
    }
  
    registerHandler(commandName, handler) {
      this.handlers[commandName] = handler;
    }
  
    async dispatch(command) {
      const handler = this.handlers[command.constructor.name];
      if (!handler) {
        throw new Error(`No handler registered for command ${command.constructor.name}`);
      }
      return handler.handle(command);
    }
  }