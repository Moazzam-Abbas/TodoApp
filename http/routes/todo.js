import express from 'express';
import {paginationMiddleware} from '../middleware/pagination.js';
import TodoController from '../controller/Todo.controller.js';
import {todoCreationValidation, todoUpdateValidation, todoDeleteValidation}from '../middleware/validations.js'

const router = express.Router()

router.get('/', paginationMiddleware(), TodoController.findAllTodos)

router.post('/', todoCreationValidation, TodoController.createTodo)

router.put('/:id', todoUpdateValidation, TodoController.updateTodo)

router.delete('/:id', todoDeleteValidation, TodoController.deleteTodo)


export {router}

