import ITodoAppUserService from '../Domain/Abstractions/ITodoAppUserService.js'
import { v1 as uuidv1 } from 'uuid';
import * as errors from '../Error/Errors.js'
import bcrypt from 'bcrypt'

export default class userService extends ITodoAppUserService {

   constructor(userRepo) {
    super()
    this.repo = userRepo; //need object here of repository interface implementation
  }

  getAllPostsOfUser = (req, res) => { };
  getUserDetails = (req, res) => { };

  createUser = async (user) => {
    // Save User in the database
    const result = await this.repo.createUser(user);
    //send response
    return result;

  };

  findAllUser = async () => {

    const result = await this.repo.findAllUser();
    return {result: result};

  };

  findOne = async (userId) => {

    console.log(userId)
    const result = await this.repo.findOne(userId);
    return {result: result};

  };

  findOneByUserName = async (userName) => {

    console.log(userName)
    const result = await this.repo.findOneByUserName(userName);
    return {result: result};

  };

  UpdateUser = async (userRequestObj) => { 
    
    const result = await this.repo.UpdateUser(userRequestObj)
    return result;
  };

  deleteUser = async (userId) => { 
    const result = await this.repo.deleteUser(userId);
    return result;
  };

  paginate = async (requestPage, requestlimit) => {

    const result = {};

    const page = parseInt(requestPage, 10) //req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = parseInt(requestlimit, 10)
    if (isNaN(page) || isNaN(limit)){
      return result.error = "Invalid Pagination Limits"
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const { count, rows, error } = await this.repo.paginate(startIndex, limit);

    if(error){
      return result.error = "error while fetching rows or calculating total"
    }

    if (endIndex < count) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
    };
  }

  result.result = rows;
    
  return result;
    

  }

  passwordCompatibilityCheck = (password) => {
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
  
  Validator = (obj, propertyList) => {
    const objProperties = Object.keys(obj);
    const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
    if (invalidProperties.length > 0) {
      throw new errors.InvalidPasswordError(`Invalid data found: ${invalidProperties.join(', ')}`)
    } else if (objProperties.length !== propertyList.length) {
      throw new errors.InvalidPasswordError(`All data not present: ${propertyList.filter(prop => !objProperties.includes(prop)).join(', ')}`)
    }
  }

  isValidUser = (obj) => {
    this.Validator(obj, ['id', 'userName', 'password'])
  }

  isValidUserCommand = (obj) => {
    this.Validator(obj, ['userName', 'password'])
  }

  encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log ('hashed password ' +hashedPassword)
    return hashedPassword;
  }

  isPasswordSecured = async (userPassword, hashedPassword) => {
    // Check if the plaintext password matches the hash
    const isMatch = await bcrypt.compare(userPassword, hashedPassword);
    if(!isMatch) {throw new errors.Unauthorized('Kindly check provided password Details')}
    return isMatch
  }
  
  isValidUserUpdateCommand = (obj) => {
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

  isValidUserDeleteCommand = (obj) => {
    if (!obj.id || !obj.id instanceof uuidv1) {
      throw new errors.InvalidPasswordError(`Invalid data Input`)
    }
    return true
  }
  
  prepareNotification = (user) => {
    return { recipient: 'moazzam.abbas@carbonteq.com', subject: 'Test Email', body: `Hello, this is a test email for user: ${user.userName} registration.` }
  }

  totalPostsCount = (user) => { };
  
}

