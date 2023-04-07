import { v1 as uuidv1 } from 'uuid';
import UserFactory from '../../Service/Factories/UserFactory.js';
import * as errors from '../../Error/Errors.js'
import { container } from '../../http/DI/container.js';

export default class CreateUserCommandHandler {

    constructor(userService) {
     this.userService = userService
     this.userFactory = container.resolve('userFactory')
    }

    async handle(command) {
      this.userService.isValidUserCommand(command)
      this.userService.passwordCompatibilityCheck(command.password)
      const user = await this.userFactory.createUser({ userName: command.userName, password: command.password })
      this.userService.isPasswordSecured(command.password, user.password)
      this.userService.isValidUser(user)
      return await this.userService.createUser(user);
    }
    
  }
