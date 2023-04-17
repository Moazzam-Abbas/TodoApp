import { container } from '../../../../Infrastructure/DI/container.js';

export default class FetchUsersHandler {

    constructor() {
       this.repo = container.resolve('userRepo')
      }

    async handle(command) {

      return await this.repo.findAllUser();

    }
}
