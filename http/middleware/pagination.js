//import userService from '../../Service/user.service.js'
//import todoService from '../../Service/todo.service.js'
import {container} from '../../Infrastructure/DI/container.js'
import PaginatedFetchUsersQuery from '../../Application/Queries/FetchUsers/PaginatedFetchUsersQuery.js';
import PaginatedFetchTodosQuery from '../../Application/Queries/FetchTodos/PaginatedFetchTodosQuery.js';

const queryBus = container.resolve('queryBus');

const paginationMiddleware = () => {
    return async (req, res, next) => {

      if(!req.query.page || !req.query.limit){
          next()
      }
      else {

        if (req.originalUrl.startsWith('/users')) {
          try {
            // do something specific for requests to /users
            const query = new PaginatedFetchUsersQuery(req.query.page, req.query.limit);
            const response = await queryBus.execute(query);
            res.status(200).send(response);
          } catch (error) {
            next(error);
          }

        } else if (req.originalUrl.startsWith('/todo')) {
          try {
            // do something else for other requests
            const query = new PaginatedFetchTodosQuery(req.query.page, req.query.limit);
            const response = await queryBus.execute(query);
            res.status(200).send(response);
          } catch (error) {
            next(error);
          }
          
        }
         // const result = await serviceName.paginate(req.query.page, req.query.limit)
         // res.send(result)
      }
    }
  }

export {paginationMiddleware}

