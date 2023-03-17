import express from 'express';
import todoService from '../../Service/todo.service.js';

const router = express.Router()
const todo_Service = new todoService();

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.route('/')
  .get(async (req, res) => {
    const response = await todo_Service.findAll();
    res.send(response);
  })
  .post(async (req, res) => {
    const response = await todo_Service.create(req.body);
    res.send(response);
  })


router.put('/:id', async (req, res) => {
  const response = await todo_Service.update({id:req.params.id, body:req.body});
  res.send(response);
})


router.delete('/:id', async (req, res) => {
  const response = await todo_Service.deleteOne(req.params.id);
  res.send(response);
})


export {router}