<template>
  <div class="nav-bar">
    <div>
      <b-navbar type="dark" variant="primary" toggleable>
        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_dropdown_collapse">
          <b-navbar-nav>
            <b-nav-item to="./home">{{$t('HOME')}}</b-nav-item>
            <b-nav-item to="./about">{{$t('ABOUT')}}</b-nav-item>
            <b-nav-item-dropdown :text="$t('LANG')" right>
              <b-dropdown-item @click="changeLocale('en')">en</b-dropdown-item>
              <b-dropdown-item @click="changeLocale('da')">da</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
interface INav {
  name: string;
}
@Component
export default class Nav extends Vue implements INav {
  public name = "nav-bar";
  private changeLocale(lang: string) {
    const path = this.$router.currentRoute.path.split("/");
    let newPath = "/" + lang;
    for (let i = 2; i < path.length; i++) {
      newPath += "/" + path[i];
    }
    console.log(newPath);
    this.$router.push(newPath);
    this.$router.go(0); // hack to rerender components
  }
}
</script>

