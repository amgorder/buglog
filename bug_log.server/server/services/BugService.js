import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async find(query = {}) {
    const bug = await dbContext.Bug.find(query).populate('creator')
    return bug
  }

  async findById(id) {
    const bug = await dbContext.Bug.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    return await (await dbContext.Bug.create(body)).populate('creator')
  }

  async delete(id) {
    const bug = await dbContext.Bug.findByIdAndUpdate(id, { closed: true }, { new: true })
    if (!bug) {
      throw new BadRequest('No Bug exists with that ID')
    }
  }

  async edit(id, body) {
    return await dbContext.Bug.findByIdAndUpdate(id, body)
  }
}

export const bugService = new BugService()
