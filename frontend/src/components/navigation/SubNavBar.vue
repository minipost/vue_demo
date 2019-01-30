<template><div>
  <b-col class="p-0" m="0" md="auto">
    <b-nav fill  pills class="bg-secondary text-white" vertical>
      
      <b-navbar-toggle 
        type="light"
        variant="dark"
        @click="toggle"        
        target="nav_dropdown_collapse2"
      >+</b-navbar-toggle>
      <b-collapse id="nav_dropdown_collapse2" visible>
        <b-nav-item
          v-for="item in options"
          v-bind:key="item.$index"
          v-bind:to="{name: item.routeName}"
          replace
        >{{$t(item.text)}}</b-nav-item>
      </b-collapse>
    </b-nav>
  </b-col>
</div>
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
  private toggleIcon = "+";
  private mounted() {
    this.$router.replace({ name: this.options[0].routeName });
  }
  private toggle() {
    console.log("toggled");
  }
}
</script>
