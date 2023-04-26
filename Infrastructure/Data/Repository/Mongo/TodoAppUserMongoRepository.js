import ITodoAppUserRepository from '../../../../Domain/Interfaces/ITodoAppUserRepository.js';
import {User} from '../../DB/Mongo/user.model.js'
import * as errors from '../../../../Infrastructure/Error/Errors.js'

export default class TodoAppUserMongoRepository extends ITodoAppUserRepository {

    constructor() {
        super()
    }

    createUser = async (user) => {
      const responseMessage = await (async () => {
         const result = await User.create(user);
         return result;
      })();
      return responseMessage;
    };
    
    findAllUser = async () => { 
      const reponseMessage = await (async () => {
        const result = await User.find({});
        return {result: result}
      })();
      return reponseMessage;
    };

    findOne = async (userId) => { 
      const reponseMessage = await (async () => {
       const result = await User.findOne({_id: userId});
       return {result: result};
      })();
      return reponseMessage;
    };

    findOneByUserName = async (userName) => { 
      const reponseMessage = await (async () => {
        const result = await User.findOne({userName: userName});
        return {result: result};
      })();
      return reponseMessage;
    };

    UpdateUser = async (userRequestObj) => {       
      const responseMessage = await (async () => {
          const result = await User.updateOne({ _id: userRequestObj.id }, userRequestObj.body);
          if (result.modifiedCount === 0) {
               throw new errors.ResourceNotFound('Record not found')
             } else {
               const rowsUpdated = result.modifiedCount;
               return { message: `Record was updated successfully. ${rowsUpdated} row(s) were updated.`}
             }
      })();      
      return responseMessage;
    };

    deleteUser = async (userId) => {
      const responseMessage = await (async () => {           
        const result = await User.deleteOne({ _id: userId });
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
              User.countDocuments(),
              User.find().limit(endIndex).skip(startIndex),
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
