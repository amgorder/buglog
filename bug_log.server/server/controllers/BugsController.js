import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { BadRequest } from '../utils/Errors'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('/:bugId/notes', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .put('/:id', this.edit)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const bugs = await bugsService.find()
      res.send(bugs)
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const bug = await bugsService.findById(req.params.id)
      res.send(bug)
    } catch (err) {
      next(err)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      // bugId is same as up in route with super('api/bugs')
      const notes = await notesService.find({ bug: req.params.bugId })
      res.send(notes)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const bug = await bugsService.create(req.body)
      // @ts-ignore
      bug.creator = req.userInfo
      res.send(bug)
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      delete req.body.closed
      const bugClosed = await bugsService.findById(req.params.id)
      if (bugClosed.closed) {
        throw new BadRequest("You can't edit this when the bug is closed.")
      }
      // @ts-ignore
      const bug = await bugsService.edit(req.params.id, req.body, req.userInfo.id)
      res.send(bug)
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      const bug = await bugsService.delete(req.params.id)
      res.send(bug)
    } catch (err) {
      next(err)
    }
  }
}
