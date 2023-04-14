import * as dotenv from 'dotenv'
dotenv.config()
import { createContainer, asClass, asFunction, asValue, InjectionMode } from 'awilix';
import { OAuth2Client } from 'google-auth-library'
import { WebClient } from '@slack/web-api';
import TodoAppUserRepository from '../../Infrastructure/Data/Repository/MySql/TodoAppUserRepository.js';
import TodoAppTodoRepository from '../../Infrastructure/Data/Repository/MySql/TodoAppTodoRepository.js';
import TodoAppUserMongoRepository from '../../Infrastructure/Data/Repository/Mongo/TodoAppUserMongoRepository.js';
import TodoAppTodoMongoRepository from '../../Infrastructure/Data/Repository/Mongo/TodoAppTodoMongoRepository.js';
import { createCommandBus } from '../../Application/Commands/command_Bus.js';
import { createQueryBus } from '../../Application/Queries/query_Bus.js';
import CreateUserCommandHandler from '../../Application/Commands/User/CreateUser/CreateUserCommandHandler.js';
import UpdateUserCommandHandler from '../../Application/Commands/User/UpdateUser/UpdateUserCommandHandler.js';
import DeleteUserCommandHandler from '../../Application/Commands/User/DeleteUser/DeleteUserCommandHandler.js';
import CreateTodoCommandHandler from '../../Application/Commands/Todo/CreateTodo/CreateTodoCommandHandler.js';
import UpdateTodoCommandHandler from '../../Application/Commands/Todo/UpdateTodo/UpdateTodoCommandHandler.js';
import DeleteTodoCommandHandler from '../../Application/Commands/Todo/DeleteTodo/DeleteTodoCommandHandler.js';
import FetchUsersQueryHandler from '../../Application/Queries/FetchUsers/FetchUsersQueryHandler.js';
import PaginatedFetchUsersQueryHandler from '../../Application/Queries/FetchUsers/PaginatedFetchUsersQueryHandler.js';
import FetchTodosQueryHandler from '../../Application/Queries/FetchTodos/FetchTodosQueryHandler.js';
import PaginatedFetchTodosQueryHandler from '../../Application/Queries/FetchTodos/PaginatedFetchTodosQueryHandler.js';
import EmailNotifier from '../Notifiers/emailNotifier.js';
import SlackNotifier from '../Notifiers/slackNotifier.js';
import {createNotificationService} from '../Notifications/notication_service.js';

const container = createContainer();

container.register({
  googleOAuth2Client: asValue(new OAuth2Client({ clientId: process.env.Google_Client_ID, clientSecret: process.env.Google_Client_SECRET, redirectUri: process.env.Google_Client_REDIRECTURI,
  })),
  slackClient: asValue(new WebClient(process.env.SLACK_BOT_TOKEN)),
  emailNotifier: asClass(EmailNotifier).singleton().setInjectionMode(InjectionMode.CLASSIC),
  slackNotifier: asClass(SlackNotifier).singleton().setInjectionMode(InjectionMode.CLASSIC),
  todoRepo: asClass(TodoAppTodoRepository).setInjectionMode(InjectionMode.CLASSIC),
  userRepo: asClass(TodoAppUserRepository).singleton().setInjectionMode(InjectionMode.CLASSIC),
  notificationService: asFunction(createNotificationService).singleton().setInjectionMode(InjectionMode.CLASSIC),
  commandBus: asFunction(createCommandBus).singleton().setInjectionMode(InjectionMode.CLASSIC),
  queryBus: asFunction(createQueryBus).singleton().setInjectionMode(InjectionMode.CLASSIC),
  createUserCommandHandler: asClass(CreateUserCommandHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  updateUserCommandHandler: asClass(UpdateUserCommandHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  deleteUserCommandHandler: asClass(DeleteUserCommandHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  createTodoCommandHandler: asClass(CreateTodoCommandHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  updateTodoCommandHandler: asClass(UpdateTodoCommandHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  deleteTodoCommandHandler: asClass(DeleteTodoCommandHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  fetchUsersQueryHandler: asClass(FetchUsersQueryHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  paginatedFetchUsersQueryHandler: asClass(PaginatedFetchUsersQueryHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  fetchTodosQueryHandler: asClass(FetchTodosQueryHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  paginatedFetchTodosQueryHandler: asClass(PaginatedFetchTodosQueryHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
});

export {container}
