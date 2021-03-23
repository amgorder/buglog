<template>
  <div class="col-12 text-dark mt-3" onload="loadState()">
    <form class="form-inline d-flex" @submit.prevent="createBug">
      <div class="form-group">
        <button type="submit" class="btn btn-dark text-light mb-3">
          New Bug
        </button>
      </div>
    </form>
    <div class="row d-flex justify-content-evenly">
      <div class="col">
        <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const route = useRoute()

    onMounted(() => {
      bugService.getBugs() // ASYNC AWAIT DOESNT WORK WITH ONMOUNTED
    })

    const state = reactive({
      bugs: computed(() => AppState.bugs),
      newBugName: 'Bug Title'
    })
    return {
      state,
      createBug(event) {
        bugService.createBug(event, route)
      },
      loadState() {
      },
      route
    }
  }
}
</script>

<style lang="scss">
.dropdown-item {
  min-height: 20px;
}

input[type="color"] {
  height: 38px;
  width: 38px;
  border-radius: 6px;
  border: 1.5px solid black;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
