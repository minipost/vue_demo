<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="100"
      :viewBox="[x0,y0,Dt,dy]"
      preserveAspectRatio="none"
      style="background-color:white"
    >
      <polyline :points="[points]" style="fill:none;stroke:black;stroke-width:5"></polyline>
    </svg>
    <button @click="elapse">elapse</button>
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
export default class SubNavBar extends Vue {
  private t = 0; // 10 sec
  private Dt = 10000; // 10 s
  private dt = 10; // 10 ms
  private dy = 200;
  private x0 = 0;
  private y0 = -100;
  private points = getBuffer(this.Dt / this.dt);
  private getTime() {
    this.t += this.dt;
    return this.t;
    // return (new Date()).getTime()
  }
  private f(t: number) {
    const A1 = this.dy / 2;
    const T1 = (1000 / (2 * Math.PI));
    const A2 = A1/2
    const A3 = A1*0.8
    const T3 = (7000 / (2 * Math.PI));
    return A1 * Math.sin(t / T1)+A2*Math.random()+A3*Math.sin(t/T3)**2;
  }
  private updatePoints(data:number[]) {
    this.points.push(data)
    this.points.shift()
  }
  private elapse() {
    setInterval(() => {
      this.t += this.dt;
      this.x0 = this.t - this.Dt;
      this.updatePoints([this.t, this.f(this.t)])
    //   this.points.push();
    }, this.dt);
  }
}
</script>
<style lang="css" scoped>
.sidebar {
  background-color: rgba(98, 151, 248, 0.431);
}
</style>
