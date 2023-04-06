import { createContainer, asClass, asFunction, asValue, InjectionMode } from 'awilix';
import TodoAppUserRepository from '../../Data/Repository/TodoAppUserRepository.js';
import UserService from '../../Service/user.service.js';
import TodoService from '../../Service/todo.service.js';
import TodoAppTodoRepository from '../../Data/Repository/TodoAppTodoRepository.js';
import TodoAppUserMongoRepository from '../../Data/Repository/TodoAppUserMongoRepository.js';
import TodoAppTodoMongoRepository from '../../Data/Repository/TodoAppTodoMongoRepository.js';
import { createCommandBus } from '../../Commands/command_Bus.js';
import { createQueryBus } from '../../Queries/query_Bus.js';
import CreateUserCommandHandler from '../../Commands/CreateUser/CreateUserCommandHandler.js';
import UpdateUserCommandHandler from '../../Commands/UpdateUser/UpdateUserCommandHandler.js';
import DeleteUserCommandHandler from '../../Commands/DeleteUser/DeleteUserCommandHandler.js';
import FetchUsersQueryHandler from '../../Queries/FetchUsers/FetchUsersQueryHandler.js';
import UserFactory from '../../Service/Factories/UserFactory.js';

const container = createContainer();

container.register({
  userFactory: asClass(UserFactory).singleton().setInjectionMode(InjectionMode.CLASSIC),
  todoRepo: asClass(TodoAppTodoRepository).setInjectionMode(InjectionMode.CLASSIC),
  todoService: asClass(TodoService).singleton().setInjectionMode(InjectionMode.CLASSIC),
  userRepo: asClass(TodoAppUserRepository).singleton().setInjectionMode(InjectionMode.CLASSIC),
  userService: asClass(UserService).singleton().setInjectionMode(InjectionMode.CLASSIC),
  commandBus: asFunction(createCommandBus).singleton().setInjectionMode(InjectionMode.CLASSIC),
  queryBus: asFunction(createQueryBus).singleton().setInjectionMode(InjectionMode.CLASSIC),
  createUserCommandHandler: asClass(CreateUserCommandHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  updateUserCommandHandler: asClass(UpdateUserCommandHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  deleteUserCommandHandler: asClass(DeleteUserCommandHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  fetchUsersQueryHandler: asClass(FetchUsersQueryHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
});

export {container}
