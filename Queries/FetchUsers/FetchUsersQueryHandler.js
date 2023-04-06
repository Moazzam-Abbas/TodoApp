export default class FetchUsersQueryHandler {

    constructor(userService) {
       this.userService = userService;
      }

    async execute() {
      return await this.userService.findAllUser();
    }
  }
