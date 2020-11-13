import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/sign-in';
import { signoutRouter } from './routes/sign-out';
import { signupRouter } from './routes/sign-up';
import { errorHandler, NotFoundError } from '@jingjingthinkingtickets/common';
import cookieSession from 'cookie-session';




const app = express()
app.set('trust proxy', true)
//accept proxy ,this is for nginX
app.use(json())

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
  })
)

app.use(currentUserRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(signinRouter)


// //op1
// app.all('*', () => {
//   throw new NotFoundError()
// })
// //op2
// app.all('*', async (req, res, next) => {
//   next(new NotFoundError())
// })

//option3
app.all("*", async () => {
  throw new NotFoundError()
})

app.use(errorHandler)


export { app }