import PaginationOptions from "../../../../Infrastructure/utils/PaginationOptions.js";
import PaginationData from "../../../../Infrastructure/utils/PaginationData.js";
import * as errors from '../../../../Infrastructure/Error/Errors.js'

export default class PaginatedFetchTodosHandler {

    constructor(todoRepo) {
       this.repo = todoRepo;
      }

    async handle(command) {
      
      const result = {};
      const page = parseInt(command.requestPage, 10) 
      const limit = parseInt(command.requestlimit, 10)
      if (isNaN(page) || isNaN(limit)){
        throw new errors.InvalidInputError('Invalid Pagination limits entered')
      }
      const paginationOptions = new PaginationOptions(page, limit)
      const itemsCount = await this.repo.totalCount()
      const paginationData = new PaginationData(paginationOptions, itemsCount)
      const { count, rows, error } = await this.repo.paginate(paginationOptions.offset(), limit);
      if(error){
        throw error
      }
  
      result.paginationInfo = paginationData.getPaginatedInfo()
      result.result = rows;
      return result;
    }
  }
