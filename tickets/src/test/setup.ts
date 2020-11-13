import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app'
import request from 'supertest'
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[]
    }
  }
}

//beforeAll is jest function ,every things inside the bracket will run before all other test start excuted
let mongo: any
beforeAll(async () => {
  process.env.JWT_KEY = "zhaojing123"
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

//this will run every time before every test,so we wannna delete all data in mondoDB
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

//afterAll,after all test we want to disconnect and kill the server
afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})


global.signin = () => {
  //Build a JWT payload ,{id email}
  const payload = {
    email: "test@test.com",
    passowrd: "1323dwjdwjdiw"
  }

  //Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  //Build session object. {jwt:JWT}
  const sesson = { jwt: token }

  //turn the session into json
  const sessionJSON = JSON.stringify(sesson)

  //take json and encode it as base 64

  const base64 = Buffer.from(sessionJSON).toString('base64')
  //return a string that is the cookie with encoded data
  return [`express:sess=${base64}`]

}
