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

  // createbug(bug) {
  //   try {
  //     Swal.fire({
  //       title: 'New bug',
  //       html: '<input type="text" id="title" class="swal2-input" maxlength=15 placeholder="bug Name">',
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
  //       const newbug = {
  //         title: result.value.title,
  //         bug: bug
  //       }
  //       AppState.bugs.push(newbug)
  //       await api.post('api/bugs', newbug)
  //       this.getbugs()
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
    const res = window.confirm('are you sure you want to close your bug?')
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

  getDate(id) {
    const bug = AppState.bugs.find(b => b.id === id)
    if (bug) {
      const date = bug.createdAt
      const updatedDate = new Date(date)
      const year = updatedDate.getFullYear()
      const month = (this.fixLowNumber(updatedDate.getMonth() + 1))
      const day = this.fixLowNumber(updatedDate.getDate())
      const hour = this.fixLowNumber(updatedDate.getHours())
      const minute = this.fixLowNumber(updatedDate.getMinutes())
      const newDate = `${month}-${day}-${year} ${hour}:${minute}`
      return newDate
    }

    return 0
  }

  fixLowNumber(n) {
    return (n < 10 ? '0' : '') + n
  }
}
export const bugsService = new BugsService()
