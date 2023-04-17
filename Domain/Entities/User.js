import { v1 as uuidv1 } from 'uuid';
import bcrypt from 'bcrypt'
import * as errors from '../../Infrastructure/Error/Errors.js'

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
    
    static Validator = (obj, propertyList) => {
      const objProperties = Object.keys(obj);
      const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
      if (invalidProperties.length > 0) {
        throw new errors.InvalidInputError(`Invalid data found: ${invalidProperties.join(', ')}`)
      } else if (objProperties.length !== propertyList.length) {
        throw new errors.InvalidInputError(`All data not present: ${propertyList.filter(prop => !objProperties.includes(prop)).join(', ')}`)
      }
    }
  
    static isValidUser = (obj) => {
      this.Validator(obj, ['id', 'userName', 'password'])
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
    
    static prepareNotification = (user) => {
      return { recipient: 'moazzam.abbas@carbonteq.com', subject: 'Test Email', body: `Hello, this is a test email for user: ${user.userName} registration.` }
    }
    
  }