<template>
<div>
  <subnav-bar v-bind:options="links"></subnav-bar>
<!-- <button @click="click">Click!</button> -->
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
export default class SubNavBarHome extends Vue {
  private links=[{name:'time',path:'./time'},{name:'login',path:'./login'}]
  private click() {
    console.log(this.links);
  }
}
</script>