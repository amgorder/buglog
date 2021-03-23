/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (err) {
      logger.error('Could not retrieve bugs', err)
    }
  }

  createBug() {
    try {
      Swal.fire({
        title: 'New Bug',
        html: '<input type="text" id="title" class="swal2-input" maxlength=15 placeholder="Bug Name"><textarea type="text" id="description" class="swal2-input" maxlength=350 placeholder="Bug Description"></textarea>',
        confirmButtonText: 'Create',
        focusConfirm: false,
        preConfirm: () => {
          const description = Swal.getPopup().querySelector('#description').value
          const title = Swal.getPopup().querySelector('#title').value
          if (!title || !description) {
            Swal.showValidationMessage('Please enter a bug title.')
          }
          return { title: title, description: description }
        }
      }).then(async (result) => {
        const newBug = {
          title: result.value.title,
          description: result.value.description
        }
        debugger
        // AppState.bugs.push(newBug)
        await api.post('api/bugs', newBug)
        this.getBugs()
      })
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteBug(id) {
    try {
      const i = AppState.bugs.findIndex(t => t.id === id)
      AppState.bugs.splice(i, 1)
      await api.delete('api/bugs/' + id)
    } catch (err) {
      logger.error('Could not delete bug', err)
    }
  }

  async editBug(rawBug) {
    Swal.fire({
      title: 'Edit Bug',
      html: `<input type="text" id="title" class="swal2-input" placeholder="Board Title" value="${rawBug.title}">`,
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value
        if (!title) {
          Swal.showValidationMessage('Please enter a list title.')
        }
        return { title: title }
      }
    }).then(async (result) => {
      const editedBug = {
        title: result.value.title
      }
      await api.put('api/bugs/' + rawBug.id, editedBug)
      this.getBugs()
    })
  }
}

export const bugService = new BugService()
