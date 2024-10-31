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
      <button class="button is-link" :disabled="!noteContent" @click="onNoteSave">Save Note</button>
    </template>
  </AddEditNote>
</template>

<script setup>
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useNotesStore } from "@/stores/NotesStore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()
const notesStore  = useNotesStore()
const noteContent = ref('')
noteContent.value = notesStore.getNoteContentById(route.params.id);
const onNoteSave =()=>{
  notesStore.updateNote(route.params.id, noteContent.value)
  router.back()
}
</script>
