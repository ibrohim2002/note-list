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
import { ref } from "vue";
const newNoteRef = ref(null);
const newNote = ref("");
const notes = ref([
  { id: "id1", content: "qwerty" },
  { id: "id2", content: "ytrewq" },
]);

const addNote = () => {
  const note = { id: Date.now(), content: newNote.value };
  notes.value.unshift(note);
  newNote.value = "";
  newNoteRef.value.focus();
};

const deleteNote = (id) => {
  notes.value = notes.value.filter((note) => note.id !== id);
};
</script>
