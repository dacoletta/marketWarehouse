<template>
    <div>
        <h1 class="title-page">ADD USER</h1>
        <form @submit.prevent="submit">
            <v-row class="justify-center align-center">
                <v-col cols="12" md="5">
                    <v-text-field v-model="lastName.value.value" :error-messages="lastName.errorMessage.value"
                        label="Lastname"></v-text-field>


                    <v-text-field v-model="firstName.value.value" :error-messages="firstName.errorMessage.value"
                        label="Firstname"></v-text-field>
                    <v-radio-group inline>
                        <v-radio label="M" value="M" v-model="gender.value.value"></v-radio>
                        <v-radio label="F" value="F" v-model="gender.value.value"></v-radio>
                    </v-radio-group>
                    <v-text-field v-model="username.value.value" :error-messages="username.errorMessage.value"
                        label="Username"></v-text-field>
                    <v-text-field v-model="password.value.value" :error-messages="password.errorMessage.value"
                        label="Password"></v-text-field>

                    <div style="text-align: right;">
                        
                        <v-btn class="me-4" color="error" @click="router.push('/login');">
                            Back
                        </v-btn>
                        <v-btn class="me-4" @click="handleReset">
                            Reset
                        </v-btn>
                        <v-btn  color="success" type="submit">
                            Confirm
                        </v-btn>
                    </div>

                </v-col>
            </v-row>

        </form>
    </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
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
    },
})

const firstName = useField('firstName');
const lastName = useField('lastName');
const gender = useField('gender');
const username = useField('username');
const password = useField('password');

const setInitialValues = async () => {
}

setInitialValues();
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
    await authStore.addUser(newUser);
    localStorage.setItem('users', JSON.stringify(authStore.users));
    router.push('/');

})
</script>

<style lang="scss" scoped></style>