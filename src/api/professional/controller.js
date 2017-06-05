import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Professional } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Professional.create(body)
    .then((professional) => professional.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Professional.find(query, select, cursor)
    .then((professionals) => professionals.map((professional) => professional.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Professional.findById(params.id)
    .then(notFound(res))
    .then((professional) => professional ? professional.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Professional.findById(params.id)
    .then(notFound(res))
    .then((professional) => professional ? _.merge(professional, body).save() : null)
    .then((professional) => professional ? professional.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Professional.findById(params.id)
    .then(notFound(res))
    .then((professional) => professional ? professional.remove() : null)
    .then(success(res, 204))
    .catch(next)
