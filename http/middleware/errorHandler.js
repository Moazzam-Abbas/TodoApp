import CustomError from "../../Error/CustomError.js";

export default function ErrorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({
        error: {
          message: err.message,
          description: err.description
        }
      });
    } else {
      console.error(err);
      res.status(500).json({
        error: {
          name: 'InternalServerError',
          message: 'An internal server error occurred.'
        }
      });
    }
  }

