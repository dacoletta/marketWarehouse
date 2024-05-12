<template>
    <div>
        <div style="display: flex; justify-content: end;">
                <v-btn variant="flat" color="error" class="me-4" @click="router.push('/products')">
                            {{ 'VIEW PRODUCTS'}}
                        </v-btn>
            </div>
            <v-row class="justify-center align-center">
                <v-col cols="12" md="5">
                    <v-text-field v-model="lastName"
                        :label="C.LASTNAME"></v-text-field>


                    <v-text-field v-model="firstName"
                        :label="C.FIRSTNAME"></v-text-field>
                    <v-radio-group inline v-model="gender">
                        <v-radio label="M" value="M"  id="genderM"></v-radio>
                        <v-radio label="F" value="F" id="genderF"></v-radio>
                    </v-radio-group>
                    <v-text-field v-model="username"
                        :label="C.USERNAME"></v-text-field>
                    

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
    </div>
</template>

<script setup lang="ts">
import { CONSTANTS as C } from '~/constants/constants';
import { useField, useForm, useIsFormValid } from 'vee-validate';
import { useAuthStore } from '~/store/authStore';
const router = useRouter();
const authStore = await useAuthStore();
const { handleSubmit, handleReset } = useForm({
   
})
const isValid = useIsFormValid();
const isDisabled = computed(() => {
    return !isValid.value;
});
const firstName = 'FIRST NAME'
const lastName = 'LAST NAME';
let gender = ref('M');
const username = "USERNAME";

</script>

<style lang="scss" scoped>
#buttons-container {
    display: flex;
    justify-content: end;
}
</style>