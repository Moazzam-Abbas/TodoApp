import { v1 as uuidv1 } from 'uuid';
import * as errors from '../../Infrastructure/Error/Errors.js'

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
    
    static isValidTodo = (obj) => {
        const propertyList = ['id', 'title']
        const objProperties = Object.keys(obj);
        if ('id' in obj && 'title' in obj) {
          return true;
        }
        throw new errors.InvalidInputError(`More data needed to fullfil request: ${propertyList.filter(prop => !objProperties.includes(prop)).join(', ')}`)
    
    }

    
  }
  