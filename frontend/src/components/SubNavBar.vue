<template>
  <b-container fluid>
    <b-row>
      <!-- <b-col md="2" > -->
      <b-nav fill sm="12" md="2" pills style="background-color:rgba(98, 151, 248, 0.431)" vertical>
        <b-navbar-toggle
          type="light"
          @click="toggle()"
          variant="dark"
          label="hh"
          target="nav_dropdown_collapse2"
        >{{toggleIcon}}</b-navbar-toggle>
        <b-collapse id="nav_dropdown_collapse2" visible>
          <b-nav-item
            v-for="item in getOptions"
            v-bind:key="item.$index"
            v-bind:to="item.path"
            replace
          >{{$t(item.name)}}</b-nav-item>
        </b-collapse>
      </b-nav>
      <!-- </b-col> -->
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
  private toggleIcon = "+";
  private toggle() {
    if (this.toggleIcon === "+") {
      this.toggleIcon = "-";
    } else {
      this.toggleIcon = "+";
    }
  }
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
  background-color:rgba(98, 151, 248, 0.431);
}
</style>
