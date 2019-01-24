<template>
  <div>
    <subnav-bar v-bind:options="links"></subnav-bar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubNavBar, { MenuItem } from "../components/SubNavBar.vue";
@Component({
  components: {
    "subnav-bar": SubNavBar
  }
})
export default class SettingsView extends Vue {
  private links: MenuItem[] = [
    { text: "TIME", routeName: "time" },
    { text: "LOGIN", routeName: "login" }
  ];
}
</script>