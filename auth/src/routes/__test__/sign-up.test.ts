import request from 'supertest';
import { app } from '../../app';

it("return a 201 on successful sign up", async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "zhaojing123"
    })
    .expect(201)
})

it("return a 400 with an invaild email", async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "testtest.com",
      password: "zhaojing123"
    })
    .expect(400)
})

it("return a 400 with an invaild password", async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "123"
    })
    .expect(400)
})

it("return a 400 with an missing email and password", async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
    })
    .expect(400)
  await request(app)
    .post('/api/users/signup')
    .send({
      password: "zhaojing123"
    })
    .expect(400)
  await request(app)
    .post('/api/users/signup')
    .send({

    })
    .expect(400)
})


it("disallowed dupilcated sign up email", async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "zhaojing123"
    })
    .expect(201)
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "zhaojing123"
    })
    .expect(400)
})

it("sets a cookies after successful sign up", async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "zhaojing123"
    })
    .expect(201)
  //response.get() is a built in method in response for easy to fetch header property
  expect(response.get('Set-Cookie')).toBeDefined()
})
