<template>
  <div class="col-12 d-inline-flex justify-content-between align-items-center">
    {{ note.creator.name.substring(0, note.creator.name.indexOf('@')) + ': ' + note.title }}
    <i class="fa fa-minus-circle" aria-hidden="true" @click="deleteNote(note.id)" v-if="note.creator.name === state.user.name"></i>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { noteService } from '../services/NoteService'
import { AppState } from '../AppState'
export default {
  name: 'Note',
  props: {
    note: { type: Object, default: undefined }
  },
  setup() {
    onMounted(() => {
      noteService.getNotes()
    })
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteNote(id) {
        noteService.deleteNote(id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fa:hover {
  cursor: pointer;
  transform: scale(1.4);
}

</style>
