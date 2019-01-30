<template>
  <div>
    {{$t('LOGIN')}}
    <graph-demo></graph-demo>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import svg from "@/components/Svg.vue"
@Component({
  components: {'graph-demo': svg}
})
export default class About extends Vue {}
</script>