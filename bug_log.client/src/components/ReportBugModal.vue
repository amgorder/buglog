<template>
  <div class="report-bug-modal">
    <!-- Modal -->
    <div class="modal fade"
         id="report-bug"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content text-between">
          <div class="modal-header">
            <h5 class="modal-title">
              Report Bug
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
                           name="title"
                           id="bug-title"
                           class="form-control"
                           placeholder="Enter Title"
                           aria-describedby="helpId"
                           v-model="state.bug.title"
                    >
                  </div>
                  <div class="col-12 mt-3">
                    <textarea type="text"
                              name="description"
                              id="bug-description"
                              class="form-control ta10em"
                              placeholder="Enter Description"
                              aria-describedby="helpId"
                              v-model="state.bug.description"
                    >
                    </textarea>
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
import { reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { useRouter } from 'vue-router'
export default ({
  name: 'ReportBugModal',
  setup() {
    const router = useRouter()
    const state = reactive({
      bug: {}
    })
    return {
      state,
      async create() {
        try {
          const bugId = await bugsService.create(state.bug)
          state.bug = {}
          $('#report-bug').modal('hide')
          // $('.modal-backdrop').remove() WHY IS IT WORKING WITHOUT THIS?!?!?
          router.push({ name: 'BugDetails', params: { id: bugId } })
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
