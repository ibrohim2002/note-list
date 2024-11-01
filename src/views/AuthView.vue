<template>
  <div>
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="card auth-form">
        <div class="card-content">
          <div class="title has-text-centered">{{ formTitle }}</div>
          <div class="content">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  placeholder="Email Address"
                  v-model="notesStore.credentials.email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="Password"
                  placeholder="Enter Password"
                  v-model="notesStore.credentials.password"
                />
              </div>
            </div>

            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <button
                  class="button is-link"
                  @click.prevent="register = !register"
                >
                  {{
                    formTitle == "Login"
                      ? "Don't have an account?"
                      : "Already have an account?"
                  }}
                </button>
              </p>
            </div>
            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <button class="button is-danger">{{ formTitle }}</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useNotesStore } from "@/stores/NotesStore";
const register = ref(false);
const authStore = useAuthStore();
const notesStore = useNotesStore();
const formTitle = computed(() => {
  return register.value ? "Register" : "Login";
});
// const credentials = reactive({
//   email: "",
//   password: "",
// });
const onSubmit = () => {
  if (!notesStore.credentials.email || !notesStore.credentials.password) {
    alert("Please enter email and password");
    return;
  } else {
    if (register.value) {
      authStore.registerUser(notesStore.credentials);
    } else {
      authStore.loginUser(notesStore.credentials);
    }
    notesStore.credentials.email = "";
    notesStore.credentials.password = "";
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
