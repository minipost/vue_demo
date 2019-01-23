<template>
  <div>
    <div>
      <button @click="sendGetRequest()">makeRequest</button>
      <input v-model="inputValue" placeholder="type get command">
      <p>{{response}}</p>
    </div>
    <div>
      <button @click="sendPostRequest()">makeRequest</button>
      <input v-model="inputPostValue" placeholder="type get command">
    </div>
  </div>
</template>

<script lang="ts">
import { api } from "../service/api";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
interface INav {
  name: string;
}
@Component
export default class Nav extends Vue implements INav {
  public name = "nav-bar";
  private response = "no";
  private inputValue = "";
  private inputPostValue = '{"firstName": "Fred", "age": 2}';
  private async sendGetRequest(lang?: string) {
    this.response = await api.get(this.inputValue);
  }
  private async sendPostRequest(lang: string) {
    const obj = JSON.parse(this.inputPostValue);
    // tslint:disable-next-line:forin
    for (const key in obj) {
      console.log(key, obj[key]);
    }
    console.log("obj", obj);
    api.post("postPath", obj);
  }
}
</script>

