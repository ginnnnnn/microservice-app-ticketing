import request from 'supertest'
import { app } from '../../app'

it('return a 400 on missing email or password', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({

    }).expect(400)
  await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com"
    }).expect(400)
  await request(app)
    .post('/api/users/signin')
    .send({
      password: "zhaojing123"
    }).expect(400)
})

it('return a 400 on Invalid credentials,no exist email or password no match', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "zhaojing123"
    })
    .expect(201)
  await request(app)
    .post('/api/users/signin')
    .send({
      email: "test2@test.com",
      password: "zhaojing123"
    }).expect(400)
  await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "zhaojing1234"
    }).expect(400)
})

it('return a 201 on successfil sign in', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "zhaojing123"
    })
    .expect(201)
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "zhaojing123"
    }).expect(201)
  expect(response.get('Set-Cookie')).toBeDefined()
})