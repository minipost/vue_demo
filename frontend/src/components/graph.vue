<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox="[X0,Y0,width,height]"
      preserveAspectRatio="none"
      class="graph"
    >
      <polyline :points="[points]" style="fill:none;stroke:black;stroke-width:5"></polyline>
    </svg>
    <br>
    <button @click="update">update</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
  props: { options: Array }
})
export default class Graph extends Vue {
  private width = 400;
  private height = 200;
  private X0 = 0;
  private Y0 = 0
  private Dt = 5000;
  private yMin = -100
  private yMax = 100
  private points: number[][] = [[0, 0], ];
  private Y(y: number) {
    return (this.height / this.yMax-this.yMin) * y ;
  }
  private X(x: number) {
    return (this.width / this.Dt) * x + this.X0;
  }
  private update() {
    this.points.push([this.X(2500), 100]);
  }
}
</script>
<style lang="css" scoped>
.graph {
  background-color: aliceblue;
}
.small {
  font: italic 13px sans-serif;
}
</style>
