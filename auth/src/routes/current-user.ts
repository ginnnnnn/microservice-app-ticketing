import express from 'express'
import { currentUser } from '@jingjingthinkingtickets/common'

const router = express.Router()

router.get('/api/users/currentuser', currentUser, (req, res) => {
  // if(!req.session || req.session.jwt) <-js !req.session?.jwt ts
  return res.send({ currentUser: req.currentUser || null })
  // if (!req.session?.jwt) {
  //   return res.send({ currentUser: null })
  // }
  // try {
  //   //if token has been modified ,it will throw error
  //   const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
  //   return res.send({ currentUser: payload })
  // } catch (err) {
  //   return res.send({ currentUser: null })
  // }
})


export { router as currentUserRouter }
