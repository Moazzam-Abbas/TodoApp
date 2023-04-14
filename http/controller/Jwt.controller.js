import jwtHelper from '../../Infrastructure/Services/jwtHelper.js';

export default class JwtController {

    static async generateAccessToken(req, res, next) {
      // Validate incoming request data
      try {
        const response = await jwtHelper.generateAccessToken(req)
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }

    }

    static async generateRefreshToken(req, res, next) {
      // Validate incoming request data
        try {
        // Generate JWT token
        const response = await jwtHelper.generateRefreshToken(req)
        res.status(200).send(response);
        } catch (error) {
          next(error);
        }
    }


}
