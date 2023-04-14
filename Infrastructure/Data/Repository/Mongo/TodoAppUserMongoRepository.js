import ITodoAppUserRepository from '../../../../Domain/Abstractions/ITodoAppUserRepository.js';
import {User} from '../../DB/Mongo/user.model.js'
import * as errors from '../../../../Infrastructure/Error/Errors.js'

export default class TodoAppUserMongoRepository extends ITodoAppUserRepository {

    constructor() {
        super()
    }

    createUser = async (user) => {

       const responseMessage = await (async () => {

                const result = await User.create(user);
                // user exists in the database now!
              //  console.log(result instanceof db.User); // true
                console.log('user added successfully'); // "result"
                return result;

        })();

        return responseMessage;
    };
    
    findAllUser = async () => { 

        const reponseMessage = await (async () => {
             const result = await User.find({});
             console.log(JSON.stringify(result)); // "result"
             return {result: result}
            })();
            return reponseMessage;
    };

    findOne = async (userId) => { 

        const reponseMessage = await (async () => {
             const result = await User.findOne({_id: userId});
             console.log(JSON.stringify(result)); // "result"
             return {result: result};
            })();
            return reponseMessage;
    };

    findOneByUserName = async (userName) => { 

        const reponseMessage = await (async () => {
             const result = await User.findOne({userName: userName});
             console.log(JSON.stringify(result)); // "result"
             return {result: result};
            })();
            return reponseMessage;
    };

    UpdateUser = async (userRequestObj) => { 
             
         const responseMessage = await (async () => {

             const result = await User.updateOne({ _id: userRequestObj.id }, userRequestObj.body);
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

    deleteUser = async (userId) => {

          const responseMessage = await (async () => {
              
                const result = await User.deleteOne({ _id: userId });
                 console.log(JSON.stringify(result)); // "result"

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
                    User.countDocuments(),
                    User.find().limit(endIndex).skip(startIndex),
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