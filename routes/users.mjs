import express from 'express';
const router = express.Router()
import * as userController from '../controllers/user.controller.mjs'

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route for user
router.route('/')
  .get(userController.findAll)
  .post(userController.create)
  .put(userController.update)
  .delete(userController.deleteOne)

// route left for later user currently ignore
router.get('/about', (req, res) => {
  res.send('About users')
})

export {router}