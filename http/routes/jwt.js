import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {authenticateRefreshJwtToken} from '../middleware/authentications.js';
import { container } from '../DI/container.js';
import userService from '../../Service/user.service.js';
import * as errors from '../../Error/Errors.js';
import * as dotenv from 'dotenv'
dotenv.config()

const user_Service = container.resolve('userService') //check later should implement depency injection here too
const router = express.Router()

const secretKey = process.env.JWT_SECRET;
const refreshSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET;

const tokenExpirationTime = process.env.JWT_TOKEN_EXPIRATION_TIME;

// can imbed dependency injection for jwt if needed 

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

//route for generating jwt(Loging In)
router.post('/', async (req, res, next) => {

  try {
    // Verify user credentials
    const { userName, password } = req.body;
    const user = await user_Service.findOneByUserName(userName)
    if (!user) {
      throw new errors.Unauthorized('Invalid username or password')
     // return res.status(400).send('Invalid username or password');
    }

    const validPassword = bcrypt.compareSync(password, user.result.password);
    if (!validPassword) {
      throw new errors.Unauthorized('Invalid username or password')
     // return res.status(400).send('Invalid username or password');
    }
   
    // Generate JWT token
    const token = jwt.sign({ userId: user.result.id }, secretKey, { expiresIn: tokenExpirationTime, algorithm: 'HS256'});
    const refreshToken = jwt.sign({ userId: user.result.id }, process.env.JWT_REFRESH_TOKEN_SECRET);

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log('Token verification failed:', err);
      } else {
        console.log('Decoded token:', decoded);
        console.log('UserId from token:', decoded.userId);
      }
    });

    res.send({ 'access_token' : `Bearer ${token}`, 'refresh_token' : `Bearer ${refreshToken}`});
  } catch (error) {
    next(error);
  }
    
})

router.post('/register', async (req, res, next) => {

  try {
    const { userName, password } = req.body;

    // Check if the user already exists
   // const userExists = users.find(u => u.username === username);
   // if (userExists) {
   //   return res.status(400).send('User already exists');
   // }

    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user's information
    const user = {
      userName: userName,
      password: hashedPassword
    };

    const response = await user_Service.createUser(user);
    res.send(response);

  } catch (error) {
    next(error);
    //console.log(error);
    //res.status(500).send('Internal server error');
  }

})

router.post('/refresh-token', authenticateRefreshJwtToken, async (req, res, next) => {

  try {
    // Generate JWT token
    const token = jwt.sign({ userId: req.userId }, secretKey, { expiresIn: tokenExpirationTime, algorithm: 'HS256'});
    res.status(200).send({ 'access_token' : `Bearer ${token}`});
  } catch (error) {
    next(error);
  }
  
})

//router.use((err, req, res, next) => {
//    if (err) {
//      console.error(err);
//      res.status(401).send('Caught in error middleware : Unauthorized');
//    }
//})

export {router}

