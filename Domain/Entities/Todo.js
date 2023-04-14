import { v1 as uuidv1 } from 'uuid';

export default class Todo {
    constructor(id, title, description, userId) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.userId = userId;
    }

    static createTodo (args) { 
      return new Todo(uuidv1(), args.title, args.description, args.userId);
    }

    static Validator = (obj, propertyList) => {
      const objProperties = Object.keys(obj);
      const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
      if (invalidProperties.length > 0) {
        throw new errors.InvalidPasswordError(`Invalid data found: ${invalidProperties.join(', ')}`)
      }
    }
    
    static isValidTodoCommand = (obj) => {
      this.Validator(obj, ['title', 'description', 'userId'])
    }
    
    static isValidTodo = (obj) => {
        const propertyList = ['id', 'title']
        const objProperties = Object.keys(obj);
        if ('id' in obj && 'title' in obj) {
          return true;
        }
        throw new errors.InvalidPasswordError(`More data needed to fullfil request: ${propertyList.filter(prop => !objProperties.includes(prop)).join(', ')}`)
    
    }
    
    static isValidTodoUpdateCommand = (obj) => {
      const propertyList = ['id', 'title', 'description', 'userId']
      const objProperties = Object.keys(obj);
      const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
      if (invalidProperties.length > 0) {
        throw new errors.InvalidPasswordError(`Invalid data found: ${invalidProperties.join(', ')}`)
      }
      return true;
    }
    
    static isValidTodoDeleteCommand = (obj) => {
      if (!obj.id || !obj.id instanceof uuidv1) {
        throw new errors.InvalidPasswordError(`Invalid data Input`)
      }
      return true
    }
    
  }
  