import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async find(query = {}) {
    const note = await dbContext.Note.find(query).populate('creator')
    return note
  }

  async findById(id) {
    const note = await dbContext.Note.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(body) {
    return await (await dbContext.Note.create(body)).populate('creator')
  }

  async delete(id) {
    const note = await dbContext.Note.findByIdAndUpdate(id, { closed: true }, { new: true })
    if (!note) {
      throw new BadRequest('No Note exists with that ID')
    }
  }

  async edit(id, body) {
    return await dbContext.Note.findByIdAndUpdate(id, body)
  }
}

export const noteService = new NoteService()
