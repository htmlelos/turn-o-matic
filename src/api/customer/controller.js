import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Customer } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Customer.create(body)
    .then((customer) => customer.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Customer.find(query, select, cursor)
    .then((customers) => customers.map((customer) => customer.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Customer.findById(params.id)
    .then(notFound(res))
    .then((customer) => customer ? customer.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Customer.findById(params.id)
    .then(notFound(res))
    .then((customer) => customer ? _.merge(customer, body).save() : null)
    .then((customer) => customer ? customer.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Customer.findById(params.id)
    .then(notFound(res))
    .then((customer) => customer ? customer.remove() : null)
    .then(success(res, 204))
    .catch(next)
