import express from 'express';
import {paginationMiddleware} from '../middleware/pagination.js';
import FetchTodosQuery from '../../Application/Queries/FetchTodos/FetchTodosQuery.js';
import CreateTodoCommand from '../../Application/Commands/Todo/CreateTodo/CreateTodoCommand.js';
import UpdateTodoCommand from '../../Application/Commands/Todo/UpdateTodo/UpdateTodoCommand.js';
import DeleteTodoCommand from '../../Application/Commands/Todo/DeleteTodo/DeleteTodoCommand.js';
import {container} from '../../Infrastructure/DI/container.js'
import TodoController from '../controller/Todo.controller.js';

const router = express.Router()
const commandBus = container.resolve('commandBus');
const queryBus = container.resolve('queryBus'); 
//const todo_Service = container.resolve('todoService') //check later should implement depency injection here too

// middleware defined for later use that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', paginationMiddleware(), TodoController.findAllTodos)

router.post('/', TodoController.createTodo)

router.put('/:id', TodoController.updateTodo)

router.delete('/:id', TodoController.deleteTodo)


export {router}

