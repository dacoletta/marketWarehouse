<template>
  <ClientOnly >
    <div id="backBtn">
    <v-btn variant="flat" color="error" @click="goTo()">
      {{ label }}
    </v-btn>
  </div>
  </ClientOnly>
  
</template>

<script lang="ts" setup>
const router = useRouter();
const { label, route } = defineProps(['label', 'route']);
console.log('ROUTE ', route)

const goTo = () => {
  router.push(route);
}
</script>

<style scoped>
#backBtn {
  display: flex; justify-content: end; margin-bottom: 1em;
}
</style>