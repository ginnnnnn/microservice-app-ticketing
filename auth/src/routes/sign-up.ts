import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { BadRequestError, validateRequest } from '@jingjingthinkingtickets/common'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/api/users/signup', [
  body("email").isEmail().withMessage('email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('password must be between 4 to 20 characters')
], validateRequest, async (req: Request, res: Response) => {
  //creating user
  const { email, password } = req.body
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    //user exist 
    throw new BadRequestError('Email in use')
  }
  //user not exist
  const user = User.build({ email, password })
  await user.save()

  //generate token
  const userJwt = jwt.sign({
    email: user.email,
    id: user.id,
  },
    process.env.JWT_KEY!
  )
  //store it on session object
  //
  req.session = {
    jwt: userJwt
  }

  res.status(201).send(user)
})


export { router as signupRouter }
