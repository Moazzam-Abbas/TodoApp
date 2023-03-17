import express from 'express';
import userService from '../../Service/user.service.js';

const router = express.Router()
const user_Service = new userService();

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.route('/')
  .get(async (req, res) => {
    const response = await user_Service.findAllUser();
    res.send(response);
  })
  .post(async (req, res) => {
    const response = await user_Service.createUser(req.body);
    res.send(response);
  })

router.put('/:id', async (req, res) => {
  const response = await user_Service.UpdateUser({id:req.params.id, body:req.body});
  res.send(response);
})

router.delete('/:id', async (req, res) => {
  const response = await user_Service.deleteUser(req.params.id);
  res.send(response);
})


export {router}