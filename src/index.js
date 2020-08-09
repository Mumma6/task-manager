const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 5000

/*
Without middleware:   new request -> run route handler (vanliga sättet)
With middleware:      new request -> do something(like a funktion) -> run route handler
*/

// Middleware functions
/*
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.send('GET request are disable')
  } else {
    // By calling next we "move along"
    next()
  }
})
*/

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))

const jwt = require('jsonwebtoken')

// just for testing stuff
const myfunc = async () => {
  // 1 argument is who. Second is a random string, makin sure its valid,
  // 3e är options
  const token = jwt.sign({ _id: 'abc123' }, 'secret', {
    expiresIn: '7 days',
  })
  console.log(token)

  const data = jwt.verify(token, 'secret')
  console.log(data)
}

myfunc()
