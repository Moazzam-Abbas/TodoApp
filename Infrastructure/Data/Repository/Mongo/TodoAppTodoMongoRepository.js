import ITodoAppTodoRepository from '../../../../Domain/Interfaces/ITodoAppTodoRepository.js';
import * as errors from '../../../../Infrastructure/Error/Errors.js'
import {Todo} from '../../DB/Mongo/todo.model.js'

export default class TodoAppTodoMongoRepository extends ITodoAppTodoRepository {

    constructor() {
        super()
    }
    
    createTodoItem = async (todo) => {
       const responseMessage = await (async () => {
          const result = await Todo.create(todo);
          return result;          
        })();
      return responseMessage;
    };
    
    findAllTodoItem = async () => { 
        const reponseMessage = await (async () => {
          const result = await Todo.find({});
          return {result: result};;
        })();
      return reponseMessage;
    };

    UpdateTodoItem = async (todoRequestObj) => {             
      const responseMessage = await (async () => {
          const result = await Todo.updateOne({ _id: todoRequestObj.id }, todoRequestObj.body);
          if (result.modifiedCount === 0) {
              throw new errors.ResourceNotFound('Record not found')
            } else {
              const rowsUpdated = result.modifiedCount;
              return { message: `Record was updated successfully. ${rowsUpdated} row(s) were updated.`}
            }            
      })();    
      return responseMessage;
    };

    deleteTodoItem = async (todoId) => {
      const responseMessage = await (async () => {  
        const result = await Todo.deleteOne({ _id: todoId });
         if (result.deletedCount === 0) {
            throw new errors.ResourceNotFound('Record not found')
         }
         else {
            const rowsDeleted = result.deletedCount;
            return { message: `Record was deleted successfully. ${rowsDeleted} row(s) were deleted.`}
          }
      })();
      return responseMessage;
     };

    paginate = async (startIndex, endIndex) => {
      const responseMessage = await (async () => {
          try {
              const [count, rows] = await Promise.all([
                  Todo.countDocuments(),
                  Todo.find().limit(endIndex).skip(startIndex),
                ]);
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

