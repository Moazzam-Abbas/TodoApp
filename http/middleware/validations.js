import UserValidations from '../../Infrastructure/Validations/UserValidations.js';
import TodoValidations from '../../Infrastructure/Validations/TodoValidations.js';


async function userRegistrationValidation (req, res, next) {
    try {
        UserValidations.isValidUserCommand({userName: req.body.userName, password:req.body.password})
        UserValidations.passwordCompatibilityCheck(req.body.password)
        next()
    } catch (error) {
        next(error)
    }
}

async function userUpdateValidation (req, res, next) {

    try {
        const { conatinsPassword } = UserValidations.isValidUserUpdateCommand(req.body)
        if (conatinsPassword) {
          UserValidations.passwordCompatibilityCheck(req.body.password)
          next()
        }
    } catch (error) {
        next(error)
    }

}

async function userDeleteValidation (req, res, next) {

  try {
    UserValidations.isValidUserDeleteCommand({id: req.params.id})
    next()
  } catch (error) {
    next(error)
  }

}

async function todoCreationValidation (req, res, next) {
    try {
        TodoValidations.isValidTodoCommand({ title: req.body.title, description: req.body.description, userId: req.body.userId})
        next()
    } catch (error) {
        next(error)
    }
}

async function todoUpdateValidation (req, res, next) {

    try {
          TodoValidations.isValidTodoUpdateCommand(req.body)
          next()
    } catch (error) {
        next(error)
    }

}

async function todoDeleteValidation (req, res, next) {

  try {
    TodoValidations.isValidTodoDeleteCommand({id: req.params.id})
    next()
  } catch (error) {
    next(error)
  }

}

export { userRegistrationValidation, userUpdateValidation, userDeleteValidation, todoCreationValidation, todoUpdateValidation, todoDeleteValidation }
