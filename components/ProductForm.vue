<template>
    <div>
        <form @submit.prevent="submit">
            <v-row class="justify-center align-center">
                <v-col cols="12" md="5">
                    <v-text-field v-model="title.value.value" :counter="10" :error-messages="title.errorMessage.value"
                        label="Title"></v-text-field>

                    <v-textarea v-model="description.value.value" :counter="300"
                        :error-messages="description.errorMessage.value" label="Description"></v-textarea>

                    <v-text-field v-model="price.value.value" :error-messages="price.errorMessage.value"
                        label="Price"></v-text-field>

                    <v-text-field v-model="discountPercentage.value.value"
                        :error-messages="discountPercentage.errorMessage.value"
                        label="Discount percentage"></v-text-field>

                    <v-text-field v-model="stock.value.value" :error-messages="stock.errorMessage.value"
                        label="Stock"></v-text-field>

                    <v-text-field v-model="brand.value.value" :error-messages="brand.errorMessage.value"
                        label="Brand"></v-text-field>

                        <v-text-field v-model="category.value.value" :error-messages="category.errorMessage.value"
                        label="Category"></v-text-field>


                    <v-btn class="me-4" type="submit">
                        submit
                    </v-btn>

                    <v-btn @click="handleReset">
                        clear
                    </v-btn>
                </v-col>
            </v-row>

        </form>
    </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useProductStore } from '~/store/productStore';
const productStore = await useProductStore();
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        title(value: string | any[]) {
            if (value?.length >= 2) return true

            return 'Title needs to be at least 2 characters.'
        },
        description(value: string | any[]) {
            if (value?.length > 20 && value?.length < 300) return true

            return 'Description needs to be at least 20 characters and maximum 300.'
        },
        brand(value: string | any[]) {
            if (value?.length >= 2) return true

            return 'Brand needs to be at least 2 characters.'
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
  }
}

setInitialValues();
const submit = handleSubmit((values: any) => {
    emit('submitted', values);
})
</script>

<style lang="scss" scoped></style>