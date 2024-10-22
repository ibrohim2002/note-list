<template>
  <div class="has-background-danger-dark my-4 p-4">
    <div class="field">
      <label class="label">Note</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Add New Note"
          v-model="newNote"
          ref="newNoteRef"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button
          class="button is-link is-danger"
          :disabled="!newNote"
          @click="addNote"
        >
          Add New Note
        </button>
      </div>
    </div>
  </div>

  <SinglePost
    v-for="note in notes"
    :key="note.id"
    :note="note"
    @onDelete="deleteNote(note.id)"
  />
</template>

<script setup>
import SinglePost from "@/components/Notes/SinglePost.vue";
import { useNotesStore } from "@/stores/NotesStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const notesStore = useNotesStore();
const newNoteRef = ref(null);
const newNote = ref("");
const { notes } = storeToRefs(notesStore);

const addNote = () => {
  notesStore.addNote(newNote.value)
  newNote.value = "";
  newNoteRef.value.focus();
};

const deleteNote = (id) => {
  notes.value = notes.value.filter((note) => note.id !== id);
};
</script>
