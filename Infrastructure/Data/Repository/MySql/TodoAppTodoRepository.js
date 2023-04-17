import ITodoAppTodoRepository from '../../../../Domain/Abstractions/ITodoAppTodoRepository.js';
import * as errors from '../../../../Infrastructure/Error/Errors.js'
import db from '../../DB/MySql/models/index.js'
const {TodoItems} = db

export default class TodoAppTodoRepository extends ITodoAppTodoRepository {

    constructor() {
        super()
    }
    
    createTodoItem = async (todo) => {
      const responseMessage = await (async () => {
         const result = await TodoItems.create(todo);
         return result;
      })();
      return responseMessage;
    };
    
    findAllTodoItem = async () => { 
      const reponseMessage = await (async () => {
        const result = await TodoItems.findAll();
        return {result: result};
      })();
      return reponseMessage;
    };

    UpdateTodoItem = async (todoRequestObj) => {       
      const responseMessage = await (async () => {
         const result = await TodoItems.update(todoRequestObj.todoData, {
             where: {
               id: todoRequestObj.todoId
             }
         });
         if (result[0] === 0) {
           throw new errors.ResourceNotFound('Record not found')
         } else {
           const rowsUpdated = result[0];
           return { message: `Record was updated successfully. ${rowsUpdated} row(s) were updated.`}
         }             
       })();           
       return responseMessage;
    };

    deleteTodoItem = async (todoId) => {
      const responseMessage = await (async () => {
        const result = await TodoItems.destroy({
          where: {
            id: todoId.id
          }
         });    
        if (result === 0) {
           throw new errors.ResourceNotFound('Record not found')
        } else {
           const rowsDeleted = result;
           return { message: `Record was deleted successfully. ${rowsDeleted} row(s) were deleted.`}
        }
      })();
      return responseMessage;
    };

    paginate = async (startIndex, endIndex) => { 
      const responseMessage = await (async () => {       
        try {
              const { count, rows } = await TodoItems.findAndCountAll({
                limit: endIndex,
                offset: startIndex,
              });
          return { count: count, rows: rows}
        } catch (error) {
            return {
                error: error
            }
        }
      })();
      return responseMessage;
    };
    
}

