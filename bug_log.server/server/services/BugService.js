import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async find(query = {}) {
    const bug = await dbContext.Bug.find(query)
    return bug
  }

  async findById(id) {
    const value = await dbContext.Bug.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }
}

export const bugService = new BugService()
