import request from 'supertest'
import { app } from '../../app'


it('responses a detail with a current user', async () => {

  const cookie = await global.signin()
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)


  expect(response.body.currentUser.email).toEqual("test@email.com")
})

it('response null with no current user', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200)

  expect(response.body.currentUser).toEqual(null)
})