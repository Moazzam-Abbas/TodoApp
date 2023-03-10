import express from 'express';
const router = express.Router()
//import * as todoItemController from '../controllers/todo.controller.js'

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

//router.post("/", todoItemController.create);

// define the home page route for todo
//router.route('/')
//  .get(todoItemController.findAll)
//  .post(todoItemController.create)
//  .put(todoItemController.update)
//  .delete(todoItemController.deleteOne)

// ****route left for later user currently ignore*****
router.get('/about', (req, res) => {
  res.send('About todo')
})

export {router}