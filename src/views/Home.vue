<template>
  <div>
    A {{$t('SOME_TEXT')}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class Home extends Vue {
  private click() {
    console.log("clicked")
  }
}
</script>
