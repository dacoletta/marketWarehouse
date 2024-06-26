<template>
    <div>
        <BackButton :label="C.LOGIN" :route="'/login'" :icon="'mdi-arrow-left'"></BackButton>
        <form @submit.prevent="submit">
            <v-row class="justify-center align-center">
                <v-col cols="12" md="5">
                    <v-text-field v-model="lastName.value.value" :error-messages="lastName.errorMessage.value"
                        :label="C.LASTNAME"></v-text-field>


                    <v-text-field v-model="firstName.value.value" :error-messages="firstName.errorMessage.value"
                        :label="C.FIRSTNAME"></v-text-field>
                    <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"
                        :label="C.EMAIL"></v-text-field>
                    <v-radio-group inline v-model="gender.value.value">
                        <v-radio label="M" value="M" ></v-radio>
                        <v-radio label="F" value="F"></v-radio>
                    </v-radio-group>
                    <v-text-field v-model="username.value.value" :error-messages="username.errorMessage.value"
                        :label="C.USERNAME"></v-text-field>
                    <v-text-field :type="showPwd ? 'text' : 'password'"
                        :append-inner-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="showPwd = !showPwd" v-model="password.value.value"
                        :error-messages="password.errorMessage.value" :label="C.PASSWORD"></v-text-field>
                    <v-text-field :type="showRepeatPwd ? 'text' : 'password'"
                        :append-inner-icon="showRepeatPwd ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="showRepeatPwd = !showRepeatPwd" v-model="repeatPassword.value.value"
                        :error-messages="repeatPassword.errorMessage.value" :label="C.REPEAT_PASSWORD"></v-text-field>

                    <div id="buttons-container">
                        <v-btn class="me-4" @click="handleReset">
                            {{ C.RESET }}
                        </v-btn>
                        <v-btn color="success" type="submit" :disabled="isDisabled">
                            {{ C.CONFIRM }}
                        </v-btn>
                    </div>

                </v-col>
            </v-row>

        </form>
    </div>
</template>

<script setup lang="ts">
import { CONSTANTS as C } from '~/constants/constants';
import { useField, useForm, useIsFormValid } from 'vee-validate';
import { useAuthStore } from '~/store/authStore';
import { useSnackbarStore } from '~/store/snackbarStore';
const router = useRouter();
const authStore = useAuthStore();
const { showSnackbar } = useSnackbarStore();
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        firstName(value: string | any[]) {
            if (value?.length >= 2) return true

            return 'firstName needs to be at least 2 characters.'
        },
        lastName(value: string | any[]) {
            if (value?.length >= 2) return true

            return 'lastName needs to be at least 2 characters.'
        },
        username(value: string | any[]) {
            if (value?.length >= 2) return true

            return 'Username needs to be at least 2 characters.'
        },
        password(value: string | any[]) {
            if (value?.length >= 8) return true

            return 'Password needs to be at least 8 characters.'
        },
        repeatPassword(value: string | any[]) {
            if (value === password.value.value) return true

            return 'Passwords doesn t match.'
        },
    },
})
const isValid = useIsFormValid();
const isDisabled = computed(() => {
    return !isValid.value;
});
let showPwd = ref(false);
let showRepeatPwd = ref(false);
const firstName = useField('firstName');
const lastName = useField('lastName');
const email = useField('email');
const gender = useField('gender');
const username = useField('username');
const password = useField('password');
const repeatPassword = useField('repeatPassword');

// Set default gender
gender.value.value = "M";

/**
 * Form management finded of Vuetify form > Vee Validate
 */
const submit = handleSubmit(async (values: any) => {
    const { firstName, lastName, gender, username, password, email } = values;
    const obj = { firstName, lastName, gender, username, password, email };
    let newUser = {};
    await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
        .then(res => res.json())
        .then(res => newUser = res);

    // Save new user
    authStore.addUser(newUser);
    localStorage.setItem('users', JSON.stringify(authStore.users));
    router.push('/');
    showSnackbar('success', 'User correctly added.');
})

</script>

<style lang="scss" scoped>
#buttons-container {
    display: flex;
    justify-content: end;
}
</style>