import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import { errorHandler, NotFoundError, currentUser } from '@jingjingthinkingtickets/common';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new'



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

app.use(currentUser)

app.use(createTicketRouter)
app.all("*", async () => {
  throw new NotFoundError()
})

app.use(errorHandler)


export { app }