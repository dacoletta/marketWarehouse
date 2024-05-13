<template>
    <div>
        <v-card class="mx-auto custom-card">
            <v-img height="200px" :src="product.images[0]" cover></v-img>

            <v-card-title>
                <NuxtLink class="custom-link" :to="`/products/${product.id}`">{{ product?.title }}</NuxtLink>
            </v-card-title>

            <v-card-subtitle>
                {{ product.description }}
            </v-card-subtitle>


            <div class="d-flex justify-end"> 
                <NuxtLink :to="`/products/${product.id}`">
                <v-btn icon class="btn-icon">
                    <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
            </NuxtLink>
            <NuxtLink :to="`/products/form?idProduct=${product.id}`">
                <v-btn icon class="btn-icon">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </NuxtLink>

            <v-btn icon class="btn-icon" @click="$emit('deleteProduct', product.id)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
            
            <v-spacer></v-spacer>
        </v-card>
    </div>
</template>

<script setup lang="ts">

const { product } = defineProps(['product']);
</script>

<style scoped>

a {
    text-decoration: none;
}</style>