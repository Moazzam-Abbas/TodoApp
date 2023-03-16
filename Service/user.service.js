import ITodoAppUserService from '../Domain/Abstractions/ITodoAppUserService.js'
import ITodoAppUserRepository from '../Domain/Abstractions/ITodoAppUserRepository.js'
import UserFactory from '../Domain/Factories/UserFactory.js'
import { v1 as uuidv1 } from 'uuid';
import TodoAppUserRepository from '../Data/Repository/TodoAppUserRepository.js';
import TodoAppUserMongoRepository from '../Data/Repository/TodoAppUserMongoRepository.js'

export default class userService extends ITodoAppUserService {

  constructor() {
    super()
    this.repo = new TodoAppUserMongoRepository(); //need object here of repository interface implementation
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
    return result;

   };

  UpdateUser = async (userRequestObj) => { 
    
    const result = await this.repo.UpdateUser(userRequestObj)
    return result;
  };

  deleteUser = async (userId) => { 
    const result = await this.repo.deleteUser(userId);
    return result;
  };

  passwordCompatibilityCheck = (user) => { };
  totalPostsCount = (user) => { };
  
  
}

