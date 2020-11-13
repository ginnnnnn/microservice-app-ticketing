import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app'
import request from 'supertest'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>
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


global.signin = async () => {
  const email = "test@email.com"
  const password = "zhaojing123"
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201)
  const cookie = response.get('Set-Cookie')
  return cookie
}
