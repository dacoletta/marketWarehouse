<template>
    <div class="content-page">
        <BackButton :label="C.ADD_PRODUCT" :route="'/products/form'" :icon="'mdi-plus'"></BackButton>
        <v-row>
            <v-col v-for="p in state.products" :key="p.id" cols="12" sm="6" md="3" lg="3">
                <ProductCard :product="p" @delete-product="confirmDeleteDialog"></ProductCard>
            </v-col>
        </v-row>
        <v-dialog v-model="openDeleteDialog" width="auto">
            <v-card prepend-icon="mdi-alert-circle" :text="C.MSG_CONFIRM_DELETE" :title="C.MSG_CONFIRM_DELETE_TITLE">
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :text="C.CLOSE" color="error" variant="flat" @click="openDeleteDialog = false"></v-btn>
                    <v-btn color="success" variant="flat" :text="C.CONFIRM" @click="deleteProduct()"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { CONSTANTS as C } from '~/constants/constants';
import { useProductStore } from '~/store/productStore';
import { useSnackbarStore } from '~/store/snackbarStore';
let openDeleteDialog = ref(false);
const productStore = await useProductStore();
const { showSnackbar } = useSnackbarStore();
const snackbar = useSnackbar();
let idProductSelected = null;
const state = reactive({
    products: productStore.products
})

const confirmDeleteDialog = (idProduct) => {
    idProductSelected = idProduct;
    openDeleteDialog.value = true;
}

function deleteProduct() {
    openDeleteDialog.value = false;
    productStore.deleteProduct(idProductSelected);
    showSnackbar('success', 'Product correctly modified.');

}

onMounted(() => {
    state.products = productStore.products;
});

</script>

<style lang="scss" scoped></style>