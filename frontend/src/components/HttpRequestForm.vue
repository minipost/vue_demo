<template>
  <b-container>
    <b-row>
      <b-col>
        <h3>HTTP Requests</h3>
      </b-col>
    </b-row>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="type:">
        <b-form-radio-group id="radios2" v-model="form.requestType" name="radioSubComponent">
          <b-form-radio value="GET">GET</b-form-radio>
          <b-form-radio value="POST">POST</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group id="contentTypeGroup" label="content type:" label-for="contentTypeInput">
        <b-form-select
          @input="onContentTypeInput"
          id="requestTypeInput"
          :options="CONTENT_TYPES"
          required
          v-model="form.contentType"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="urlInputGroup"
        v-bind:label="'url: ('+url+form.url+')'"
        label-for="urlInputId"
      >
        <b-form-input
          id="urlInputId"
          type="text"
          v-model="form.url"
          required
          placeholder="Select path"
        ></b-form-input>
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
      <b-button type="submit" variant="primary">Send</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <http-response v-for="entry in responses.slice().reverse()" v-bind:key="entry.$index" v-bind="{rsp:entry}" @dismissed="deleteResponse"></http-response>
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
      url: API_URL,
      CONTENT_TYPES: [
        "application/xhtml+xml",
        "application/json",
        "application/EDI-X12",
        "application/EDIFACT",
        "application/javascript",
        "application/octet-stream",
        "application/ogg",
        "application/pdf",
        "application/x-shockwave-flash",
        "application/ld+json",
        "application/xml",
        "application/zip"
      ],
      form: {
        body: "",
        url: "",
        contentType: "application/xhtml+xml",
        requestType: "GET"
      },
      show: true,
      responses: [] as AxiosResponse[]
    };
  },
  computed: {
    showBody() {
      return "POST" === (this as any).form.requestType;
    }
  },
  components: {
    "http-response": HttpResponse
  },
  methods: {
    deleteResponse(e: any) {
      const index = this.responses.indexOf(e);
      console.log('index',index,'of',this.responses.length)
      console.log(e.data,this.responses[index].data)
      // this.responses.splice(index, 1);
    },
    async sendRequest() {
      switch ((this.form.requestType as any) as "GET" | "POST") {
        case "GET":
          api.get(this.form.url,this.form.requestType).then(rsp => {
            this.responses.push(rsp);
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
    onContentTypeInput() {
      // console.log(this.form.reqType);
    },
    onReset(evt: Event) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.body = "";
      this.form.url = "";
      this.form.contentType = "application/xhtml+xml";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
});
</script>