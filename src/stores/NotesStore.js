import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  getDocs,
  collection,
  onSnapshot,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../js/firebase";
import { useAuthStore } from "./AuthStore";
export const useNotesStore = defineStore("notesStore", () => {
  const authStore = useAuthStore();
  const notes = ref([]);
  const notesLoaded = ref(false);
  let notesSnapshot = null;
  let notesCollectionRef;
  let notesCollectionQuery;

  const getNoteContentById = computed(() => {
    return (id) => {
      return notes.value.find((note) => note.id === id).content;
    };
  });

  const getNotes = async () => {
    notesCollectionRef = collection(db, "users", authStore.user.uid, "notes");
    notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
    // const querySnapshot = await getDocs(collection(db, 'notes'));
    // querySnapshot.forEach((doc) => {
    //   let note = {
    //     id: doc.id,
    //     content: doc.data().content
    //   };
    //   notes.value.push(note);
    // });

    notesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
      notesLoaded.value = false;
      let notesData = [];
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date,
        };
        notesData.push(note);
      });

      notes.value = notesData;
      notesLoaded.value = true;
    });
  };

  const clearNotes = () => {
    notes.value = [];
    if (notesSnapshot) notesSnapshot();
  };

  const totalNotesCount = computed(() => {
    return notes.value.length;
  });

  const totalCharactersCount = computed(() => {
    let count = 0;
    for (let note of notes.value) {
      count += note.content.length;
    }
    return count;
  });

  const addNote = async (noteContent) => {
    const currentDate = new Date().getTime().toString();
    // const note = {
    //   id: currentDate,
    //   content: noteContent
    // };

    //notes.value.unshift(note);

    await addDoc(notesCollectionRef, {
      content: noteContent,
      date: currentDate,
    });
  };

  const deleteNote = async (noteId) => {
    await deleteDoc(doc(notesCollectionRef, noteId));
  };

  const updateNote = async (id, content) => {
    await updateDoc(doc(notesCollectionRef, id), {
      content,
    });
  };

  return {
    notes,
    updateNote,
    getNoteContentById,
    addNote,
    deleteNote,
    totalCharactersCount,
    totalNotesCount,
    getNotes,
    notesLoaded,
    clearNotes,
  };
});
