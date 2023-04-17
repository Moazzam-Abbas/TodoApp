import UserController from '../controller/User.controller.js';
import TodoController from '../controller/Todo.controller.js';

const paginationMiddleware = () => {
    return async (req, res, next) => {

      if(!req.query.page || !req.query.limit){
          next()
      }
      else {
        if (req.originalUrl.startsWith('/users')) {
          await UserController.paginatedAllUsers(req, res, next)
        } else if (req.originalUrl.startsWith('/todo')) {          
          await TodoController.paginatedAllTodos(req, res, next)
        }
      }
    }
  }

export {paginationMiddleware}

