<template>
  <b-container fluid>
    <b-row>
      <b-col md="auto" style="background-color:bisque">
        <b-nav fill tabs vertical toggleable>
          <b-navbar-toggle variant="primary" target="nav_dropdown_collapse2"></b-navbar-toggle>
          <b-collapse is-nav id="nav_dropdown_collapse2">
            <b-nav-item
              v-for="item in getOptions"
              v-bind:key="item.$index"
              v-bind:to="item.path"
            >{{item.name}}</b-nav-item>
          </b-collapse>
        </b-nav>
      </b-col>
      <b-col>
        <router-view></router-view>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
interface MenuItem {
  path: string;
  name: string;
}
@Component({
  components: {},
  props: { options: Array }
})
export default class SubNavBar extends Vue {
  private options!: MenuItem[];

  private get getOptions() {
    const path = this.$router.currentRoute.path;
    return this.options.map(val => {
      val.path = val.path.replace(".", path);
      return val;
    });
  }
}
</script>
<style lang="css" scoped>
.sidebar {
  background-color: bisque;
}
</style>