import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import express from '../../services/express'
import routes, { Customer } from '.'

const app = () => express(routes)

let customer

beforeEach(async () => {
  customer = await Customer.create({})
})

test('POST /customers 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, name: 'test', email: 'test', phone: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.phone).toEqual('test')
})

test('POST /customers 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /customers 200 (master)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /customers 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /customers/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`/${customer.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(customer.id)
})

test('GET /customers/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${customer.id}`)
  expect(status).toBe(401)
})

test('GET /customers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /customers/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`/${customer.id}`)
    .send({ access_token: masterKey, name: 'test', email: 'test', phone: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(customer.id)
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.phone).toEqual('test')
})

test('PUT /customers/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${customer.id}`)
  expect(status).toBe(401)
})

test('PUT /customers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', email: 'test', phone: 'test' })
  expect(status).toBe(404)
})

test('DELETE /customers/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${customer.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /customers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${customer.id}`)
  expect(status).toBe(401)
})

test('DELETE /customers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
