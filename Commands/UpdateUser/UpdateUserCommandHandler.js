export default class UpdateUserCommandHandler {

    constructor(userService) {
       this.userService = userService;
      }

    async handle(command) {
      const { conatinsPassword } = this.userService.isValidUserUpdateCommand(command)
      if (conatinsPassword) {
        this.userService.passwordCompatibilityCheck(command.password)
        const userPassword = command.password
        const hashedPassword = this.userService.encryptPassword(command.password)
        command.password = hashedPassword
        this.userService.isPasswordSecured(userPassword, command.password)
      }
      return await this.userService.UpdateUser(command);
    }
  }
