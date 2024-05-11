<template>
  <v-sheet class="mx-auto">
    <v-form @submit.prevent="login">
      <v-text-field v-model="user.username" required label="Username"></v-text-field>
      <v-text-field :type="showPwd ? 'text' : 'password'" :append-inner-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showPwd = !showPwd" v-model="user.password" :label="C.PASSWORD"></v-text-field>
      <v-btn class="mt-2" color="success" block type="submit" :disabled="!user.username || !user.password">
        {{ C.LOGIN }}
      </v-btn>
      <v-btn class="mt-2" color="error" block @click="resetForm">
        {{  C.RESET }}
      </v-btn>
      <v-btn class="mt-2" block @click="useDefaultValues">
        {{ C.USE_DEFAULT_VALUES }}
      </v-btn>
      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="/addUser"
          rel="noopener noreferrer"
        >
          {{ C.NEW_USER }}
        </a>
      </v-card-text>
    </v-form>
  </v-sheet>
  <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-alert-circle"
        text="Invalid credentials"
        title="Login failed"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { CONSTANTS as C } from '~/constants/constants';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/authStore';

const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const defaultUser = { username: 'atuny0', password: '9uQFF1Lh'};
const snackbar = useSnackbar();
const user = ref({
  username: '',
  password: '',
});
let dialog = ref(false);
let showPwd = ref(false);

const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);
  if (authenticated.value) {
    router.push('/');
    snackbar.add({
    type: 'success',
    text: 'Login succesful. Welcome to Market Warehouse'
})
  } else {
    dialog.value = true;
  }
};

const useDefaultValues = () => {
  user.value.username = defaultUser.username;
  user.value.password = defaultUser.password;
};

const resetForm = () => {
  user.value.username = '';
  user.value.password = '';
};
</script>
