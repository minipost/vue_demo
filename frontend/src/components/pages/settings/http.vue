<template>
  <http-form></http-form>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HttpRequestForm from "@/components/HttpRequestForm.vue"
@Component({
  components: {"http-form": HttpRequestForm}
})
export default class About extends Vue {}
</script>