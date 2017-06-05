import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Customer, { schema } from './model'

const router = new Router()
const { name, email, phone } = schema.tree

/**
 * @api {post} /customers Create customer
 * @apiName CreateCustomer
 * @apiGroup Customer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Customer's name.
 * @apiParam email Customer's email.
 * @apiParam phone Customer's phone.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, email, phone }),
  create)

/**
 * @api {get} /customers Retrieve customers
 * @apiName RetrieveCustomers
 * @apiGroup Customer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} customers List of customers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /customers/:id Retrieve customer
 * @apiName RetrieveCustomer
 * @apiGroup Customer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /customers/:id Update customer
 * @apiName UpdateCustomer
 * @apiGroup Customer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Customer's name.
 * @apiParam email Customer's email.
 * @apiParam phone Customer's phone.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, email, phone }),
  update)

/**
 * @api {delete} /customers/:id Delete customer
 * @apiName DeleteCustomer
 * @apiGroup Customer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Customer not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
