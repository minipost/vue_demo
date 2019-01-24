<template>
  <b-container fluid>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup3" label="Type:" label-for="exampleInput3">
        <b-form-select @input="onRequestTypeInput" id="exampleInput3" :options="reqType" required v-model="form.reqType"></b-form-select>
      </b-form-group>
      <b-form-group id="exampleInputGroup2" label="Url:" label-for="exampleInput2">
        <b-form-input id="exampleInput2" type="text" v-model="form.url" required placeholder="Path"></b-form-input>
      </b-form-group>
      <b-form-group
        v-if="showBody"
        id="exampleInputGroup1"
        label="Body:"
        label-for="exampleInput1"
        description="no description"
      >
        <b-form-textarea
          id="exampleInput1"
          type="text"
          v-model="form.body"
          required
          placeholder="JSON body"
          :rows="3"
          :max-rows="6"
        >></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">JSON</b-form-checkbox>
          <b-form-checkbox value="form.isJson">text</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Send</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { api } from "../service/api";
interface Event {
  preventDefault: () => void;
}
export default Vue.extend({
  data() {
    return {
      form: {
        body: "",
        url: "",
        reqType: null,
        checked: [],
        isJson: true,
      },
      reqType: [{ text: "Select One", value: null }, "GET", "POST"],
      show: true
    };
  },
  computed: {
    showBody() {
      return 'POST' === ((this as any).form.reqType)
    }
  },
  methods: {
    post() {
      const obj = JSON.parse(this.form.body);
      api.post(this.form.url, obj);
    },
    onSubmit(evt: Event) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
      this.post()
    },
    onRequestTypeInput() {
      console.log(this.form.reqType)
    },
    onReset(evt: Event) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.body = "";
      this.form.url = "";
      this.form.reqType = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
});
</script>