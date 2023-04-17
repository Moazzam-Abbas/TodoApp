import { CommandBus, CommandHandlerMiddleware, ClassNameExtractor, InMemoryLocator, HandleInflector, LoggerMiddleware } from 'simple-command-bus';
import { container } from '../../Infrastructure/DI/container.js';

function createCommandBus() {

  const commandHandlerMiddleware = new CommandHandlerMiddleware(
    new ClassNameExtractor(),
    new InMemoryLocator({ 
        FetchUsersHandler: container.resolve('FetchUsersHandler'),
        PaginatedFetchUsersHandler: container.resolve('PaginatedFetchUsersHandler'),
        CreateUserHandler: container.resolve('CreateUserHandler'),
        UpdateUserHandler: container.resolve('UpdateUserHandler'),
        DeleteUserHandler: container.resolve('DeleteUserHandler'),
        FetchTodosHandler: container.resolve('FetchTodosHandler'),
        PaginatedFetchTodosHandler: container.resolve('PaginatedFetchTodosHandler'),
        CreateTodoHandler: container.resolve('CreateTodoHandler'),
        UpdateTodoHandler: container.resolve('UpdateTodoHandler'),
        DeleteTodoHandler: container.resolve('DeleteTodoHandler')
      }),
    new HandleInflector()
  );

    // Command bus instance
  const commandBus = new CommandBus([
    new LoggerMiddleware(console),
    commandHandlerMiddleware
  ]);

  return commandBus;
}

export {createCommandBus}
