<template>
    <div>
        <v-row>
            <v-col cols="12" sm="4">
                <v-carousel>
                    <v-carousel-item v-for="(image, index) in product?.images" :key="index" :src="image" cover></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col cols="12" sm="8">
                <h2>{{ product.title }}</h2>
                <hr>
                <h3 class="mt-2">Description</h3>
                <p>{{ product.description }}</p>
                <h3 class="mt-2">Price</h3>
                <p>{{ product.price }}</p>
                <h3 class="mt-2">Discount percentage</h3>
                <p>{{ product.discountPercentage }} %</p>
                <h3 class="mt-2">Rating ({{ product.rating }} / 5)</h3>
                <p><v-rating v-model="product.rating" readonly></v-rating></p>
                
                <h3 class="mt-2">Stock</h3>
                <p>{{ product.stock }}</p>
                <h3 class="mt-2">Brand</h3>
                <p>{{ product.brand }}</p>
                <h3 class="mt-2">Category</h3>
                <p>{{ product.category }}</p>
                <h3 class="mt-2">Thumbnail</h3>
                <p>{{ product.thumbnail }}</p>
            </v-col>
            <v-col>

            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/productStore';

const { idProduct } = useRoute().params;
const productStore = await useProductStore();
let product: any;
try {
    product = await fetch(`https://dummyjson.com/products/${idProduct}`).then(res => res.json());
    if (product.message) {
    throw new Error('Errore durante il recupero dei dettagli del prodotto');
  }
} catch {
    const products = await productStore.products;
    product = products.find((prod: any) => prod.id === +idProduct);
}

</script>

<style lang="scss" scoped></style>