<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center">
        <img src="https://flowbite-vue.com/assets/logo.svg" class="h-8 mr-3" alt="Flowbite Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Miesta</span>
      </a>
      <Toast
          v-if="this.toast.status === true"
          type="success"
          class="toastClass">
        <span class="text-green-400">Rezervácia bola úspešná.</span>
      </Toast>
    </div>
  </nav>
</template>

<script>
import {defineComponent} from "vue";
import { Toast } from 'flowbite-vue'
import {useToastStore} from "../stores/toast";

export default defineComponent({
  name: "NavbarComponent",
  components: { Toast },
  data() {
    return {}
  },
  created () {
  },
  setup () {
    const toast = useToastStore()
    return { toast }
  }
});
</script>

<style scoped>

</style>
