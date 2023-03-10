import User from '../Entities/User.js';

export default class UserFactory {
    
   static create (type, args) {

        if (type == 'User') {
            return new User(args.id, args.userName, args.password);
        }
    }
    
  }