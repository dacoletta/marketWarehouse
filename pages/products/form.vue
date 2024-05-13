<template>
  <ProductForm :idProduct="idProduct" @submitted="submitted"></ProductForm>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/productStore';
import { useSnackbarStore } from '~/store/snackbarStore';
import { CONSTANTS as C } from '~/constants/constants';
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
      // Mock image
      res.images = [`https://picsum.photos/200/300?random=${getRandomNumber()}`];
      
      productStore.addProduct(res);
      localStorage.setItem('products', JSON.stringify(productStore.products));
      showSnackbar('success', C.PRODUCT_CORRECTLY_CREATED);
      navigateTo('/products');
    });
}
const editProduct = async (formValue: any) => {
  await fetch('https://dummyjson.com/products/' + idProduct, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formValue)
  })
    .then(res => res.json())
    .then(async (res) => {
      if(!res.message) {
        productStore.updateProduct(res);
        showSnackbar('success', C.PRODUCT_CORRECTLY_MODIFIED);
      } else {
        // Error because is a product create by us
        editManualProduct(formValue, idProduct);
      }
      
      navigateTo('/products');
    });
}

/**
 * Edit manually product inserted
 * @param formValue Values of form
 * @param idProduct Id product
 */
const editManualProduct = (formValue: any, idProduct: any) => {
  // Force id and image for mock service
  formValue.id = +idProduct;
  formValue.images = [`https://picsum.photos/200/300?random=${getRandomNumber()}`];
  productStore.updateProduct(formValue)
}
</script>

<style scoped></style>