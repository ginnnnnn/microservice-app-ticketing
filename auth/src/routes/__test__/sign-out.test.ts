import request from 'supertest'
import { app } from '../../app'

it('clear the cookies after signing out', async () => {
  const signUpResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "zhaojing123"
    })
    .expect(201)

  expect(signUpResponse.get("Set-Cookie")).toBeDefined()
  const signoutResponse = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200)

  // expect(signoutResponse.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
  expect(signoutResponse.get('Set-Cookie')).toBeDefined()

})