<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light">
          <small>{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        :to="{ name: 'editNote', params: { id: note.id } }"
        class="card-footer-item"
        >Edit</RouterLink
      >
      <a href="#" class="card-footer-item" @click="handleDeleteClick">Delete</a>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useNotesStore } from "@/stores/NotesStore";
import AddEditNote from "./AddEditNote.vue";
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});
const notesStore = useNotesStore();
const characterLength = computed(() => {
  const noteLength = props.note.content.length;
  const description = noteLength > 1 ? "characters" : "character";
  return `${noteLength} ${description}`;
});

const handleDeleteClick = () => {
  notesStore.deleteNote(props.note.id);
};
</script>
