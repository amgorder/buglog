/* eslint-disable no-undef */
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

  // create(bug) {
  //   try {
  //     Swal.fire({
  //       title: 'New Bug',
  //       html: '<input type="text" id="title" class="swal2-input" maxlength=15 placeholder="Bug Name"><input type="text" id="description" class="swal2-input" maxlength=150 placeholder="Description">',
  //       confirmButtonText: 'Create',
  //       focusConfirm: false,
  //       preConfirm: () => {
  //         const title = Swal.getPopup().querySelector('#title').value
  //         if (!title) {
  //           Swal.showValidationMessage('Please enter a bug title.')
  //         }
  //         return { title: title }
  //       }
  //     }).then(async (result) => {
  //       const newBug = {
  //         title: result.value.title,
  //         description: result.value.description
  //       }
  //       AppState.bugs.push(newBug)
  //       await api.post('api/bugs', newBug)
  //       this.getBugs()
  //     })
  //   } catch (error) {
  //     logger.log(error)
  //   }
  // }
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
