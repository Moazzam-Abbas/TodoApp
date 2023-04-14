import ITodoAppTodoRepository from '../../../../Domain/Abstractions/ITodoAppTodoRepository.js';
import * as errors from '../../../../Infrastructure/Error/Errors.js'
import {Todo} from '../../DB/Mongo/todo.model.js'

export default class TodoAppTodoMongoRepository extends ITodoAppTodoRepository {

    constructor() {
        super()
    }
    

    createTodoItem = async (todo) => {

       const responseMessage = await (async () => {

             const result = await Todo.create(todo);
             // user exists in the database now!
            // console.log(result instanceof db.TodoItems); // true
             console.log(JSON.stringify(result)); // "result"
             return result;
          
        })();

        return responseMessage;
    };
    
    findAllTodoItem = async () => { 

        const reponseMessage = await (async () => {

               // const result = await Todo.find({}).populate('userId').exec();
                const result = await Todo.find({});
               // console.log(JSON.stringify(result)); // "result"
                return {result: result};;

               })();

               return reponseMessage;
    };

    UpdateTodoItem = async (todoRequestObj) => { 
             
         const responseMessage = await (async () => {

             const result = await Todo.updateOne({ _id: todoRequestObj.id }, todoRequestObj.body);
             console.log(JSON.stringify(result)); // "result"
             //return result; 
             if (result.modifiedCount === 0) {
                // res.status(404).send("Record not found");
                // return {status : 404, message: "Record not found"}
                 throw new errors.ResourceNotFound('Record not found')
               } else {
                 const rowsUpdated = result.modifiedCount;
                 //return {status : 200, message: `Record was updated successfully. ${rowsUpdated} row(s) were updated.`}
                 return { message: `Record was updated successfully. ${rowsUpdated} row(s) were updated.`}
               }
             
        })();
            
        return responseMessage;

    };

    deleteTodoItem = async (todoId) => {

          const responseMessage = await (async () => {
              
            const result = await Todo.deleteOne({ _id: todoId });
             console.log(JSON.stringify(result)); // "result"
            // return { message: "todo item was deleted successfully !" }; 
             if (result.deletedCount === 0) {
                throw new errors.ResourceNotFound('Record not found')
             }
             else {
                const rowsDeleted = result.deletedCount;
                return { message: `Record was deleted successfully. ${rowsDeleted} row(s) were deleted.`}
              }
            //......
            })();

            return responseMessage;
     };

    paginate = async (startIndex, endIndex) => {
        const responseMessage = await (async () => {
            try {
               //// const count = await User.countDocuments()
               //// const rows = await User.find().limit(endIndex).skip(startIndex)
                const [count, rows] = await Promise.all([
                    Todo.countDocuments(),
                    Todo.find().limit(endIndex).skip(startIndex),
                  ]);
             ////    console.log(count)
              //   console.log(JSON.stringify(rows))
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

