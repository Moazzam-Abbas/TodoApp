import CommandBus from './CommandBus.js'
import CreateUserCommandHandler from './CreateUser/CreateUserCommandHandler.js'
import { container } from '../http/DI/container.js';

function createCommandBus() {
  const commandBus = new CommandBus();
  commandBus.registerHandler('CreateUserCommand', container.resolve('createUserCommandHandler'));
  commandBus.registerHandler('UpdateUserCommand', container.resolve('updateUserCommandHandler'));
  commandBus.registerHandler('DeleteUserCommand', container.resolve('deleteUserCommandHandler'));
  commandBus.registerHandler('CreateTodoCommand', container.resolve('createTodoCommandHandler'));
  commandBus.registerHandler('UpdateTodoCommand', container.resolve('updateTodoCommandHandler'));
  commandBus.registerHandler('DeleteTodoCommand', container.resolve('deleteTodoCommandHandler'));

  return commandBus;
}

export {createCommandBus}
