<template>
  <div class="container-fluid" v-if="state.bug.creator">
    <div class="row">
      <div class="col">
        <h1>{{ state.bug.title }}</h1>
      </div>
      <div class="col" v-if="!state.bug.closed">
        <button type="button" class="btn btn-dark" @click="state.editBug = !state.editBug" v-if="state.bug.creator.email === state.user.email">
          Edit Bug
        </button>
        <button type="button" class="btn btn-danger" @click="close">
          Close Bug
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row mb-3">
          <div class="col-3 offset-1 mx-5 mt-4 border border-dark">
            <p class="m-3">
              {{ state.bug.description }}
            </p>
          </div>
        </div>
        <div class="col">
          <div v-if="state.bug">
            <div v-if="state.bug.updatedAt != state.bug.createdAt">
              updated on {{ new Date(state.bug.updatedAt).toLocaleString() }}
            </div>
          </div>
        </div>
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
        <div class="col">
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
      <div class="row text-center mt-2" v-if="state.editBug">
        <div class="col">
          <button type="submit" class="btn btn-dark">
            Submit Edit
          </button>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col-12 col-sm-7 pl-5" v-if="state.bug.creator">
        <span>Reported by: </span> <span><h3>{{ state.bug.creator.email }}</h3></span>
        <img :src="state.bug.creator.picture" alt="Creator" />
      </div>
      <div class="col-12 col-sm-3 offset-sm-1 pl-4">
        <div v-if="state.bug.closed" class="card-body">
          <h3>Status: <span class="text-danger">CLOSED</span></h3>
        </div>
        <div v-else class="card-body">
          <h3>Status: <span class="text-success">OPEN</span></h3>
        </div>
      </div>
    </div>
    <div v-if="state.bug">
      <div v-if="state.bug.creator">
        <div class="row my-3">
          <div class="col col-md-4 offset-md-6 text-right" v-if="!state.bug.closed">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col" v-if="!state.bug.closed">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-note">
          Create Note
        </button>
      </div>
    </div>
    <Note v-for="note in state.notes" :key="note.id" :note="note" />
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
      editBug: false
    })
    onMounted(() => {
      AppState.bug = {}
      AppState.notes = []
      bugsService.getById(route.params.id)
      bugsService.getNotesById(route.params.id)
    })
    onBeforeMount(() => {
      AppState.bug = {}
      AppState.notes = []
    })
    return {
      state,
      route,
      async edit() {
        await bugsService.edit(state.bug)
        state.editBug = false
      },
      async close() {
        await bugsService.delete(state.bug.id)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
