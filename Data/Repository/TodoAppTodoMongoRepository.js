import ITodoAppTodoRepository from '../../Domain/Abstractions/ITodoAppTodoRepository.js';
import {Todo} from '../Schema/Mongo/todo.model.js'

export default class TodoAppTodoMongoRepository extends ITodoAppTodoRepository {

    constructor() {
        super()
    }
    

    createTodoItem = async (todo) => {

       const responseMessage = await (async () => {

            try {
                const result = await Todo.create(todo);
                // user exists in the database now!
               // console.log(result instanceof db.TodoItems); // true
                console.log(JSON.stringify(result)); // "result"
                return result;
            } catch (error) {
                return {
                    Errormessage:
                        error.message || "Some error occurred while creating the todo item."
                }
            }
        })();

        return responseMessage;
    };
    
    findAllTodoItem = async () => { 

        const reponseMessage = await (async () => {
               
                try {

               // const result = await Todo.find({}).populate('userId').exec();
                const result = await Todo.find({});
                console.log(JSON.stringify(result)); // "result"
                return result;

                } catch (error) {
                    return {
                        message:
                          error.message || "Some error occurred while fetching All todo items Details."
                      }
                }

               })();

               return reponseMessage;
    };

    UpdateTodoItem = async (todoRequestObj) => { 
             
         const responseMessage = await (async () => {

                try {
                    const result = await Todo.updateOne({ id: todoRequestObj.id }, todoRequestObj.body);
                    console.log(JSON.stringify(result)); // "result"
                    return result; 

                } catch (error) {
                    return {
                        message:
                          error.message || "Some error occurred while updating the todo item."
                      }
                }

                
              })();
            
              return responseMessage;

    };

    deleteTodoItem = async (todoId) => {

          const responseMessage = await (async () => {
                try {
                    const result = await Todo.deleteOne({ id: todoId });
                     console.log(JSON.stringify(result)); // "result"
                     return { message: "todo item was deleted successfully !" }; 
                } catch (error) {
                    return {
                        message: "Could not delete todo item reason.... " + error.message
                      }
                }
            //......
             })();

             return responseMessage;
     };

}

