<template>
  <table class="mt-4 text-sm text-center text-gray-500 dark:text-gray-400 border block overflow-x-scroll overflow-y-scroll" style="max-width: 90%; max-height: 300px;">
    <slot></slot>
  </table>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "MyTable"
})
</script>

<style scoped>

</style>
