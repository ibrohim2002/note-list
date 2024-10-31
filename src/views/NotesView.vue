<template>
  <AddEditNote v-model="newNote" ref="addEditNoteRef">
    <template #button>
      <button
        class="button is-link is-danger"
        :disabled="!newNote"
        @click="addNote"
      >
        Add New Note
      </button>
    </template>
  </AddEditNote>

  <progress
    class="progress is-large is-info"
    max="100"
    v-if="!notesStore.notesLoaded"
  />

  <template v-else>
    <SinglePost v-for="note in notes" :key="note.id" :note="note" />
  </template>

  <div
    class="has-text-centered py-6 is-size-4 has-text-grey-light is-family-monospace"
    v-if="!notes.length && notesStore.notesLoaded"
  >
    No Notes Added here yet!!
  </div>
</template>

<script setup>
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import SinglePost from "@/components/Notes/SinglePost.vue";
import { useNotesStore } from "@/stores/NotesStore";
import { useCharactersLimit } from "@/composables/useCharactersLimit";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
const notesStore = useNotesStore();
const addEditNoteRef = ref(null);
const { notes } = storeToRefs(notesStore);
const newNote = ref("");
const addNote = () => {
  notesStore.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextArea();
};
useCharactersLimit(newNote);
</script>
