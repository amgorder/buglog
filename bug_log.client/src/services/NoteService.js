/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NoteService {
  async getNotes() {
    try {
      const res = await api.get('api/notes')
      AppState.notes = res.data
    } catch (err) {
      logger.error('Could not retrieve notes', err)
    }
  }

  async deleteNote(id) {
    try {
      const i = AppState.notes.findIndex(l => l.id === id)
      AppState.notes.splice(i, 1)
      const res = await api.delete('api/notes/' + id)
      logger(res)
    } catch (err) {
      logger.error('Could not delete note', err)
    }
  }

  async createNote(bugId) {
    Swal.fire({
      title: 'Create Note',
      html: '<input type="text" id="title" class="swal2-input" placeholder="Enter your note...">',
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value
        if (!title) {
          Swal.showValidationMessage('Please enter a note title.')
        }
        return { title: title }
      }
    }).then(async (result) => {
      const rawNote = {
        title: result.value.title,
        bugId: bugId,
        creatorId: AppState.user.id
      }
      await api.post('api/notes', rawNote)
      this.getNotes()
    })
  }

  async editNote(rawNote) {
    Swal.fire({
      title: 'Edit Note',
      html: `<input type="text" id="title" class="swal2-input" placeholder="Board Title" value="${rawNote.title}">`,
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value
        if (!title) {
          Swal.showValidationMessage('Please enter a note title.')
        }
        return { title: title }
      }
    }).then(async (result) => {
      const editedNote = {
        title: result.value.title
      }
      await api.put('api/notes/' + rawNote.id, editedNote)
      this.getNotes()
    })
  }
}

export const noteService = new NoteService()
