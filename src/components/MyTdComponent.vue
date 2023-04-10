<template>
  <td
      @click="coloring"
      :class="[this.occupied.includes(this.mark) ? 'disabledField' : '', active ? 'activeField' : '']"
  >
    &nbsp;
  </td>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "MyTdComponent",
  props: {
    mark: {
      type: String,
      required: true
    },
    allActive: {
      type: Array,
      default: []
    },
    occupied: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    coloring () {
      if ((this.allActive.length < 2) || (this.allActive.length === 2 && this.allActive.includes(this.mark))) {
        this.active = !this.active
      }
    }
  }
})
</script>

<style scoped>

</style>
