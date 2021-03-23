import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator', 'name email picture')
    return bugs
  }

  async findById(id) {
    /*
      .populate goes to virtual field of Bug model
      'creator' is reference to virtual
      'name picture email' = properties of the model reference in virtual field
    */
    const bug = await dbContext.Bugs.findById(id).populate('creator', 'name picture email')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(newBug) {
    const res = await dbContext.Bugs.create(newBug)

    return res
  }

  async edit(id, update, userId) {
    const bug = await this.findById(id)
    if (bug.creatorId !== userId) {
      throw new BadRequest("You can't edit this.")
    }
    if (bug.closed) {
      throw new BadRequest("Can't edit a closed bug.")
    }
    return await dbContext.Bugs.findOneAndUpdate({ _id: id, closed: false }, { description: update.description, title: update.title }, { new: true })
  }

  async delete(id) {
    const res = await dbContext.Bugs.findOneAndUpdate({ _id: id }, { closed: true }, { new: true })
    return res
  }
}

export const bugsService = new BugsService()
