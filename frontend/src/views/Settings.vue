<template>
<div>
  <subnav-bar v-bind:options="links" v-bind:path="settingsUrl"></subnav-bar>
</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubNavBar from "../components/SubNavBar.vue";
@Component({
  components: {
    "subnav-bar": SubNavBar
  },
})
export default class SettingsView extends Vue {
  private links=[{name:'time',path:'./time'},{name:'login',path:'./login'}]
  private get settingsUrl() {
    return '/'+this.$i18n.locale + "/settings";
  }
  private click() {
    console.log(this.links);
  }
}
</script>