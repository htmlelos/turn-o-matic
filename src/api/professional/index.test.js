import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import express from '../../services/express'
import routes, { Professional } from '.'

const app = () => express(routes)

let professional

beforeEach(async () => {
  professional = await Professional.create({})
})

test('POST /professionals 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, name: 'test', categories: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.categories).toEqual('test')
})

test('POST /professionals 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /professionals 200 (master)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /professionals 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /professionals/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`/${professional.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(professional.id)
})

test('GET /professionals/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${professional.id}`)
  expect(status).toBe(401)
})

test('GET /professionals/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /professionals/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`/${professional.id}`)
    .send({ access_token: masterKey, name: 'test', categories: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(professional.id)
  expect(body.name).toEqual('test')
  expect(body.categories).toEqual('test')
})

test('PUT /professionals/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${professional.id}`)
  expect(status).toBe(401)
})

test('PUT /professionals/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', categories: 'test' })
  expect(status).toBe(404)
})

test('DELETE /professionals/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${professional.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /professionals/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${professional.id}`)
  expect(status).toBe(401)
})

test('DELETE /professionals/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
