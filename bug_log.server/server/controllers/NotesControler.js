import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .put('/:id', this.edit)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const notes = await notesService.find()
      res.send(notes)
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const note = await notesService.findById(req.params.id)
      res.send(note)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const note = await notesService.create(req.body)
      // @ts-ignore ESLint error. Think its a mongoose document. Runs fine.
      note.creator = req.userInfo
      res.send(note)
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      delete req.body.closed
      const note = await notesService.edit(req.params.id, req.body, req.userInfo.id)
      res.send(note)
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      const note = await notesService.delete(req.params.id, req.userInfo.id)
      res.send(note)
    } catch (err) {
      next(err)
    }
  }
}
