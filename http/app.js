import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
const app = express()
import bodyParser from 'body-parser';
import session from 'express-session'
import { router as usersRoutes } from './routes/users.js';
import { router as todoRoutes } from './routes/todo.js';
import { router as oauthRoutes } from './routes/oauth.js';
import { router as jwtRoutes } from './routes/jwt.js';
import { authenticate } from './middleware/authentications.js';
import { jwtStrategy } from '../Infrastructure/Services/jwtStrategy.js';
import { refreshStrategy } from '../Infrastructure/Services/jwtStrategy.js';
import passport from 'passport';
import ErrorHandler from './middleware/errorHandler.js';

const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
passport.initialize();
passport.use('jwt', jwtStrategy)
passport.use('refresh', refreshStrategy)

// middleware to memic authentication
function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else res.send("Please login first to access")
}

//app.use('/users', isAuthenticated, usersRoutes)
app.use('/oauth', oauthRoutes)
app.use('/jwt', jwtRoutes)
app.use('/users', usersRoutes)
app.use('/todo', authenticate, todoRoutes)

app.get('/', (req, res) => {
  req.session.user = "logged in"
  res.send(`App Landing without Routes! Login Status: ${req.session.user}`)
})

app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`)
})

export {app}