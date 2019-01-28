<template>
  <div class="nav-bar">
    <div class="sidenav">
      <b-navbar type="dark" variant="primary" toggleable>
        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_dropdown_collapse">
          <b-navbar-nav>
            <b-nav-item  :to="{ name: 'Settings' }" replace>{{$t('SETTINGS')}}</b-nav-item>
            <b-nav-item  :to="{ name: 'About'}" replace> {{$t('ABOUT')}}</b-nav-item>
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
// ({
//   computed: { aboutUrl() {return this.$i18n.locale + "/" + "about"} }
// })
export default class Nav extends Vue implements INav {
  public name = "nav-bar";
  private changeLocale(lang: string) {
    const path = this.$router.currentRoute.path.split("/");
    let newPath = "/" + lang;
    for (let i = 2; i < path.length; i++) {
      newPath += "/" + path[i];
    }
    console.log(newPath);
    this.$router.replace(newPath);
    this.$router.go(0); // hack to refresh/re-render components
  }
  private get aboutUrl() {
    return '/'+this.$i18n.locale + "/about";
  }
  private get settingsUrl() {
    return '/'+this.$i18n.locale + "/settings";
  }
}
</script>


