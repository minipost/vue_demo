<template>
  <b-alert v-bind:variant="getVariant" dismissible :show="isShown" @dismissed="onDismissed">
    <h5 class="alert-heading">
      <b>Status:</b>

      
      {{rsp.statusText}}
    </h5>
    <p v-if="showBody">body: <i>{{rsp.data}}</i></p>
    <hr>
    <p class="mb-0">Code: {{rsp.status}}</p>
  </b-alert>
</template>
<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  props: { rsp: Object },
  data() {
    return {
      isShown: true
    };
  },
  methods: {
    onDismissed() {
      this.isShown = false;
      //   console.log("dismissed")
      //   this.$emit('dismissed',this.rsp)
    }
  },
  computed: {
    getVariant() {
      let variant;
      if (this.rsp.statusText === "OK") {
        variant = "success";
      } else {
        variant = "danger";
      }
      console.log("variant");
      return variant;
    },
    showBody() {
      if (this.rsp.statusText === "OK") {
        return true;
      } else {
        return false;
      }
    }
  }
});
</script>