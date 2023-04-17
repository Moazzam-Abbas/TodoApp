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
import CreateUserHandler from '../../Application/Commands/User/CreateUser/CreateUserHandler.js';
import UpdateUserHandler from '../../Application/Commands/User/UpdateUser/UpdateUserHandler.js';
import DeleteUserHandler from '../../Application/Commands/User/DeleteUser/DeleteUserHandler.js';
import CreateTodoHandler from '../../Application/Commands/Todo/CreateTodo/CreateTodoHandler.js';
import UpdateTodoHandler from '../../Application/Commands/Todo/UpdateTodo/UpdateTodoHandler.js';
import DeleteTodoHandler from '../../Application/Commands/Todo/DeleteTodo/DeleteTodoHandler.js';
import FetchUsersHandler from '../../Application/Commands/User/FetchUsers/FetchUsersHandler.js';
import PaginatedFetchUsersHandler from '../../Application/Commands/User/FetchUsers/PaginatedFetchUsersHandler.js';
import FetchTodosHandler from '../../Application/Commands/Todo/FetchTodos/FetchTodosHandler.js';
import PaginatedFetchTodosHandler from '../../Application/Commands/Todo/FetchTodos/PaginatedFetchTodosHandler.js';
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
  CreateUserHandler: asClass(CreateUserHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  UpdateUserHandler: asClass(UpdateUserHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  DeleteUserHandler: asClass(DeleteUserHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  CreateTodoHandler: asClass(CreateTodoHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  UpdateTodoHandler: asClass(UpdateTodoHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  DeleteTodoHandler: asClass(DeleteTodoHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  FetchUsersHandler: asClass(FetchUsersHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  PaginatedFetchUsersHandler: asClass(PaginatedFetchUsersHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  FetchTodosHandler: asClass(FetchTodosHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
  PaginatedFetchTodosHandler: asClass(PaginatedFetchTodosHandler).singleton().setInjectionMode(InjectionMode.CLASSIC),
});

export {container}
