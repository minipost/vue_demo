<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="100"
      :viewBox="[tMin,yMin,Dt,dy]"
      preserveAspectRatio="none"
      style="background-color:white"
    >
      <polyline :points="[points]" style="fill:none;stroke:black;stroke-width:5"></polyline>
    </svg>
    <button @click="elapse">run</button>
    <button @click="pause">pause</button>
    
    <p>
      <b>Time:</b>
      {{t}} ms
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

function getBuffer(size: number) {
  const b: number[][] = [];
  for (let i = 0; i < size; i++) {
    b.push([0, 0]);
  }
  return b;
}
@Component({
  components: {},
  props: { options: Array }
})
export default class Graph extends Vue {
  private t0 = new Date().getTime();
  private t = 0; // 10 sec
  private Dt = 10000; // 10 s
  private dt = 10; // 10 ms
  private dy = 200;
  private tMin = 0;
  private yMin = -100;
  private points = getBuffer(this.Dt / this.dt);
  private pointsTimer = 0;
  private gridTimer = 0;
  private grid: string[] = [];
  private getTime() {
    this.t += this.dt;
    return this.t;
    // return (new Date()).getTime()
  }
  private f(t: number) {
    const A1 = this.dy / 2;
    const T1 = 1000 / (2 * Math.PI);
    const A2 = A1 / 2;
    const A3 = A1 * 0.8;
    const T3 = 7000 / (2 * Math.PI);
    return (
      A1 * Math.sin(t / T1) + A2 * Math.random() + A3 * Math.sin(t / T3) ** 2
    );
  }
  private updatePoints(data: number[]) {
    this.points.push(data);
    this.points.shift();
  }
  private updateGrid() {
    const t = this.t.toString();
    const start = "M " + t + "0 ";
    const end = "l " + t + " " + this.dy.toString()+' ';
    this.grid.push(start + end + start);
  }
  private elapse() {
    this.pointsTimer = setInterval(() => {
      this.t = new Date().getTime() - this.t0;
      this.tMin = this.t - this.Dt;
      this.updatePoints([this.t, this.f(this.t)]);
    }, this.dt);
    this.gridTimer = setInterval(() => {
      this.updateGrid();
    }, 1000);
  }
  private pause() {
    clearInterval(this.pointsTimer);
    clearInterval(this.gridTimer);
  }
}
</script>
<style lang="css" scoped>
.small {
  font: italic 13px sans-serif;
}
.heavy {
  font: bold 30px sans-serif;
}

/* Note that the color of the text is set with the    *
     * fill property, the color property is for HTML only */
.Rrrrr {
  font: italic 50 serif;
  fill: red;
}
</style>
