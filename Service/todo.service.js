//const db = require("../models");
import db from '../models/index.js'
const ToDoItem = db.todoItems;
const sequalize = db.sequelize;
const Op = db.Sequelize.Op;
import crypto from 'crypto';

// Create and Save a new ToDoItem
export const create = (req, res) => {
    
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      // Create a ToDoItem
      const todoItem = {
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
      };
      // Save ToDoItem in the database
      try {
        (async () => {
          const item = await ToDoItem.create(todoItem);
          // item exists in the database now!
          console.log(item instanceof ToDoItem); // true
          console.log(JSON.stringify(item)); // "result"
          res.send(item);
         })();
      } catch (error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating the TodoItem."
        });
      }
      
};

// Retrieve all ToDoItems from the database.
// Retrieve all ToDoItems/ find by title from the database:
export const findAll = (req, res) => {

try {
  (async () => {
    const item = await ToDoItem.findAll();
    console.log(JSON.stringify(item)); // "result"
    res.send(item);
   })();
} catch (error) {
  res.status(500).send({
    message:
      error.message || "Some error occurred while deleting the TodoItem."
  });
}

};

// Update a ToDoItem by the id in the request
// Update a ToDoItem identified by the id in the request
export const update = async (req, res) => {
 
  try {
  //  const todoItem = req.body
    (async () => {
      const item = await ToDoItem.update(req.body, {
          where: {
            id: req.query.id
          }
        });
      console.log(JSON.stringify(item)); // "result"
      res.send(JSON.stringify(item)); 
    })();
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating the TodoItem."
    });
  }
  
};

// Delete a ToDoItem with the specified id in the request
// Delete a ToDoItem with the specified id
export const deleteOne = (req, res) => {

try {
  (async () => {
    const item = await ToDoItem.destroy({
        where: {
            id: req.query.id
        }
     });
     console.log(JSON.stringify(item)); // "result"
     res.send({ message: "todoItem was deleted successfully !" }); 
   })();
} catch (error) {
  res.status(500).send({
    message: "Could not delete todoItem reason.... " + error.message
  });
}

};


