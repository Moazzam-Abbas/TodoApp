//const db = require("../models");
import db from '../models/index.js'
const User = db.User;
const TodoItem = db.todoItems
const sequalize = db.sequelize;
const Op = db.Sequelize.Op;
import crypto from 'crypto';

// Create and Save a new User
export const create = (req, res) => {
    
    // Validate request
    if (!req.body.userName || !req.body.password) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      // Create a User
      const user = {
        userName: req.body.userName,
        password: req.body.password,
      };
      // Save User in the database
      try {
        (async () => {
          const result = await User.create(user);
          // user exists in the database now!
          console.log(result instanceof User); // true
          console.log(JSON.stringify(result)); // "result"
          res.send(JSON.stringify(result));
         })();
      } catch (error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating the User."
        });
      }
      
};

// Retrieve all User from the database.
// Retrieve all User/ find by title from the database:
export const findAll = (req, res) => {

try {
  (async () => {
    const result = await User.findAll();
    console.log(JSON.stringify(result)); // "result"
    res.send(result);
   })();
} catch (error) {
  res.status(500).send({
    message:
      error.message || "Some error occurred while deleting the User."
  });
}

};

// Update a User by the id in the request
// Update a User identified by the id in the request
export const update = async (req, res) => {
 
  try {
   // const user = req.body
    (async () => {
      const result = await User.update(req.body, {
          where: {
            id: req.query.id
          }
        });
      console.log(JSON.stringify(result)); // "result"
      res.send(JSON.stringify(result)); 
    })();
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating the User."
    });
  }
  
};

// Delete a User with the specified id in the request
// Delete a User with the specified id
export const deleteOne = (req, res) => {

try {
  (async () => {
    const result = await User.destroy({
        where: {
            id: req.query.id
        }
     });
     console.log(JSON.stringify(result)); // "result"
     res.send({ message: "user was deleted successfully !" }); 
   })();
} catch (error) {
  res.status(500).send({
    message: "Could not delete user reason.... " + error.message
  });
}

};

export const EagerLoad = (req, res) => {

    (async () => {
      try {
        const result = await User.findOne({
          where: {
            userName: "Jane"
          },
          include: TodoItem
        });
        console.log(JSON.stringify(result)); // "result"
        res.send(result);
      } catch (error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while eagerly loading the User."
        });
      }
      
     })();
 
};


