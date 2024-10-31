<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" ref="deleteModalref">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to Delete?
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="deleteNote">Delete</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useNotesStore } from "@/stores/NotesStore";
const notesStore = useNotesStore();
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  noteId: {
    type: String,
    required: true,
  },
});
const deleteNote = ()=>{
  notesStore.deleteNote(props.noteId);
}
const handleClose = (event) => {
  if (event.key == "Escape") {
    closeModal();
  }
};
const closeModal = () => {
  emits("update:modelValue", false);
};
const deleteModalref = ref(null);
onClickOutside(deleteModalref, closeModal);
onMounted(() => {
  document.addEventListener("keyup", handleClose);
});
onUnmounted(() => {
  document.removeEventListener("keyup", handleClose);
});
const emits = defineEmits(["update:modelValue"]);
</script>
