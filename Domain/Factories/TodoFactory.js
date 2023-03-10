import Todo from '../Entities/Todo';

export default class TodoFactory {
    
    create (type, args) {

        if (type == 'Todo') {
            return new Todo(args.id, args.title, args.description);
        }
    }
    
  }