<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/productStore';
import { useAuthStore } from './store/authStore';

const productStore = useProductStore();
const authStore = useAuthStore();

onMounted(async () => {
  // Se local storage è vuoto
  if(!localStorage.getItem('products')) {
    await productStore.fetchProducts();
    localStorage.setItem('products', JSON.stringify(productStore.products))
    console.error('SET LOCAL STORAGE')
  }
  // Se stato è vuoto ma local storage già popolato
  if(productStore.products.length === 0) {
    const products = JSON.parse(localStorage.getItem('products') || '{}');
    productStore.setProducts(products);
  }
  if(!localStorage.getItem('users')) {
    await authStore.fetchUserList();
    localStorage.setItem('users', JSON.stringify(authStore.users))
  }
  if(authStore.users.length === 0) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    authStore.setUserList(users);
  }
});
</script>

<style>
h1.title-page {
  text-align: center;
  margin: 1em;
}

body
{
  font-family: 'Montserrat', sans-serif;
}

</style>