<template>
    <ClientOnly>
        <v-card>
            <v-layout>
                <v-app-bar color="primary" prominent>
                    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"
                        v-if="authenticated"></v-app-bar-nav-icon>

                    <v-toolbar-title>
                        <NuxtLink to="/">{{ title }}</NuxtLink>
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon="mdi-account" variant="text" @click="router.push('/profile');" title="Account"></v-btn>
                    <v-btn icon="mdi-logout" variant="text" @click="logout" title="logout"></v-btn>
                </v-app-bar>

                <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined"
                    temporary>
                    <v-list v-for="item in items">
                        <v-list-item>
                            <NuxtLink :to="item.to" @click="item.click">{{ item.title }}
                            </NuxtLink>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main>
                    <v-card-text>
                        <div class="content-page">
                            <slot />
                        </div>

                    </v-card-text>
                </v-main>
            </v-layout>
        </v-card>
    </ClientOnly>
    <NuxtSnackbar />
</template>

<script setup lang="ts">


import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/authStore';
import { useSnackbarStore } from '~/store/snackbarStore';
const title = 'Market Warehouse';
const router = useRouter();
let drawer = ref(false);
const { snack } = storeToRefs(useSnackbarStore());
const snackbar = useSnackbar();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const logout = () => {
    logUserOut();
    router.push('/login');
};
const items = ref([
    { title: 'Products', to: '/products', condition: authenticated.value },
    { title: 'About', to: '/about', condition: authenticated.value },
    { title: 'Profile', to: '/profile', condition: authenticated.value },
    { title: 'Create', to: '/products/form', condition: authenticated.value },
    { title: 'Logout', to: '/', click: logout, condition: authenticated.value },
]);


watch(snack, () => {
    const { show, content, color } = snack.value;
    if (show) {
        snackbar.add({
            type: color,
            text: content
        })
    }

})
</script>

<style lang="scss" scoped></style>