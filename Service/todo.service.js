import ITodoAppTodoService from '../Domain/Abstractions/ITodoAppTodoService.js'
import UserFactory from '../Domain/Factories/UserFactory.js'
import { v1 as uuidv1 } from 'uuid';
import TodoAppTodoRepository from '../Data/Repository/TodoAppTodoRepository.js';
import TodoAppTodoMongoRepository from '../Data/Repository/TodoAppTodoMongoRepository.js'

export default class todoService extends ITodoAppTodoService {

  constructor(todoRepo) {
    super()
    this.repo = todoRepo; //need object here of repository interface implementation
  }

// Create and Save a new ToDoItem
  create = async (todoRequestDTO) => {

  // Create a TodoItem from factory 
  const todoItem = UserFactory.createTodo('Todo', {
    id: uuidv1(),
    title: todoRequestDTO.title,
    description: todoRequestDTO.description,
    userId: todoRequestDTO.userId
  })
  // Save TodoItem in the database
  const result = await this.repo.createTodoItem(todoItem);
  //send reposnse
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

}