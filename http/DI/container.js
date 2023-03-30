import { createContainer, asClass, asFunction, asValue, InjectionMode } from 'awilix';
import UserService from '../../Service/user.service.js';
import TodoAppUserRepository from '../../Data/Repository/TodoAppUserRepository.js';
import TodoService from '../../Service/todo.service.js';
import TodoAppTodoRepository from '../../Data/Repository/TodoAppTodoRepository.js';
import TodoAppUserMongoRepository from '../../Data/Repository/TodoAppUserMongoRepository.js';
import TodoAppTodoMongoRepository from '../../Data/Repository/TodoAppTodoMongoRepository.js';

const container = createContainer();

container.register({
  todoRepo: asClass(TodoAppTodoRepository).setInjectionMode(InjectionMode.CLASSIC),
  todoService: asClass(TodoService).singleton().setInjectionMode(InjectionMode.CLASSIC),
  userRepo: asClass(TodoAppUserRepository).singleton().setInjectionMode(InjectionMode.CLASSIC),
  userService: asClass(UserService).singleton().setInjectionMode(InjectionMode.CLASSIC),
});

export {container}