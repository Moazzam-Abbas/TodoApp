import User from '../../Domain/Entities/User.js';
import Todo from '../../Domain/Entities/Todo.js';
import { v1 as uuidv1 } from 'uuid';

export default class UserFactory {

   // static userService = container.resolve('userService');
    constructor(userService) {
        this.userService = userService
      }
    
   async createUser (args) {
         // Hash the user's password
         const hashedPassword = await this.userService.encryptPassword(args.password)
         return new User(uuidv1(), args.userName, hashedPassword);
    } 

    createTodo (type, args) {
        if (type == 'Todo') {
            return new Todo(args.id, args.title, args.description, args.userId);
        }
    }

  }
