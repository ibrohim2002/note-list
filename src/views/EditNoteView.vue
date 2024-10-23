<template>
  <AddEditNote
    v-model="noteContent"
    ref="addEditNoteRef"
    bgColor="link"
    label="Edit Note"
    placeholder="Edit Note"
  >
    <template #button>
      <RouterLink class="button mr-2" :to="{ name: 'notes' }">Cancel</RouterLink>
      <button class="button is-link" :disabled="!noteContent">Save Note</button>
    </template>
  </AddEditNote>
</template>

<script setup>
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useNotesStore } from "@/stores/NotesStore";
import { useRoute } from "vue-router";
const route = useRoute()
const notesStore  = useNotesStore()
const noteContent = notesStore.getNoteById(route.params.id);
</script>
