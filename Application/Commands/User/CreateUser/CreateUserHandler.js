import { container } from '../../../../Infrastructure/DI/container.js';
import User from '../../../../Domain/Entities/User.js'

export default class CreateUserHandler {

    constructor() {
      this.repo = container.resolve('userRepo');
      this.notificationService = container.resolve('notificationService')
    }

    async handle(command) {

      const user = await User.createUser({ userName: command.userName, password: command.password })
      User.isPasswordSecured(command.password, user.password)
      User.isValidUser(user)
      const response = await this.repo.createUser(user);
      const notification = User.prepareNotification(user)
      this.notificationService.notify(notification)
      return response;

    }
}
