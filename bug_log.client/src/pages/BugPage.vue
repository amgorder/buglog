<template>
  <div class="container-fluid">
    <div class="row text-center pt-3">
      <div class="col">
        <h1>Bug List</h1>
      </div>
      <div class="col">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#report-bug">
          Create Bug
        </button>
      </div>
      <div class="col-12 col-md-2 pt-1">
        <div>
          <button type="button" class="btn btn-primary" @click="filterClosed">
            {{ state.showClosed ? 'Show Closed' : 'Hide Closed' }}
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <Bug class="col-12" v-for="bug in state.bugs" :key="bug._id" :bug="bug" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    const route = useRoute()
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      showClosed: false
    })
    onMounted(() => {
      bugsService.getAll()
    })
    return {
      state,
      route,
      async filterClosed() {
        await bugsService.filterClosed(state.showClosed)
        state.showClosed = !state.showClosed
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
