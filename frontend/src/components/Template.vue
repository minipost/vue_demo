<template>
  <div>
      <p>Data: {{value}}, Computed: {{getComputedValue}}</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
  props: { options: Array }
})
export default class SubNavBar extends Vue {
  /**
   * Data
   */
  private value = 2;
  /**
   * life cycle hooks
   */
  private mounted() {
    console.log("is mounted");
  }
  private created() {
    console.log("is created");
  }
  /**
   * Computed properties
   */
  private get getComputedValue() {
    return this.value*2;
  }
}
</script>
<style lang="css" scoped>
.sidebar {
  background-color: rgba(98, 151, 248, 0.431);
}
</style>
