<template>
  <div class="container-fluid" v-if="state.bug">
    <div v-if="!state.loading">
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col" v-if="state.bug.creator">
              <span><h6>{{ state.bug.creator.email }}</h6></span>
              <img :src="state.bug.creator.picture" alt="Creator" />
            </div>
            <h1>{{ state.bug.title }}</h1>
          </div>
        </div>
        <div v-if="state.bug">
          <div class="col" v-if="!state.bug.closed">
            <button type="button" class="btn btn-dark" @click="state.editBug = !state.editBug">
              Edit
            </button>
          </div>
          <div v-if="state.bug.updatedAt != state.bug.createdAt">
            updated on {{ state.bug.updatedAt.split("T")[0] }} at {{ state.bug.updatedAt.slice(11,19) }}
          </div>
        </div>
        <form @submit.prevent="edit" v-if="!state.bug.closed">
          <div class="row" v-if="state.editBug">
            <div class="col">
              <textarea type="text"
                        name="bug-edit"
                        id="bug-edit"
                        class="form-control ta10em"
                        placeholder="Enter Description"
                        aria-describedby="helpId"
                        v-model="state.bug.title"
                        rows="1"
              >
        </textarea>
            </div>
          </div>
          <div class="row" v-if="state.editBug">
            <div class="col-9 offset-1">
              <textarea type="text"
                        name="bug-edit"
                        id="bug-edit"
                        class="form-control ta10em"
                        placeholder="Enter Description"
                        aria-describedby="helpId"
                        v-model="state.bug.description"
                        rows="8"
              >
        </textarea>
            </div>
          </div>
          <div class="row" v-if="state.editBug">
            <div class="col">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
        //switch status to open or close stupid modal isn't working
        <div class="col">
          <div v-if="state.bug.closed" class="card-body">
            <span class="text-danger">CLOSED</span>
          </div>
          <div v-else class="card-body">
            <h3>Status: <span class="text-success">OPEN</span></h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="m-3">
            {{ state.bug.description }}
          </p>
        </div>
      </div>
      <div v-if="state.bug">
        <div v-if="state.bug.creator">
          <div class="row">
            <div class="col" v-if="!state.bug.closed">
              <button type="button" class="btn btn-danger" @click="close">
                Close Bug
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col" v-if="!state.bug.closed">
          <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-note">
            Add Note
          </button> -->
        </div>
      </div>
      <Note v-for="note in state.notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes),
      user: computed(() => AppState.user),
      loading: true,
      editBug: false
    })
    onMounted(() => {
      AppState.bug = {}
      AppState.notes = []
      bugsService.getById(route.params.id)
      bugsService.getNotesById(route.params.id)
      state.loading = false
    })
    onBeforeMount(() => {
      AppState.bug = {}
      AppState.notes = []
    })
    return {
      state,
      route,
      async edit() {
        bugsService.edit(state.bug)
        state.editBug = false
      },
      async close() {
        bugsService.delete(state.bug._id)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
