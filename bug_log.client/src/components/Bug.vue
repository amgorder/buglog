<template>
  <div class="col-12 p-2 px-4 bg-light rounded mb-2 shadow-dark">
    <div class="row justify-content-between align-items-center">
      <h6 class="mb-0">
        {{ bug.creator.name.substring(0, bug.creator.name.indexOf('@')) + ': ' + bug.title }} | {{ bug.closed }} | {{ bug.createdAt.split("T")[0] }}
      </h6>
      <i class="fa fa-plus-square" @click="createNote(bug.id)"></i>
      <i class="fa fa-trash" @click="deleteBug(bug.id)"></i>
    </div>
    <!-- <div class="row">
          <Note v-for="note in state.notes.filter(c => c.bugId === bug.id)" :key="note.id" :note="note" />
        </div> -->
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
import { useRoute } from 'vue-router'

export default {
  name: 'Bug',
  props: {
    bug: { type: Object, default: undefined }
  },
  setup() {
    const route = useRoute()
    onMounted(() => {
      noteService.getNotes()
    })
    const state = reactive({
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes)
    })
    return {
      state,
      deleteBug(id) {
        bugService.deleteBug(id)
      },
      editBug(rawBug) {
        bugService.editBug(rawBug)
      },
      createNote(bugId) {
        noteService.createNote(bugId)
      },
      route
    }
  }
}
</script>

<style lang="scss" scoped>
.fa:hover {
  cursor: pointer;
  transform: scale(1.4);
}

.bold {
  font-weight: bold;
}

li {
  list-style-type: none;
}

.shadow-dark {
  filter: drop-shadow(1px 1px 1px black);
}
</style>
