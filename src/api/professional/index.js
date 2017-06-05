import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Professional, { schema } from './model'

const router = new Router()
const { name, categories } = schema.tree

/**
 * @api {post} /professionals Create professional
 * @apiName CreateProfessional
 * @apiGroup Professional
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Professional's name.
 * @apiParam categories Professional's categories.
 * @apiSuccess {Object} professional Professional's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Professional not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, categories }),
  create)

/**
 * @api {get} /professionals Retrieve professionals
 * @apiName RetrieveProfessionals
 * @apiGroup Professional
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} professionals List of professionals.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /professionals/:id Retrieve professional
 * @apiName RetrieveProfessional
 * @apiGroup Professional
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} professional Professional's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Professional not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /professionals/:id Update professional
 * @apiName UpdateProfessional
 * @apiGroup Professional
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Professional's name.
 * @apiParam categories Professional's categories.
 * @apiSuccess {Object} professional Professional's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Professional not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, categories }),
  update)

/**
 * @api {delete} /professionals/:id Delete professional
 * @apiName DeleteProfessional
 * @apiGroup Professional
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Professional not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
