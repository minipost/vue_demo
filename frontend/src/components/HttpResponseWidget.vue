<template>
  <b-alert v-bind:variant="getVariant" dismissible :show="isShown" @dismissed="onDismissed">
    <b-container>
      <b-row>
        <b-col sm="3">
          <small>
            <b>Status:</b>
            {{rsp.status}}
            <br>
            <b>Status text:</b>
            {{rsp.statusText}}

            
          </small>
        </b-col>
        <b-col v-if="showBody" sm="12" md="6">
          <h4>{{rsp.data}}</h4>
        </b-col>
      </b-row>
    </b-container>
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
          this.isShown = false
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