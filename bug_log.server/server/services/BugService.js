import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async find(query = {}) {
    const bug = await dbContext.Bug.find(query)
    return bug
  }

  async findById(id) {
    const bug = await dbContext.Bug.findById(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    return await dbContext.Bug.create(body)
  }

  async delete(id) {
    const bug = await dbContext.Bug.findByIdAndUpdate(id, { closed: true }, { new: true })
    if (!bug) {
      throw new BadRequest('No Bug exists with that ID')
    }
  }
}

export const bugService = new BugService()
