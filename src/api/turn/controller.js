import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Turn } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Turn.create(body)
    .then((turn) => turn.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Turn.find(query, select, cursor)
    .then((turns) => turns.map((turn) => turn.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Turn.findById(params.id)
    .then(notFound(res))
    .then((turn) => turn ? turn.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Turn.findById(params.id)
    .then(notFound(res))
    .then((turn) => turn ? _.merge(turn, body).save() : null)
    .then((turn) => turn ? turn.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Turn.findById(params.id)
    .then(notFound(res))
    .then((turn) => turn ? turn.remove() : null)
    .then(success(res, 204))
    .catch(next)
