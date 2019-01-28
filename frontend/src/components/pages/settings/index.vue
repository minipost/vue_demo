<template>
  <b-container fluid>
    <b-row >
      <subnav-bar v-bind:options="links"></subnav-bar>
      <b-col md="auto">
        <router-view></router-view>
      </b-col>
    </b-row>
  </b-container>
</template>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubNavBar, { MenuEntry } from "@/components/navigation/SubNavBar.vue";

@Component({
  components: {
    "subnav-bar": SubNavBar
  }
})
export default class SettingsView extends Vue {
  private links: MenuEntry[] = [
    { text: "HTTP request", routeName: "http" },
    { text: "TIME", routeName: "time" },
    { text: "LOGIN", routeName: "login" }
  ];
}
</script>