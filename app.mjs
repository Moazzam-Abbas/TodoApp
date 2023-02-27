import express from 'express';
const app = express()
import bodyParser from 'body-parser';
import session from 'express-session'
import { router as usersRoutes } from './routes/users.mjs';
import { router as todoRoutes } from './routes/todo.mjs';
const port = process.env.PORT || 3000;

// middleware to test if authenticated
function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else res.send("Please login first to access")
}

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/users', isAuthenticated, usersRoutes)
app.use('/todo', isAuthenticated, todoRoutes)

app.get('/', (req, res) => {
  req.session.user = "logged in"
  res.send(`App Landing without Routes! Login Status: ${req.session.user}`)
})


app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`)
})
