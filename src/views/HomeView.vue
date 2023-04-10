<template>
  <NavbarComponent></NavbarComponent>
  <router-view />
  <FooterComponent></FooterComponent>
</template>

<script>
import {defineComponent} from 'vue';
import NavbarComponent from "../components/NavbarComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default defineComponent({
  name: 'HomeView',
  components: {FooterComponent, NavbarComponent },
  data() {
    return {}
  }
})
</script>
