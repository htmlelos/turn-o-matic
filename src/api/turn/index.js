import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Turn, { schema } from './model'

const router = new Router()
const { date, customer, professional, category, comments } = schema.tree

/**
 * @api {post} /turns Create turn
 * @apiName CreateTurn
 * @apiGroup Turn
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam date Turn's date.
 * @apiParam customer Turn's customer.
 * @apiParam professional Turn's professional.
 * @apiParam category Turn's category.
 * @apiParam comments Turn's comments.
 * @apiSuccess {Object} turn Turn's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Turn not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ date, customer, professional, category, comments }),
  create)

/**
 * @api {get} /turns Retrieve turns
 * @apiName RetrieveTurns
 * @apiGroup Turn
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} turns List of turns.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /turns/:id Retrieve turn
 * @apiName RetrieveTurn
 * @apiGroup Turn
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} turn Turn's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Turn not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /turns/:id Update turn
 * @apiName UpdateTurn
 * @apiGroup Turn
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam date Turn's date.
 * @apiParam customer Turn's customer.
 * @apiParam professional Turn's professional.
 * @apiParam category Turn's category.
 * @apiParam comments Turn's comments.
 * @apiSuccess {Object} turn Turn's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Turn not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ date, customer, professional, category, comments }),
  update)

/**
 * @api {delete} /turns/:id Delete turn
 * @apiName DeleteTurn
 * @apiGroup Turn
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Turn not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
