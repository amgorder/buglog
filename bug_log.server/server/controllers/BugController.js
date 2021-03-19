import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'

export class BugController extends BaseController {
  constructor() {
    super('api/bug')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await bugService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await bugService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await bugService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const bug = await bugService.delete(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
