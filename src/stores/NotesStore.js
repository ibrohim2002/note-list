import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotesStore = defineStore("notesStore", () => {
  const notes = ref([
    { id: "id1", content: "qwerty" },
    { id: "id2", content: "ytrewq" },
  ]);

  const addNote = (noteContent) => {
    const note = { id: Date.now(), content: noteContent };
    notes.value.unshift(note);
  };
  return { notes, addNote };
});
