import * as errors from '../Error/Errors.js'
import { v1 as uuidv1 } from 'uuid';

export default class UserValidations {

    static passwordCompatibilityCheck = (password) => {
    let isComplex = true;
    const errorMessages = [];
  
    if (password.length < 3) {
      isComplex = false;
      errorMessages.push('Password must be at least 3 characters long.');
    }
  
    if (!/[A-Z]/.test(password)) {
      isComplex = false;
      errorMessages.push('Password must contain at least one uppercase letter. ');
    }
  
    if (!/[a-z]/.test(password)) {
      isComplex = false;
      errorMessages.push('Password must contain at least one lowercase letter. ');
    }
  
    if (!/\d/.test(password)) {
      isComplex = false;
      errorMessages.push('Password must contain at least one number. ');
    }
  
    if (!/[!@#$_%^&*]/.test(password)) {
      isComplex = false;
      errorMessages.push('Password must contain at least one special character. ');
    }

    if(!isComplex) {throw new errors.InvalidInputError(errorMessages)}

    return {
      isComplex: isComplex,
      errorMessages: errorMessages
    };
    };
    
    static Validator = (obj, propertyList) => {
    const objProperties = Object.keys(obj);
    const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
    if (invalidProperties.length > 0) {
      throw new errors.InvalidInputError(`Invalid data found: ${invalidProperties.join(', ')}`)
    } else if (objProperties.length !== propertyList.length) {
      throw new errors.InvalidInputError(`All data not present: ${propertyList.filter(prop => !objProperties.includes(prop)).join(', ')}`)
    }
    }

    static isValidUserCommand = (obj) => {
    this.Validator(obj, ['userName', 'password'])
    }

    static isValidUserUpdateCommand = (obj) => {
        const propertyList = ['id', 'userName', 'password']
        const objProperties = Object.keys(obj);
        const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
        if (invalidProperties.length > 0) {
          throw new errors.InvalidInputError(`Invalid data found: ${invalidProperties.join(', ')}`)
        }
        if (obj.password) {
          return { conatinsPassword: true}
        }
        return { conatinsPassword: false}
    }

    static isValidUserDeleteCommand = (obj) => {
        if (!obj.id || !obj.id instanceof uuidv1) {
          throw new errors.InvalidInputError(`Invalid data Input`)
        }
        return true
    }

}
