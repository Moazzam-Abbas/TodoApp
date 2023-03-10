import express from 'express';
const router = express.Router()
//import * as userController from '../controllers/user.controller.js'
import userService from '../../../Service/user.service.js';
import User from '../../../Domain/Entities/User.js';
import { createUserRequestDTO } from '../seralizer/seralizer.js';

const user_Service = new userService();

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route for user
//router.route('/')
//  .get(userController.findAll)
//  .post(user_Service.createUser)
//  .put(userController.update)
//  .delete(userController.deleteOne)
router.route('/')
  .get(async (req, res) => {
    const response = await user_Service.findAllUser();
    res.send(response);
  })
  .post(async (req, res) => {
    //const userRequestDTO = createUserRequestDTO(JSON.stringify(req.body));
    const response = await user_Service.createUser(req.body);
    res.send(response);
  })

//router.put('/:id', user_Service.UpdateUser)
router.put('/:id', async (req, res) => {
  const response = await user_Service.UpdateUser({id:req.params.id, body:req.body});
  res.send(response);
})

//router.delete('/:id', user_Service.deleteUser)
router.delete('/:id', async (req, res) => {
  const response = await user_Service.deleteUser(req.params.id);
  res.send(response);
})


// testing Eager laod
//router.get('/eager', userController.EagerLoad)

// route left for later user currently ignore
router.get('/about', (req, res) => {
  res.send('About users')
})

export {router}