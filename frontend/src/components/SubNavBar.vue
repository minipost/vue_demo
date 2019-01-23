<template>
  <b-container fluid>
    <b-row>
      <b-col md="1" style="background-color:bisque">
        <b-nav tabs vertical style="background-color:bisque" >
          <!-- <b-navbar-toggle label="hh" target="nav_dropdown_collapse2" >&lt;</b-navbar-toggle> -->
          <b-collapse id="nav_dropdown_collapse2" visible>
            <b-nav-item
              v-for="item in getOptions"
              v-bind:key="item.$index"
              v-bind:to="item.path"
            replace>{{$t(item.name)}}</b-nav-item>
          </b-collapse>
        </b-nav>
      </b-col>
      <b-col>
        <!-- <p>{{getOptions[0].path}}</p> -->
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
  props: { options: Array, path: String }
})
export default class SubNavBar extends Vue {
  private options!: MenuItem[];
  private path!: string;
  private get getOptions() {
    const path = this.path;
    return this.options.map(val => {
      val.path = path + val.path.replace(".", "");
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
