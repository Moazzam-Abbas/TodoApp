import ITodoAppUserRepository from '../../Domain/Abstractions/ITodoAppUserRepository.js';
import db from '../DB/MySql/models/index.js'
const {User} = db

export default class TodoAppUserRepository extends ITodoAppUserRepository{

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
               // console.log(result instanceof db.User); // true
              //  
                console.log('user added successfully'); // "result"
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

                const result = await User.findAll();
               // console.log(JSON.stringify(result)); // "result"
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

    findOne = async (userId) => { 

        const reponseMessage = await (async () => {
               
                try {
                console.log("In Repository "+userId)
                const result = await User.findOne({ where: { id: userId } });
                console.log("User Found At Repository Level => "+JSON.stringify(result)); // "result"
                return result;

                } catch (error) {
                    return {
                        message:
                          error.message || "Some error occurred while fetching One User Details."
                      }
                }

               })();

               console.log("Reponse from db "+reponseMessage)
               return reponseMessage;
    };

    findOneByUserName = async (userName) => { 

        const reponseMessage = await (async () => {
               
                try {

                const result = await User.findOne({ where: { userName: userName } });
                console.log("User Found At Repository Level => "+JSON.stringify(result)); // "result"
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
                    const result = await User.update(userRequestObj.userData, {
                        where: {
                          id: userRequestObj.userId
                        }
                      });
                 //   console.log(JSON.stringify(result)); // "result"
                    if (result[0] === 0) {
                       // res.status(404).send("Record not found");
                        return {status : 404, message: "Record not found"}
                      } else {
                        const rowsUpdated = result[0];
                        return {status : 200, message: `Record was updated successfully. ${rowsUpdated} row(s) were updated.`}
                      }

                } catch (error) {
                    return {status: 200, message: error.message || "Some error occurred while updating the User."}
                }
                
              })();
            
              return responseMessage;

    };

    deleteUser = async (userId) => {

          const responseMessage = await (async () => {
                try {
                    const result = await User.destroy({
                        where: {
                            id: userId.id
                        }
                     });
                  //   console.log(JSON.stringify(result)); // "result"
                   if (result === 0) {
                  //  res.status(404).send("Record not found");
                    return {status : 404, message: "Record not found"}
                  } else {
                    const rowsDeleted = result;
                    return {status : 204, message: `Record was deleted successfully. ${rowsDeleted} row(s) were deleted.`}
                  }
                    
                } catch (error) {
                    return {
                        message: "Could not delete user reason.... " + error.message
                      }
                }
            //......
             })();

             return responseMessage;
    };

    paginate = async (startIndex, endIndex) => {
        const responseMessage = await (async () => {
            
            try {

                  const { count, rows } = await User.findAndCountAll({
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