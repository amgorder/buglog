<template>
  <div class="row py-1" v-if="note.creator">
    <div class="col-5 ml-5 card">
      <img class="comment-img pt-2" :src="note.creator.picture" />{{ note.creator.name }}: {{ note.body }}
    </div>
    <div v-if="state.bug" class="col-1 p-0 align-text-center">
      <div v-if="!state.bug.closed">
        <div class="pl-0" v-if="state.user.email === note.creator.email">
          <button type="button" class="btn btn-lg btn-success" @click="state.editNote = !state.editNote">
            edit
          </button>
          <button type="button" class="btn btn-lg btn-danger" @click="deleteNote">
            x
          </button>
        </div>
      </div>
    </div>
    <div class="col-4" v-if="state.editNote">
      <form @submit.prevent="edit">
        <textarea type="text"
                  name="note-edit"
                  id="note-edit"
                  class="form-control ta10em"
                  placeholder="Enter Description"
                  aria-describedby="helpId"
                  v-model="state.noteProp.body"
        >
        </textarea>
        <button type="submit" class="btn btn-success">
          Push
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
export default {
  name: 'Note',
  props: {
    note: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      bug: computed(() => AppState.bug),
      user: computed(() => AppState.user),
      editNote: false,
      noteProp: computed({
        get() { return props.note }
      },
      {
        set(value) { state.updated = value }
      }),
      updated: {}
    })
    return {
      state,
      getDate(id) {
        notesService.getDate(id)
      },
      async edit() {
        await notesService.edit(props.note)
        state.editNote = false
      },
      async deleteNote() {
        await notesService.delete(props.note)
      }
    }
  }
}
</script>

<style scoped>
  .align-text-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .comment-img {
    height: 50%;
    width: 5%;
  }
  @media(max-width:767px) {
    .border-sm-bottom {
      border-bottom: 1px solid black;
    }
    .card-decoration {
      filter: drop-shadow(5px 3px 6px #000);
    }
  }
  @media(min-width: 768px) {
    .align-text-md-center {
      display: flex;
    align-items: center;
    justify-content: center;
    }
  }
</style>
