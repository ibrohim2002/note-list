import { computed, ref } from "vue";
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

  const getNoteById = computed(() => {
    return (id) => {
      return notes.value.find((note) => note.id == id).content;
    };
  });

  const deleteNote = (noteId) => {
    notes.value = notes.value.filter((note) => note.id !== noteId);
  };

  const updateNote = (id, content)=>{
    const index = notes.value.findIndex(note=>note.id==id)
    notes.value[index].content = content
  }
  return { notes, addNote, deleteNote, getNoteById, updateNote };
});
