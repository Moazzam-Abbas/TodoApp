import ITodoAppTodoRepository from '../../Domain/Abstractions/ITodoAppTodoRepository.js';
import db from '../DB/MySql/models/index.js'
const {TodoItems} = db

export default class TodoAppTodoRepository extends ITodoAppTodoRepository {

    constructor() {
        super()
    }
    

    createTodoItem = async (todo) => {

       const responseMessage = await (async () => {

            try {
                const result = await TodoItems.create(todo);
                // user exists in the database now!
                console.log(result instanceof db.TodoItems); // true
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

                const result = await TodoItems.findAll();
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
                    const result = await TodoItems.update(todoRequestObj.body, {
                        where: {
                          id: todoRequestObj.id
                        }
                      });
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
                    const result = await TodoItems.destroy({
                        where: {
                            id: todoId
                        }
                     });
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

