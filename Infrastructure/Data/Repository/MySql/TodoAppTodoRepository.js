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
           // user exists in the database now!
          // console.log(result instanceof db.TodoItems); // true
           console.log(JSON.stringify(result)); // "result"
           return result;
        })();

        return responseMessage;
    };
    
    findAllTodoItem = async () => { 

        const reponseMessage = await (async () => {

            const result = await TodoItems.findAll();
           // console.log(JSON.stringify(result)); // "result"
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
                  // res.status(404).send("Record not found");
                  throw new errors.ResourceNotFound('Record not found')
                 } else {
                   const rowsUpdated = result[0];
                  // return {status : 200, message: `Record was updated successfully. ${rowsUpdated} row(s) were updated.`}
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
                        //  res.status(404).send("Record not found");
                         // return {status : 404, message: "Record not found"}
                          throw new errors.ResourceNotFound('Record not found')
                        } else {
                          const rowsDeleted = result;
                         // return {status : 204, message: `Record was deleted successfully. ${rowsDeleted} row(s) were deleted.`}
                          return { message: `Record was deleted successfully. ${rowsDeleted} row(s) were deleted.`}
                        }
            //......
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

