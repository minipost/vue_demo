<template>
  <b-alert v-bind:variant="getVariant" dismissible :show="isShown" @dismissed="isShown=false">
    <b-container>
      <b-row>
        <b-col sm="3">
          <small>
            <b>Status:</b>
            {{status}}
            <br>
            <b>Status text:</b>
            {{statusText}}
            <br>

            <b>Data:</b>
          </small>
        </b-col>
        <b-col v-if="showBody" sm="12" md="6">
          <h4>{{data}}</h4>
        </b-col>
      </b-row>
    </b-container>
  </b-alert>
</template>
<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  props: { data: String, status: Number, statusText: String },
  data() {
    return {
      isShown: true
    };
  },
  computed: {
    getVariant() {
      let variant;
      if (this.statusText === "OK") {
        variant = "success";
      } else {
        variant = "danger";
      }
      console.log("variant");
      return variant;
    },
    showBody() {
      if (this.statusText === "OK") {
        return true;
      } else {
        return false;
      }
    }
  }
});
</script>