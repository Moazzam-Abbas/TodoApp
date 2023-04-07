export default class UpdateUserCommandHandler {

    constructor(userService) {
       this.userService = userService;
      }

    async handle(command) {
      const { conatinsPassword } = this.userService.isValidUserUpdateCommand(command.userData)
      if (conatinsPassword) {
        this.userService.passwordCompatibilityCheck(command.userData.password)
        const userPassword = command.userData.password
        const hashedPassword = await this.userService.encryptPassword(command.userData.password)
        command.userData.password = hashedPassword
        this.userService.isPasswordSecured(userPassword, command.userData.password)
      }
      return await this.userService.UpdateUser(command);
    }
  }
