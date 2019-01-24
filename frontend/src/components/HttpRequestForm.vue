<template>
  <b-container>
    <b-row>
      <b-col>
      <h3>HTTP Requests</h3>

      </b-col>
    </b-row>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="requestTypeGroup" label="type:" label-for="requestTypeInput">
        <b-form-select
          @input="onRequestTypeInput"
          id="requestTypeInput"
          :options="reqType"
          required
          v-model="form.reqType"
        >
        </b-form-select>
      </b-form-group>
      <b-form-group id="urlInputGroup" v-bind:label="'url: ('+url+form.url+')'" label-for="urlInputId">
        <b-form-input
          id="urlInputId"
          type="text"
          v-model="form.url"
          required
          placeholder="Select path"
        >
        
        </b-form-input>
      </b-form-group>
      <b-form-group
        v-if="showBody"
        id="bodyInputGroup"
        label="Body:"
        label-for="requestBodyId"
        description="no description"
      >
        <b-form-textarea
          id="requestBodyId"
          type="text"
          v-model="form.body"
          required
          placeholder="JSON body"
          :rows="3"
          :max-rows="6"
        >></b-form-textarea>
      </b-form-group>
      <b-form-group label="header type">
        <b-form-radio-group id="radios2" v-model="form.headerType" name="radioSubComponent">
          <b-form-radio value="JSON">JSON</b-form-radio>
          <b-form-radio value="text">text</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Send</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <http-response v-for="entry in responses" v-bind:key="entry.$index" v-bind="entry"></http-response>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { api, API_URL } from "../service/api";
import { AxiosResponse } from "axios";
import HttpResponse from "./HttpResponseWidget.vue";
interface Event {
  preventDefault: () => void;
}
export default Vue.extend({
  data() {
    return {
      url:API_URL,
      form: {
        body: "",
        url: "",
        reqType: null,
        headerType: "JSON"
      },
      reqType: [{ text: "Select request type", value: null }, "GET", "POST"],
      show: true,
      responses: [] as AxiosResponse[]
    };
  },
  computed: {
    showBody() {
      return "POST" === (this as any).form.reqType;
    }
  },
  components: {
    "http-response": HttpResponse
  },
  methods: {
    async sendRequest() {
      switch ((this.form.reqType as any) as "GET" | "POST") {
        case "GET":
          api.get(this.form.url).then(rsp => {
            this.responses.unshift(rsp);
          });

          break;
        case "POST":
          const obj = JSON.parse(this.form.body);
          api.post(this.form.url, obj);
          break;
      }
    },
    onSubmit(evt: Event) {
      evt.preventDefault();
      this.sendRequest();
    },
    onRequestTypeInput() {
      // console.log(this.form.reqType);
    },
    onReset(evt: Event) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.body = "";
      this.form.url = "";
      this.form.reqType = null;
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
});
</script>