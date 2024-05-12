<template>
  <ProductForm :idProduct="idProduct" @submitted="submitted"></ProductForm>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/productStore';
import { useSnackbarStore } from '~/store/snackbarStore';

const idProduct = useRoute().query.idProduct;
const productStore = useProductStore();
const { showSnackbar } = useSnackbarStore();
const submitted = (formValue: any) => {
  if (idProduct) {
    editProduct(formValue);
  } else {
    createProduct(formValue);
  }
}

const createProduct = (formValue: any) => {
  fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formValue)
  })
    .then(res => res.json())
    .then(async (res) => {
      res.images = ['https://picsum.photos/200/300']
      await productStore.addProduct(res);
      localStorage.setItem('products', JSON.stringify(productStore.products));
      showSnackbar('success', 'Product correctly created.');
      navigateTo('/products');
    });
}
const editProduct = (formValue: any) => {
  fetch('https://dummyjson.com/products/' + idProduct, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formValue)
  })
    .then(res => res.json())
    .then(async (res) => {
      await productStore.updateProduct(res);
      showSnackbar('success', 'Product correctly modified.');
      navigateTo('/products');
    });
}
</script>

<style scoped></style>