<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>BUG LIST</h1>
      </div>
      <div class="col">
        <!-- <i class="fa fa-plus-circle text-light" aria-hidden="true" @click="addBug(bug.id)"></i> -->
        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#report-bug">
          Create Bug
        </button>
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
      account: computed(() => AppState.account)
    })
    onMounted(() => {
      bugsService.getAll()
    })
    return {
      state, route
      // ,
      //  addBug(bug) {
      //   bugsService.createBug(bug)
      // }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
