import EditNoteView from "@/views/EditNoteView.vue";
import NotesView from "@/views/NotesView.vue";
import StatsView from "@/views/StatsView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    component: NotesView,
    name: 'notes'
  },
  {
    path: '/edit-note/:id',
    component: EditNoteView,
    name: 'editNote'
  },
  {
    path: '/stats',
    component: StatsView,
    name: 'stats'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
