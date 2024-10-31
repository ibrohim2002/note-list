import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/AuthStore";

const app = createApp(App);

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.user.uid ? true : false;
  if (isAuthenticated && to.name == "auth") {
    return { name: 'notes' };
  }
  if (!isAuthenticated && to.name !== "auth") {
    return { name: "auth" };
  }
});

app.use(createPinia());
app.use(router);

app.mount("#app");
