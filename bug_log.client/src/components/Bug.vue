<template>
  <div class="container-fluid py-2 py-md-0">
    <div class="row">
      <div class="card card-decoration col-10 offset-1 offset-md-0 col-md-12">
        <div class="row text-center">
          <div class="col-12 col-md-6 border-sm-bottom align-text-center">
            <div class="row">
              <div class="col-12">
                <div class="d-md-none">
                  <h3><span class="">Issue</span></h3>
                </div>
                <div class="card-body p-0">
                  <div class="card-title">
                    <router-link :to="{name: 'BugDetails', params: {id: bug.id}}">
                      <h1>{{ bug.title }}</h1>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 border-sm-bottom  align-text-md-center">
            <div class="row">
              <div class="col-12">
                <div class="d-md-none">
                  <h6><span class="border-sm-bottom">Reported By</span></h6>
                </div>
                <div v-if="bug.creator" class="card-body">
                  <div>
                    <h5>{{ bug.creator.name }}</h5>
                    <!-- <img :src="bug.creator.picture" alt="Creator" /> -->
                  </div>
                  <div class="d-md-none">
                    <h6>posted on <br>{{ new Date(bug.createdAt).toLocaleString() }}</h6>
                    <div v-if="bug.updatedAt != bug.createdAt">
                      <h6>updated on <br>{{ new Date(bug.updatedAt).toLocaleString() }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="d-md-none">
              <h3><span class="border-sm-bottom">Status</span></h3>
            </div>
            <div v-if="bug">
              <div v-if="bug.closed" class="card-body">
                <h3><span class="text-danger">CLOSED</span></h3>
              </div>
              <div v-else class="card-body">
                <h3><span class="text-success">OPEN</span></h3>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h6>posted on <br>{{ new Date(bug.createdAt).toLocaleString() }}</h6>
            </div>
            <div class="col" v-if="bug.updatedAt != bug.createdAt">
              <div>
                <h6>updated on <br>{{ new Date(bug.updatedAt).toLocaleString() }}</h6>
              </div>
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
