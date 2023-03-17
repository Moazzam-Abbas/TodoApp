import ITodoAppUserRepository from '../../Domain/Abstractions/ITodoAppUserRepository.js';
import {User} from '../Schema/Mongo/user.model.js'

export default class TodoAppUserMongoRepository extends ITodoAppUserRepository {

    constructor() {
        super()
    }
    
    getAllPostsOfUser = (user) => { };
    getUserDetails = (user) => { };

    createUser = async (user) => {

       const responseMessage = await (async () => {

            try {
                const result = await User.create(user);
                // user exists in the database now!
              //  console.log(result instanceof db.User); // true
                console.log(JSON.stringify(result)); // "result"
                return result;
            } catch (error) {
                return {
                    Errormessage:
                        error.message || "Some error occurred while creating the User."
                }
            }
        })();

        return responseMessage;
    };
    
    findAllUser = async () => { 

        const reponseMessage = await (async () => {
               
                try {
                const result = await User.find({});
                console.log(JSON.stringify(result)); // "result"
                return result;

                } catch (error) {
                    return {
                        message:
                          error.message || "Some error occurred while fetching All User Details."
                      }
                }

               })();

               return reponseMessage;
    };

    UpdateUser = async (userRequestObj) => { 
             
         const responseMessage = await (async () => {

                try {
                    const result = await User.updateOne({ id: userRequestObj.id }, userRequestObj.body);
                    console.log(JSON.stringify(result)); // "result"
                    return result; 

                } catch (error) {
                    return {
                        message:
                          error.message || "Some error occurred while updating the User."
                      }
                }

                
              })();
            
              return responseMessage;

    };

    deleteUser = async (userId) => {

          const responseMessage = await (async () => {
                try {
                    const result = await User.deleteOne({ id: userId });
                     console.log(JSON.stringify(result)); // "result"
                     return { message: "user was deleted successfully !" }; 
                } catch (error) {
                    return {
                        message: "Could not delete user reason.... " + error.message
                      }
                }
            //......
             })();

             return responseMessage;
     };

}