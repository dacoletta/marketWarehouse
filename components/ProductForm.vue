<template>
    <div>
        <form @submit.prevent="submit">
            <div style="display: flex; justify-content: end;">
                <v-btn variant="flat" color="error" class="me-4" @click="router.push('/products')">
                    {{ C.BACK + ' to Products' }}
                </v-btn>
            </div>
            <v-row class="justify-center align-center">
                <v-col cols="12" md="5">
                    <v-text-field v-model="title.value.value" :error-messages="title.errorMessage.value"
                        :label="C.TITLE"></v-text-field>

                    <v-textarea v-model="description.value.value" :counter="300"
                        :error-messages="description.errorMessage.value" :label="C.DESCRIPTION"></v-textarea>

                    <v-text-field v-model="price.value.value" :error-messages="price.errorMessage.value"
                        :label="C.PRICE"></v-text-field>

                    <v-text-field v-model="discountPercentage.value.value"
                        :error-messages="discountPercentage.errorMessage.value"
                        :label="C.DISCOUNT_PERCENTAGE"></v-text-field>

                    <v-text-field v-model="stock.value.value" :error-messages="stock.errorMessage.value"
                        :label="C.STOCK"></v-text-field>

                    <v-text-field v-model="brand.value.value" :error-messages="brand.errorMessage.value"
                        :label="C.BRAND"></v-text-field>

                    <v-text-field v-model="category.value.value" :error-messages="category.errorMessage.value"
                        :label="C.CATEGORY"></v-text-field>

                    <v-file-input prepend-icon="" :append-inner-icon="'mdi-paperclip'" v-model="files" :label="C.IMAGES" placeholder="Upload images"  multiple>
                    </v-file-input>


                        <div style="display: flex; justify-content: end;">
                            <v-btn variant="flat" color="error" class="me-4" @click="handleReset">
                                {{ C.CLEAR }}
                            </v-btn>

                            <v-btn variant="flat" color="success" type="submit">
                                {{ C.CONFIRM }}
                            </v-btn>
                        </div>

                </v-col>
            </v-row>
            <v-dialog v-model="openDialog" width="auto">
                <v-card prepend-icon="mdi-alert-circle" :text="C.MSG_CONFIRM_FORM_TEXT"
                    :title="C.MSG_CONFIRM_OPERATION">
                    <!-- <template v-slot:actions>
                        <v-btn class="ms-auto" color="error" text="Ok" @click="openDialog = false"></v-btn>
                        <v-btn class="ms-auto" color="success" text="Ok" @click="confirmForm"></v-btn>
                    </template> -->
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :text="C.CLOSE" color="error" variant="flat" @click="openDialog = false"></v-btn>
                        <v-btn color="success" variant="flat" :text="C.CONFIRM" @click="confirmForm"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </form>
    </div>
</template>

<script setup lang="ts">
import { CONSTANTS as C } from '~/constants/constants';
import { useField, useForm } from 'vee-validate';
import { useProductStore } from '~/store/productStore';
import { routerKey } from 'vue-router';
const router = useRouter();
let openDialog = ref(false);
let formValues: any = null;
const productStore = await useProductStore();
const files = ref([]);
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        title(value: string | any[]) {
            if (value?.toString().length >= 2) return true
            return 'Title needs to be at least 2 characters.'
        },
        description(value: string | any[]) {
            if (value?.toString().length > 20 && value?.length < 300) return true
            return 'Description needs to be at least 20 characters and maximum 300.'
        },
        brand(value: string | any[]) {
            if (value?.toString().length >= 2) return true

            return 'Brand needs to be at least 2 characters.'
        },
        price(value: string | any[]) {
            if (value?.toString().length >= 1) return true

            return 'Price needs to be at least 1 characters.'
        },
        stock(value: string | any[]) {
            if (value?.toString().length >= 1) return true

            return 'Stock needs to be at least 1 characters.'
        },
        discountPercentage(value: string | any[]) {
            if (value?.toString().length >= 1) return true

            return 'Discount percentage needs to be at least 1 characters.'
        },
        category(value: string | any[]) {
            if (value?.toString().length >= 1) return true

            return 'Category needs to be at least 1 characters.'
        },
    },
})
const emit = defineEmits(['submitted'])
const { idProduct } = defineProps(['idProduct']);
const title = useField('title');
const description = useField('description');
const price = useField('price');
const discountPercentage = useField('discountPercentage');
const stock = useField('stock');
const brand = useField('brand');
const category = useField<string>('category');
const thumbnail = useField('thumbnail');
const images = useField('images');
const setInitialValues = async () => {
    if (idProduct) {
        // Assegna i valori preimpostati solo una volta
        let prod: any = await productStore.products;
        prod = prod.find((prod: any) => prod.id === +idProduct);
        title.value.value = prod.title;
        description.value.value = prod.description;
        price.value.value = prod.price;
        discountPercentage.value.value = prod.discountPercentage;
        stock.value.value = prod.stock;
        brand.value.value = prod.brand;
        category.value.value = prod.category;
    }
}

setInitialValues();
const submit = handleSubmit((values: any) => {
    formValues = values;
    openDialog.value = true;
})

const confirmForm = () => {
    emit('submitted', formValues);
    openDialog.value = false;
}
</script>

<style lang="scss" scoped></style>