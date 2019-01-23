<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <!-- <nav> -->
        <b-nav vertical toggleable>
          <!-- <b-navbar-toggle target="nav_dropdown_collapse2">ddf</b-navbar-toggle> -->
          <!-- <b-collapse is-nav id="nav_dropdown_collapse2"> -->
            <!-- <b-navbar-nav> -->
              <b-nav-item active>Active</b-nav-item>
              <b-nav-item>Link</b-nav-item>
              <b-nav-item>Another Link</b-nav-item>
              <b-nav-item disabled>Disabled</b-nav-item>
            <!-- </b-navbar-nav> -->
          <!-- </b-collapse> -->
        </b-nav>
        <!-- </nav> -->
      </b-col>
      <b-col>
        A {{$t('SOME_TEXT')}}
        <api-test></api-test>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApiTest from "../components/ApiTest.vue";
@Component({
  components: {
    "api-test": ApiTest
  }
})
export default class Home extends Vue {
  private click() {
    console.log("clicked");
  }
}
</script>
