import * as errors from '../Error/Errors.js'
import { v1 as uuidv1 } from 'uuid';

export default class UserValidations {
    
    static Validator = (obj, propertyList) => {
        const objProperties = Object.keys(obj);
        const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
        if (invalidProperties.length > 0) {
          throw new errors.InvalidInputError(`Invalid data found: ${invalidProperties.join(', ')}`)
        }
    }

    static isValidTodoCommand = (obj) => {
        this.Validator(obj, ['title', 'description', 'userId'])
    }

    static isValidTodoUpdateCommand = (obj) => {
        const propertyList = ['id', 'title', 'description', 'userId']
        const objProperties = Object.keys(obj);
        const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
        if (invalidProperties.length > 0) {
          throw new errors.InvalidInputError(`Invalid data found: ${invalidProperties.join(', ')}`)
        }
        return true;
    }

    static isValidTodoDeleteCommand = (obj) => {
      if (!obj.id || !obj.id instanceof uuidv1) {
        throw new errors.InvalidInputError(`Invalid data Input`)
      }
      return true
    }
    
}
