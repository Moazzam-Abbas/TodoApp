export default class DeleteUserCommandHandler {

    constructor(userService) {
      this.userService = userService;
      }

    async handle(command) {
      this.userService.isValidUserDeleteCommand(command)
      return await this.userService.deleteUser(command);
    }
  }
