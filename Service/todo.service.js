import ITodoAppTodoService from '../Domain/Abstractions/ITodoAppTodoService.js'
import UserFactory from '../Service/Factories/UserFactory.js'
import { v1 as uuidv1 } from 'uuid';
import * as errors from '../Error/Errors.js'


export default class todoService extends ITodoAppTodoService {

  constructor(todoRepo) {
    super()
    this.repo = todoRepo; //need object here of repository interface implementation
  }

// Create and Save a new ToDoItem
  create = async (todoRequestDTO) => {

  // Save Todo in the database
  const result = await this.repo.createTodoItem(todoRequestDTO);
  //send response
  return result;

 };

// Retrieve all ToDoItems from the database.
// Retrieve all ToDoItems/ find by title from the database:
  findAll = async () => {

  const result = await this.repo.findAllTodoItem();
  return {result: result};

 };

// Update a ToDoItem by the id in the request
// Update a ToDoItem identified by the id in the request
  update = async (todoRequestObj) => { 
    console.log("Servicelevel => "+todoRequestObj)
  const result = await this.repo.UpdateTodoItem(todoRequestObj)
  return result;
};

// Delete a ToDoItem with the specified id in the request
// Delete a ToDoItem with the specified id
  deleteOne = async (todoId) => { 
  const result = await this.repo.deleteTodoItem(todoId);
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

Validator = (obj, propertyList) => {
  const objProperties = Object.keys(obj);
  const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
  if (invalidProperties.length > 0) {
    throw new errors.InvalidPasswordError(`Invalid data found: ${invalidProperties.join(', ')}`)
  }
}

isValidTodoCommand = (obj) => {
  this.Validator(obj, ['title', 'description', 'userId'])
}

isValidTodo = (obj) => {
    const propertyList = ['id', 'title']
    const objProperties = Object.keys(obj);
    if ('id' in obj && 'title' in obj) {
      return true;
    }
    throw new errors.InvalidPasswordError(`More data needed to fullfil request: ${propertyList.filter(prop => !objProperties.includes(prop)).join(', ')}`)

}

isValidTodoUpdateCommand = (obj) => {
  const propertyList = ['id', 'title', 'description', 'userId']
  const objProperties = Object.keys(obj);
  const invalidProperties = objProperties.filter(prop => !propertyList.includes(prop));
  if (invalidProperties.length > 0) {
    throw new errors.InvalidPasswordError(`Invalid data found: ${invalidProperties.join(', ')}`)
  }
  return true;
}

isValidTodoDeleteCommand = (obj) => {
  if (!obj.id || !obj.id instanceof uuidv1) {
    throw new errors.InvalidPasswordError(`Invalid data Input`)
  }
  return true
}


}