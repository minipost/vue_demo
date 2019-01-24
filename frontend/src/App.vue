<template>
  <div id="app">
    <router-view :to="{ name: 'Settings' }"></router-view>
  </div>
</template>
<script lang="ts">
import Navbar from "./components/NavBar.vue";
import Vue from "vue";
export default Vue.extend({
  // components: { "nav-bar": Navbar }
  created() {
    const self = this as any;
    console.log("updating");
    (this.$router as any).updateLocale = (
      lang: string
    ) => {
      console.log("updated");
      self.$i18n.locale = lang;
    };
  }
});
</script>

