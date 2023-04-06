import CustomError from "./CustomError.js";

export class InvalidPasswordError extends CustomError {
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