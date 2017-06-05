import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import express from '../../services/express'
import routes, { Turn } from '.'

const app = () => express(routes)

let turn

beforeEach(async () => {
  turn = await Turn.create({})
})

test('POST /turns 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, date: 'test', customer: 'test', professional: 'test', category: 'test', comments: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.customer).toEqual('test')
  expect(body.professional).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.comments).toEqual('test')
})

test('POST /turns 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /turns 200 (master)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /turns 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /turns/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`/${turn.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(turn.id)
})

test('GET /turns/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${turn.id}`)
  expect(status).toBe(401)
})

test('GET /turns/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /turns/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`/${turn.id}`)
    .send({ access_token: masterKey, date: 'test', customer: 'test', professional: 'test', category: 'test', comments: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(turn.id)
  expect(body.date).toEqual('test')
  expect(body.customer).toEqual('test')
  expect(body.professional).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.comments).toEqual('test')
})

test('PUT /turns/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${turn.id}`)
  expect(status).toBe(401)
})

test('PUT /turns/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, date: 'test', customer: 'test', professional: 'test', category: 'test', comments: 'test' })
  expect(status).toBe(404)
})

test('DELETE /turns/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${turn.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /turns/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${turn.id}`)
  expect(status).toBe(401)
})

test('DELETE /turns/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
