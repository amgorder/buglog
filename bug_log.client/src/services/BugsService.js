import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Bug } from '../models/Bug'
import { Note } from '../models/Note'

class BugsService {
  async getAll() {
    try {
      const res = await api.get('api/bugs')

      AppState.bugs = res.data.map(b => new Bug(b))
    } catch (error) {
      logger.log(error)
    }
  }

  async getById(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.bug = new Bug(res.data)
    } catch (err) {
      logger.error(err)
    }
  }

  async getNotesById(id) {
    try {
      const res = await api.get('api/bugs/' + id + '/notes')
      AppState.notes = res.data.map(n => new Note(n))
    } catch (err) {
      logger.error(err)
    }
  }

  async filterClosed(toggle) {
    if (toggle) {
      const res = await api.get('api/bugs/')
      AppState.bugs = res.data.map(b => new Bug(b))
    } else {
      AppState.bugs = AppState.bugs.filter(b => b.closed !== true)
    }
  }

  async create(bug) {
    try {
      delete bug.id
      const res = await api.post('api/bugs', bug)
      AppState.bugs.push(res.data)
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }

  async edit(bug) {
    try {
      const res = await api.put('api/bugs/' + bug.id, bug)
      this.getById(res.data._id)
    } catch (err) {
      logger.error(err)
    }
  }

  async delete(id) {
    const res = window.confirm('are you sure?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/bugs/' + id)
      this.getById(id)
    } catch (err) {
      logger.error(err)
    }
  }
}
export const bugsService = new BugsService()
