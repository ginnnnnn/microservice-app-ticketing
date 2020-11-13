import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '@jingjingthinkingtickets/common'
import { Password } from '../services/password'
import { User } from '../models/user'


const router = express.Router()

router.post('/api/users/signin', [
  body('email').isEmail().withMessage('email must be provided'),
  body('password').trim().notEmpty().withMessage('you must supply a password')
], validateRequest, async (req: Request, res: Response) => {

  const { email, password } = req.body
  const existingUser = await User.findOne({ email: email })
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials')
  }
  const passwordMatched = await Password.compare(existingUser.password, password)
  if (!passwordMatched) {
    throw new BadRequestError('Invalid credentials')
  }
  //generate token
  const userJwt = jwt.sign({
    email: existingUser.email,
    id: existingUser.id,
  },
    process.env.JWT_KEY!
  )
  //store it on session object
  //
  req.session = {
    jwt: userJwt
  }
  res.status(201).send(existingUser)
})


export { router as signinRouter }
