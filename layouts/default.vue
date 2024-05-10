<template>
    <ClientOnly>
        <v-card>
            <v-layout>
                <v-app-bar color="primary" prominent>
                    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="authenticated"></v-app-bar-nav-icon>

                    <v-toolbar-title>{{ title }}</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon="mdi-logout" variant="text"></v-btn>
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

</template>

<script setup lang="ts">


import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/authStore';
const title = 'Market Warehouse';
const router = useRouter();
let drawer = ref(false);



const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const logout = () => {
    logUserOut();
    router.push('/login');
};
const items = ref([
    { title: 'Products', to: '/products', condition: authenticated.value },
    { title: 'About', to: '/about', condition: authenticated.value },
    { title: 'Create', to: '/products/create', condition: authenticated.value },
    { title: 'Logout', to: '/', click: logout, condition: authenticated.value },
]);

</script>

<style lang="scss" scoped>
</style>