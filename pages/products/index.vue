<template>
    <div class="content-page">
        <v-row>
            <v-col v-for="p in state.products" :key="p.id" cols="12" sm="6" md="3" lg="3">
                <ProductCard :product="p" @delete-product="deleteProduct"></ProductCard>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { useProductStore } from '~/store/productStore';

const productStore = await useProductStore();
const state = reactive({
    products: productStore.products
})

function deleteProduct(idProduct) {
    productStore.deleteProduct(idProduct)
}

onMounted(() => {
    state.products = productStore.products;
});

</script>

<style lang="scss" scoped></style>