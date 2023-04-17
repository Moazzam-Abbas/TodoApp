import CustomError from "./CustomError.js";

export class InvalidInputError extends CustomError {
  constructor(description) {
    super('Invalid User Input', 400);
    this.description = description || 'The User data entered is not Correct ';
   }
}

export class Unauthorized extends CustomError {
  constructor(description) {
    super('Unauthorized', 401);
    this.description = description || 'The User data entered is not Correct ';
  }
}

export class ResourceNotFound extends CustomError {
  constructor(description) {
    super('Resource Not Found', 404);
    this.description = description || 'The User data entered is not Correct ';
  }
}

