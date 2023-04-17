import User from '../../../../Domain/Entities/User.js'
import { container } from '../../../../Infrastructure/DI/container.js';

export default class UpdateUserHandler {

    constructor() {
       this.repo = container.resolve('userRepo')
      }

    async handle(command) {

      const containsPassword = command.userData.password ? true : false;
      if (containsPassword) {
        const userPassword = command.userData.password
        const hashedPassword = await User.encryptPassword(command.userData.password)
        command.userData.password = hashedPassword
        User.isPasswordSecured(userPassword, command.userData.password)
      }
      return await this.repo.UpdateUser(command);
      
    }
}
