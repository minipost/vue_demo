<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";
@Component({
  components: { "nav-bar": NavBar }
})
export default class Home extends Vue {}
</script>
