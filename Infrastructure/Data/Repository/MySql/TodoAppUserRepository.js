import ITodoAppUserRepository from '../../../../Domain/Abstractions/ITodoAppUserRepository.js';
import * as errors from '../../../../Infrastructure/Error/Errors.js'
import db from '../../DB/MySql/models/index.js'
const {User} = db

export default class TodoAppUserRepository extends ITodoAppUserRepository{

    constructor() {
        super()
    }

    createUser = async (user) => {

       const responseMessage = await (async () => {

            const result = await User.create(user);
            // user exists in the database now!
           // console.log(result instanceof db.User); // true
          //  
            console.log('user added successfully'); // "result"
            return result;
        })();

        return responseMessage;
    };
    
    findAllUser = async () => { 

        const reponseMessage = await (async () => {

                const result = await User.findAll();
               // console.log(JSON.stringify(result)); // "result"
                return {result: result};

               })();

               return reponseMessage;
    };

    findOne = async (userId) => { 

        const reponseMessage = await (async () => {
               
           console.log("In Repository "+userId)
           const result = await User.findOne({ where: { id: userId } });
           console.log("User Found At Repository Level => "+JSON.stringify(result)); // "result"
           return {result: result};
          })();
           console.log("Reponse from db "+reponseMessage)
          return reponseMessage;
    };

    findOneByUserName = async (userName) => { 

        const reponseMessage = await (async () => {
               
                const result = await User.findOne({ where: { userName: userName } });
                console.log("User Found At Repository Level => "+JSON.stringify(result)); // "result"
                return {result: result};

               })();

               return reponseMessage;
    };

    UpdateUser = async (userRequestObj) => { 
             
         const responseMessage = await (async () => {

                    const result = await User.update(userRequestObj.userData, {
                        where: {
                          id: userRequestObj.userId
                        }
                      });
                 //   console.log(JSON.stringify(result)); // "result"
                    if (result[0] === 0) {
                       // res.status(404).send("Record not found");
                       // return {status : 404, message: "Record not found"}
                        throw new errors.ResourceNotFound('Record not found')
                      } else {
                        const rowsUpdated = result[0];
                        return { message: `Record was updated successfully. ${rowsUpdated} row(s) were updated.`}
                      }
                
              })();
            
              return responseMessage;

    };

    deleteUser = async (userId) => {

          const responseMessage = await (async () => {
                
                    const result = await User.destroy({
                        where: {
                            id: userId.id
                        }
                     });
                  //   console.log(JSON.stringify(result)); // "result"
                   if (result === 0) {
                  //  res.status(404).send("Record not found");
                    //return {status : 404, message: "Record not found"}
                    throw new errors.ResourceNotFound('Record not found')
                  } else {
                    const rowsDeleted = result;
                    return { message: `Record was deleted successfully. ${rowsDeleted} row(s) were deleted.`}
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