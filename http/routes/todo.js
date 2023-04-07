import express from 'express';
import {paginationMiddleware} from '../middleware/pagination.js';
import FetchTodosQuery from '../../Queries/FetchTodos/FetchTodosQuery.js';
import CreateTodoCommand from '../../Commands/CreateTodo/CreateTodoCommand.js';
import UpdateTodoCommand from '../../Commands/UpdateTodo/UpdateTodoCommand.js';
import DeleteTodoCommand from '../../Commands/DeleteTodo/DeleteTodoCommand.js';
import {container} from '../DI/container.js'

const router = express.Router()
const commandBus = container.resolve('commandBus');
const queryBus = container.resolve('queryBus'); 
const todo_Service = container.resolve('todoService') //check later should implement depency injection here too

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', paginationMiddleware(todo_Service), async (req, res) => {
    const query = new FetchTodosQuery();
    const response = await queryBus.execute(query);
    res.status(200).send(response);
})

router.post('/', async (req, res, next) => {
  try {
     const command = new CreateTodoCommand(req.body.title, req.body.description, req.body.userId);
     const response = await commandBus.dispatch(command);
     res.status(201).send(response);
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res) => {
  console.log("hit update")
  const command = new UpdateTodoCommand(req.params.id, req.body)
  const response = await commandBus.dispatch(command);
  const { status, message } = response;
  res.status(status).send({message: message});
})


router.delete('/:id', async (req, res) => {
  const command = new DeleteTodoCommand(req.params.id)
  const response = await commandBus.dispatch(command);
  const { status, message } = response;
  res.status(status).send({message: message});
})


export {router}

