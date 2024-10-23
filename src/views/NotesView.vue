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

  <SinglePost v-for="note in notes" :key="note.id" :note="note" />
</template>

<script setup>
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import SinglePost from "@/components/Notes/SinglePost.vue";
import { useNotesStore } from "@/stores/NotesStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const notesStore = useNotesStore();
const addEditNoteRef = ref(null);
const newNote = ref("");
const { notes } = storeToRefs(notesStore);

const addNote = () => {
  notesStore.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextArea();
};
</script>
