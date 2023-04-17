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
        return result;
      })();
      return responseMessage;
    };
    
    findAllUser = async () => { 
        const reponseMessage = await (async () => {
          const result = await User.findAll();
          return {result: result};
        })();
        return reponseMessage;
    };

    findOne = async (userId) => { 
      const reponseMessage = await (async () => {              
        const result = await User.findOne({ where: { id: userId } });
        return {result: result};
      })();
      return reponseMessage;
    };

    findOneByUserName = async (userName) => { 
      const reponseMessage = await (async () => {            
        const result = await User.findOne({ where: { userName: userName } });
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
         if (result[0] === 0) {
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
        if (result === 0) {
          throw new errors.ResourceNotFound('Record not found')
        } else {
          const rowsDeleted = result;
          return { message: `Record was deleted successfully. ${rowsDeleted} row(s) were deleted.`}
        }
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