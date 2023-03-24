import userService from '../../Service/user.service.js'
import todoService from '../../Service/todo.service.js'

const paginationMiddleware = (serviceName) => {
    return async (req, res, next) => {
      if(!req.query.page || !req.query.limit){
          next()
      }
      else {
          const result = await serviceName.paginate(req.query.page, req.query.limit)
          res.send(result)
      }
    }
  }

  export {paginationMiddleware}


  