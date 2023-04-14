import CustomError from "../../Infrastructure/Error/CustomError.js";
import {logger} from "../../Infrastructure/Logger/logger.js"

export default function ErrorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
      logger.error(err)
      res.status(err.statusCode).json({
        error: {
          message: err.message,
          description: err.description
        }
      });
    } else {
     // console.error(err);
      logger.error(err)
      res.status(500).json({
        error: {
          name: 'InternalServerError',
          message: 'An internal server error occurred.'
        }
      });
    }
  }

