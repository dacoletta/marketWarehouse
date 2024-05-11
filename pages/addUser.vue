<template>
    <div>
        <form @submit.prevent="submit">
            <v-row class="justify-center align-center">
                <v-col cols="12" md="5">
                    <v-text-field v-model="lastName.value.value" :error-messages="lastName.errorMessage.value"
                        :label="C.LASTNAME"></v-text-field>


                    <v-text-field v-model="firstName.value.value" :error-messages="firstName.errorMessage.value"
                        :label="C.FIRSTNAME"></v-text-field>
                    <v-radio-group inline>
                        <v-radio label="M" value="M" v-model="gender.value.value"></v-radio>
                        <v-radio label="F" value="F" v-model="gender.value.value"></v-radio>
                    </v-radio-group>
                    <v-text-field v-model="username.value.value" :error-messages="username.errorMessage.value"
                        :label="C.USERNAME"></v-text-field>
                    <v-text-field :type="showPwd ? 'text' : 'password'" :append-inner-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showPwd = !showPwd" v-model="password.value.value" :error-messages="password.errorMessage.value"
                        :label="C.PASSWORD"></v-text-field>
                    <v-text-field :type="showRepeatPwd ? 'text' : 'password'" :append-inner-icon="showRepeatPwd ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showRepeatPwd = !showRepeatPwd" v-model="repeatPassword.value.value" :error-messages="repeatPassword.errorMessage.value"
                        :label="C.REPEAT_PASSWORD"></v-text-field>

                    <div id="buttons-container">

                        <v-btn class="me-4" color="error" @click="router.push('/login');">
                            {{ C.BACK }}
                        </v-btn>
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
const router = useRouter();
const authStore = await useAuthStore();
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
const gender = useField('gender');
const username = useField('username');
const password = useField('password');
const repeatPassword = useField('repeatPassword');
gender.value.value = "F"
const submit = handleSubmit(async (values: any) => {
    // Salvo i dati in un oggetto
    const obj = { firstName: values.firstName, lastName: values.lastName, gender: values.gender, username: values.username, password: values.password };
    let newUser = {};
    // chiamo il servizio
    const add = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
        .then(res => res.json())
        .then(res => newUser = res);
    // Salvo nello state e in localstorage
    authStore.addUser(newUser);
    localStorage.setItem('users', JSON.stringify(authStore.users));
    router.push('/');

})

</script>

<style lang="scss" scoped>
#buttons-container {
    display: flex;
    justify-content: end;
}</style>