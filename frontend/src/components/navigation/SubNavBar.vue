<template>
  <b-container fluid>
    <b-row>
      <!-- <b-col md="2" > -->
      <b-nav fill sm="12" md="2" pills class="bg-secondary text-white" vertical>
        <b-navbar-toggle
          type="light"
          @click="toggle()"
          variant="dark"
          label="hh"
          target="nav_dropdown_collapse2"
        >{{toggleIcon}}</b-navbar-toggle>
        <b-collapse id="nav_dropdown_collapse2" visible>
          <b-nav-item
            v-for="item in options"
            v-bind:key="item.$index"
            v-bind:to="{name: item.routeName}"
            replace
          >{{$t(item.text)}}</b-nav-item>
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
export interface MenuEntry {
  routeName: string;
  text: string;
}
@Component({
  components: {},
  props: { options: Array }
})
export default class SubNavBar extends Vue {
  private options!: MenuEntry[];
  // private path!: string;
  private toggleIcon = "+";
  // private toggle() {
  //   if (this.toggleIcon === "+") {
  //     this.toggleIcon = "-";
  //   } else {
  //     this.toggleIcon = "+";
  //   }
  // }
  private mounted() {
    // got first route in list
    this.$router.replace({ name: this.options[0].routeName });
  }
}
</script>
<style lang="css" scoped>
.sidebar {
  background-color: rgba(98, 151, 248, 0.431);
}
</style>
