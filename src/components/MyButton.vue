<template>
  <button
      type="button"
      class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {{ this.name }}
  </button>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "MyButton",
  props: {
    name: {
      type: String,
      default: 'Button'
    }
  }
})
</script>

<style scoped>

</style>
