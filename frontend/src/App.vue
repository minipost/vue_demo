<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
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

<style lang="scss">
@import "./assets/scss/custom.scss"
</style>
