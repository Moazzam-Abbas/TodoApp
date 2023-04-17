
export default class PaginatedFetchUsersHandler {

    constructor(userRepo) {
       this.repo = userRepo;
      }

    async handle(command) {
      
      const result = {};
      const page = parseInt(command.requestPage, 10) 
      const limit = parseInt(command.requestlimit, 10)
      if (isNaN(page) || isNaN(limit)){
        return result.error = "Invalid Pagination Limits"
      }

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const { count, rows, error } = await this.repo.paginate(startIndex, limit);
  
      if(error){
        return result.error = "error while fetching rows or calculating total"
      }
  
      if (endIndex < count) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
      };
      }

      result.result = rows;
      return result;
    }
  }
