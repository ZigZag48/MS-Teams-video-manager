<template>
  <div class="home">
    <button class="yetka" v-on:click="auth"></button>
    <TableTH propData:filteredData></TableTH>
  </div>
</template>

<script>
import TableTH from "./Table";
import * as Msal from "msal";
import endpoints from "../apiEndPoints/endpoint.json";

export default {
  name: "Home",
  components: { TableTH },
  data() {
    return {
      endpoints: endpoints,
      filteredData: [],
      sampleLink:
        "https://graph.microsoft.com/v1.0/sites/bas0n.sharepoint.com,4bbe8c1c-a2e0-44c1-97c8-dcf71777afba,0dca0350-1e0b-41aa-870d-7ceb2046eb5b/drives/b!HIy-S-CiwUSXyNz3F3evulADyg0LHqpBhw186yBG61tmqJ_gJjDHTpTH_V5hz8ds/root:/general/recordings/Meeting in _General_-20210505_235241-Meeting Recording.mp4",
    };
  },
  methods: {
    auth: async function () {
      var config = {
        auth: {
          clientId: "75970af2-3996-47c5-945e-a9e06d043da3",
          authority: "https://login.microsoftonline.com/common",
          redirectUri: "http://localhost:8081",
        },
      };
      var client = new Msal.UserAgentApplication(config);
      var request = {
        scopes: [
          "user.read",
          "Files.Read",
          "Files.ReadWrite",
          "Files.Read.All",
          "Files.ReadWrite.All",
          "Sites.Read.All",
          "Sites.ReadWrite.All",
        ],
      };
      let loginResponse = await client.loginPopup(request);
      console.log(loginResponse);
      let tokenResponse = await client.acquireTokenSilent(request);
      // console.log(tokenResponse);
      let payload = await fetch(this.endpoints.enumAllSites, {
        headers: {
          Authorization: "Bearer " + tokenResponse.accessToken,
        },
      });
      let tmpJson = await payload.json();
      console.log(tmpJson);
      tmpJson.value.forEach((element) => {
        let obj = {};
        obj.displayName = element.displayName;
        obj.webUrl = element.webUrl;
        obj.lastModifiedDateTime = element.lastModifiedDateTime;
        obj.createdDateTime = element.createdDateTime;
        obj.items = [obj];
        this.filteredData.push(obj);
      });
      console.log(this.filteredData);
    },
  },
};
</script>
<style lang="scss">
@import "./../mystyles.scss";
</style>
