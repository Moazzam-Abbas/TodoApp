import User from '../Entities/User.js';
import Todo from '../Entities/Todo.js';

export default class UserFactory {
    
   static createUser (type, args) {
        if (type == 'User') {
            return new User(args.id, args.userName, args.password);
        }
    } 
    static createTodo (type, args) {
        if (type == 'Todo') {
            return new Todo(args.id, args.title, args.description, args.userId);
        }
    }
  }