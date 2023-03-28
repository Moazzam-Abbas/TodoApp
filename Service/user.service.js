import ITodoAppUserService from '../Domain/Abstractions/ITodoAppUserService.js'
import ITodoAppUserRepository from '../Domain/Abstractions/ITodoAppUserRepository.js'
import UserFactory from '../Domain/Factories/UserFactory.js'
import { v1 as uuidv1 } from 'uuid';
import TodoAppUserRepository from '../Data/Repository/TodoAppUserRepository.js';
import TodoAppUserMongoRepository from '../Data/Repository/TodoAppUserMongoRepository.js'

export default class userService extends ITodoAppUserService {

  constructor() {
    super()
    this.repo = new TodoAppUserRepository(); //need object here of repository interface implementation
  }

  getAllPostsOfUser = (req, res) => { };
  getUserDetails = (req, res) => { };

  createUser = async (userRequestDTO) => {

    // Create a User from factory 
    const user = UserFactory.createUser('User', {
      id: uuidv1(),
      userName: userRequestDTO.userName,
      password: userRequestDTO.password
    })
    // Save User in the database
    const result = await this.repo.createUser(user);
    //send reposnse
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
  passwordCompatibilityCheck = (user) => { };
  totalPostsCount = (user) => { };
  
  
}

