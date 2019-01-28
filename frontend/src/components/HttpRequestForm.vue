<template>
  <div>
    <b-container class="customElement">
      <b-row>
        <b-col md="10">
          <h3>HTTP Requests</h3>
        </b-col>
      </b-row>

      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-row>
          <b-col md="10">
            <b-form-group
              class="subElement"
              id="urlInputGroup"
              v-bind:label="'url: <i>('+url+form.url+')</i>'"
              label-for="urlInputId"
            >
              <b-form-input
                id="urlInputId"
                type="text"
                v-model="form.url"
                required
                placeholder="Select path"
                :state="form.url.length>0"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="10">
            <div class="subElement">
              <h5>Head</h5>
              <b-row>
                <b-col md="4">
                  <b-form-group label="request type:" label-for="radios2">
                    <b-form-radio-group
                      id="radios2"
                      v-model="form.requestType"
                      name="radioSubComponent"
                    >
                      <b-form-radio value="GET">GET</b-form-radio>
                      <b-form-radio value="POST">POST</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col md="8">
                  <b-form-group
                    id="contentTypeGroup"
                    label="content type:"
                    label-for="contentTypeInput"
                  >
                    <b-form-select
                      style="width:auto;"
                      @input="onContentTypeInput"
                      id="requestTypeInput"
                      :options="CONTENT_TYPES"
                      required
                      v-model="form.contentType"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="10" v-if="showBody">
            <div  class="subElement">
            <h5>Body</h5>
              <b-form-group id="bodyInputGroup" label-for="requestBodyId" description>
                <b-form-textarea
                  @input="onBodyInput"
                  id="requestBodyId"
                  type="text"
                  v-model="form.body"
                  required
                  placeholder="JSON body"
                  :rows="3"
                  :max-rows="6"
                  :state="isBodyValid"
                >></b-form-textarea>
              </b-form-group>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col xs="5" sm="3" md="2" lg="1">
            <b-button type="submit" variant="primary">Send</b-button>
          </b-col>
          <b-col xs="5" sm ="3" md="2" lg="1" >
            <b-button  type="reset" variant="danger">Reset</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
    <b-container class="customElement">
      <h3>Responses</h3>
      <http-response
        v-for="entry in responses.slice().reverse()"
        v-bind:key="entry.$index"
        v-bind="{rsp:entry}"
        @dismissed="deleteResponse"
      ></http-response>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { api, API_URL } from "@/service/api";
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
    },
    isBodyValid(): boolean {
      let valid = true;
      try {
        JSON.parse(this.form.body);
      } catch (Error) {
        valid = false;
      }
      return valid;
    }
  },
  components: {
    "http-response": HttpResponse
  },
  methods: {
    deleteResponse(e: any) {
      const index = this.responses.indexOf(e);
      console.log("index", index, "of", this.responses.length);
      console.log(e.data, this.responses[index].data);
      // this.responses.splice(index, 1);
    },
    async sendRequest() {
      console.log("sending request");
      switch ((this.form.requestType as any) as "GET" | "POST") {
        case "GET":
          api.get(this.form.url, this.form.requestType).then(rsp => {
            this.responses.push(rsp);
          });

          break;
        case "POST":
          if ((this.isBodyValid as any) as boolean) {
            const obj = JSON.parse(this.form.body);
            api.post(this.form.url, obj).then(rsp => {
              this.responses.push(rsp);
            });
          } else {
            alert("invalid json body");
          }
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
    onBodyInput() {
      // console.log("onBodyChange", this.form.body);
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