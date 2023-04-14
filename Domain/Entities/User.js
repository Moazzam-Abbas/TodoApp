import { v1 as uuidv1 } from 'uuid';
import bcrypt from 'bcrypt'

export default class User {
  
    constructor(id, userName, password) {
      this.id = id;
      this.userName = userName;
      this.password = password;
    }


    static async createUser (args) {
      // Hash the user's password
      const hashedPassword = await User.encryptPassword(args.password)
      return new User(uuidv1(), args.userName, hashedPassword);
    } 

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
  
      if(!isComplex) {throw new errors.InvalidPasswordError(errorMessages)}
  
      return {
        isComplex: isComplex,
        errorMessages: errorMessages
      };
    };
    
    static Validator = (obj, propertyList) => {
      const objProperties = Object.keys(obj);
      const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
      if (invalidProperties.length > 0) {
        throw new errors.InvalidPasswordError(`Invalid data found: ${invalidProperties.join(', ')}`)
      } else if (objProperties.length !== propertyList.length) {
        throw new errors.InvalidPasswordError(`All data not present: ${propertyList.filter(prop => !objProperties.includes(prop)).join(', ')}`)
      }
    }
  
    static isValidUser = (obj) => {
      this.Validator(obj, ['id', 'userName', 'password'])
    }
  
    static isValidUserCommand = (obj) => {
      this.Validator(obj, ['userName', 'password'])
    }
  
    static encryptPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log ('hashed password ' +hashedPassword)
      return hashedPassword;
    }
  
    static isPasswordSecured = async (userPassword, hashedPassword) => {
      // Check if the plaintext password matches the hash
      const isMatch = await bcrypt.compare(userPassword, hashedPassword);
      if(!isMatch) {throw new errors.Unauthorized('Kindly check provided password Details')}
      return isMatch
    }
    
    static isValidUserUpdateCommand = (obj) => {
      const propertyList = ['id', 'userName', 'password']
      const objProperties = Object.keys(obj);
      const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
      if (invalidProperties.length > 0) {
        throw new errors.InvalidPasswordError(`Invalid data found: ${invalidProperties.join(', ')}`)
      }
      if (obj.password) {
        return { conatinsPassword: true}
      }
      return { conatinsPassword: false}
    }
  
    static isValidUserDeleteCommand = (obj) => {
      if (!obj.id || !obj.id instanceof uuidv1) {
        throw new errors.InvalidPasswordError(`Invalid data Input`)
      }
      return true
    }
    
    static prepareNotification = (user) => {
      return { recipient: 'moazzam.abbas@carbonteq.com', subject: 'Test Email', body: `Hello, this is a test email for user: ${user.userName} registration.` }
    }
    
  }