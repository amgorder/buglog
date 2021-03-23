<template>
  <div class="container-fluid">
    <div class="col d-inline-flex">
      <div class="card">
        <div class="row">
          <div class="col">
          </div>
          <router-link :to="{name: 'BugDetails', params: {id: bug.id}}">
            <div class="card-body">
              <div class="card-title">
                <h4>{{ bug.title }}</h4>
              </div>
            </div>
          </router-link>
          <div class="row">
            <div class="col">
              <h6>{{ bug.createdAt.split("T")[0] }}</h6>
            </div>
          </div>
          <div class="row" v-if="bug.updatedAt != bug.createdAt">
            <div class="col">
              <div>
                <h6>{{ new Date(bug.updatedAt).toLocaleString() }}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div v-if="bug.creator" class="card-body">
            <div>
              <h6>{{ bug.creator.name }}</h6>
              <img :src="bug.creator.picture" alt="Creator" />
            </div>
          </div>
        </div>
        <div class="col">
          <div v-if="bug">
            <div v-if="bug.closed" class="card-body">
              <h3><span class="text-danger">CLOSED</span></h3>
            </div>
            <div v-else class="card-body">
              <h3><span class="text-success">OPEN</span></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Bug',
  props: {
    bug: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user)
    })
    return {
      state,
      getDate(id) {
        bugsService.getDate(id)
      }
    }
  }
}
</script>

<style scoped>

</style>
