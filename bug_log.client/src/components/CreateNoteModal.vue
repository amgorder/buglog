<template>
  <div class="create-note-modal">
    <!-- Modal -->
    <div class="modal fade"
         id="create-note"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content text-between">
          <div class="modal-header">
            <h5 class="modal-title">
              Create Note
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form" @submit.prevent="create">
              <div class="form-group">
                <div class="row">
                  <div class="col-12">
                    <input type="text"
                           name="body"
                           id="note-body"
                           class="form-control"
                           placeholder="Enter Note here..."
                           aria-describedby="helpId"
                           v-model="state.note.body"
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                </div>
                <div class="col text-right">
                  <button class="btn btn-success" type="submit">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
export default ({
  name: 'CreateNoteModal',
  setup() {
    const state = reactive({
      note: {},
      bug: computed(() => AppState.bug)
    })
    return {
      state,
      async create() {
        try {
          state.note.bug = state.bug
          await notesService.create(state.note)
          state.note = {}
          $('#create-note').modal('hide')
          // $('.modal-backdrop').remove() WHY IS IT WORKING WITHOUT THIS?!?!?
        } catch (err) {
          logger.error(err)
        }
      }
    }
  }
})
</script>

<style scoped>
  textarea {
    resize: none;
  }
  textarea.ta10em {
    height: 20em;
  }
</style>
