<template>
  <div class="container">
    <section v-if="loading" class="tablegen">
      <b-field grouped group-multiline>
        <!-- <div class="control">
        <b-checkbox v-model="showDetailIcon">Detail column</b-checkbox>
      </div>
      <div v-for="(column, index) in columnsVisible" :key="index" class="control">
        <b-checkbox v-model="column.display">
          {{ column.title }}
        </b-checkbox>
      </div> -->
        <b-button label="Clear checked" type="is-danger" icon-left="close" class="field" @click="checkedRows = []" />
        <b-button label="Download all" type="is-primary" v-on:click="groupAndLoad" />
        <b-button label="Download selected" type="is-primary is-light" v-on:click="downloadSelected" />
        <!-- <b-select v-model="checkboxPosition">
          <option value="left">Checkbox at left</option>
          <option value="right">Checkbox at right</option>
        </b-select> -->
        <!-- <div><button v-on:click="downEvery">Ding</button></div>
        <div><button v-on:click="auth">Ding1</button></div> -->
      </b-field>

      <b-table
        :data="filteredData"
        ref="table"
        detailed
        hoverable
        custom-detail-row
        :checked-rows.sync="checkedRows"
        checkable
        :checkbox-position="checkboxPosition"
        :default-sort="['displayName', 'asc']"
        detail-key="displayName"
        @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.displayName}`)"
        :show-detail-icon="showDetailIcon"
      >
        <b-table-column
          field="displayName"
          :visible="columnsVisible['displayName'].display"
          :label="columnsVisible['displayName'].title"
          width="300"
          searchable
          checkable
          v-slot="props"
        >
          <template v-if="showDetailIcon">
            {{ props.row.displayName }}
          </template>
          <template v-else>
            <a @click="toggle(props.row)">
              {{ props.row.displayName }}
            </a>
          </template>
        </b-table-column>

        <b-table-column
          field="webUrl"
          :visible="columnsVisible['webUrl'].display"
          :label="columnsVisible['webUrl'].title"
          sortable
          searchable
          checkable
          centered
          v-slot="props"
        >
          {{ props.row.webUrl }}
        </b-table-column>
        <b-table-column
          field="download"
          :visible="columnsVisible['download'].display"
          :label="columnsVisible['download'].title"
          sortable
          searchable
          checkable
          centered
          v-slot="props"
        >
          {{ props.row.download }}
        </b-table-column>
        <b-table-column
          field="lastModifiedDateTime"
          :visible="columnsVisible['lastModifiedDateTime'].display"
          :label="columnsVisible['lastModifiedDateTime'].title"
          sortable
          centered
          searchable
          checkable
          v-slot="props"
        >
          <span class="tag is-success" :class="['tag', { 'is-danger': !props.row.late }, { 'is-success': props.row.late }]">
            {{ new Date(props.row.lastModifiedDateTime).toLocaleDateString() }}
          </span>
        </b-table-column>
        <b-table-column
          field="createdDateTime"
          :visible="columnsVisible['createdDateTime'].display"
          :label="columnsVisible['createdDateTime'].title"
          sortable
          searchable
          checkable
          centered
          v-slot="props"
        >
          {{ props.row.createdDateTime }}
        </b-table-column>

        <template slot="detail" slot-scope="props">
          <tr v-for="item in props.row.items" :key="item.displayName">
            <td v-if="showDetailIcon"></td>
            <td v-show="columnsVisible['displayName'].display">{{ "" }}</td>
            <td v-show="columnsVisible['displayName'].display">{{ item.displayName }}</td>
            <td v-show="columnsVisible['webUrl'].display" class="has-text-centered"><a v-bind:href="item.webUrl">Open</a></td>
            <td v-show="columnsVisible['download'].display" class="has-text-centered"><a v-bind:href="item.download">Download</a></td>
            <td v-show="columnsVisible['lastModifiedDateTime'].display" class="has-text-centered">
              <span class="tag is-success" :class="['tag', { 'is-danger': props.row.late }, { 'is-success': !props.row.late }]">
                {{ new Date(item.lastModifiedDateTime).toLocaleDateString() }}
              </span>
            </td>
            <td v-show="columnsVisible['createdDateTime'].display" class="has-text-centered">
              {{ item.createdDateTime }}
            </td>
          </tr>
        </template>
      </b-table>
    </section>
    <section v-else>
      <div class="loading">
        <Loading />
      </div>
    </section>
  </div>
</template>

<script>
import endpoints from "../apiEndPoints/endpoint.json";
import moment from "moment";
import Promise from "bluebird";
import Loading from "./Loading";
import JsZip from "jszip";
import JSZipUtils from "jszip-utils";
import FileSaver from "file-saver";
import { saveAs } from "save-as";

export default {
  props: ["propData"],
  components: { Loading },
  data() {
    return {
      checkedRows: [],
      checkboxPosition: "left",
      columnsVisible: {
        displayName: { title: "Name", display: true },
        webUrl: { title: "Online link", display: true },
        download: { title: "Download", display: true },
        lastModifiedDateTime: { title: "Last modified", display: true },
        createdDateTime: { title: "Created", display: true },
      },
      showDetailIcon: false,
      endpoints: endpoints,
      filteredData: [],
      urlArrays: [],
      selectedUrls: [],
      loading: true,
    };
  },
  methods: {
    defineName: function (arr, url) {
      let file = {};
      arr.forEach((element) => {
        element.items.forEach((el) => {
          if (el.download === url) {
            file.folderName = element.displayName;
            file.fileName = el.displayName + " " + el.createdDateTime;
          }
        });
      });
      return file;
    },
    getUrls(arr) {
      this.selectedUrls = [];
      arr.forEach((element) => {
        element.items.forEach((el) => {
          this.selectedUrls.push(el.download);
        });
      });
    },
    downloadSelected: function () {
      this.getUrls(this.checkedRows);
      console.log(this.selectedUrls);

      this.loading = false;
      var zip = new JsZip();
      var count = 0;
      var zipFilename = "zipFilename.zip";
      var urls = this.selectedUrls;
      urls.forEach((url) => {
        let fileName = this.defineName(this.checkedRows, url).fileName;
        let folderName = this.defineName(this.checkedRows, url).folderName;

        // loading a file and add it in a zip file
        JSZipUtils.getBinaryContent(url, (err, data) => {
          if (err) {
            throw err; // or handle the error
          }
          zip.folder(folderName).file(`${fileName}.mp4`, data, { binary: true });
          count++;
          if (count === urls.length) {
            zip
              .generateAsync({ type: "blob" })
              .then((content) => {
                saveAs(content, zipFilename);
              })
              .finally((this.loading = true));
          }
        });
      });
    },
    groupAndLoad() {
      this.loading = false;
      var zip = new JsZip();
      var count = 0;
      var zipFilename = "zipFilename.zip";
      var urls = this.urlArrays;
      urls.forEach((url) => {
        let fileName = this.defineName(this.filteredData, url).fileName;
        let folderName = this.defineName(this.filteredData, url).folderName;

        // loading a file and add it in a zip file
        JSZipUtils.getBinaryContent(url, (err, data) => {
          if (err) {
            throw err; // or handle the error
          }
          zip.folder(folderName).file(`${fileName}.mp4`, data, { binary: true });
          count++;
          if (count === urls.length) {
            zip
              .generateAsync({ type: "blob" })
              .then((content) => {
                saveAs(content, zipFilename);
              })
              .finally((this.loading = true));
          }
        });
      });
    },
    downEvery: function () {
      this.loading = false;
      this.downloadAndZip(this.urlArrays);
    },
    download: async function (url) {
      return fetch(url).then((resp) => resp.blob());
    },

    downloadByGroup: function (urls, files_per_group = 5) {
      return Promise.map(
        urls,
        async (url) => {
          return await this.download(url);
        },
        { concurrency: files_per_group }
      );
    },

    exportZip: async function (blobs) {
      const zip = new JsZip();

      blobs.forEach((blob, i) => {
        zip.folder("name").file(`file-${i}.mp4`, blob);
      });

      zip.generateAsync({ type: "blob" }).then((zipFile) => {
        const currentDate = new Date().getTime();
        const fileName = `combined-${currentDate}.zip`;
        return FileSaver.saveAs(zipFile, fileName);
      });
    },

    downloadAndZip: async function (urls) {
      return this.downloadByGroup(urls, 5)
        .then(this.exportZip)
        .finally(() => {
          setTimeout(() => {
            this.loading = true;
          }, 4000);
        });
    },

    auth: async function () {
      this.filteredData = [];

      let payload = await fetch(this.endpoints.enumAllSites, {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken.accessToken,
        },
      });
      console.log("yetka");
      console.log(payload);
      let tmpJson = await payload.json();
      console.log(tmpJson);
      tmpJson.value.forEach((element) => {
        let obj = {};
        obj.displayName = element.displayName;
        obj.webUrl = element.webUrl;
        obj.lastModifiedDateTime = element.lastModifiedDateTime; //moment(element.lastModifiedDateTime).format("MMMM Do YYYY");
        obj.createdDateTime = moment(element.createdDateTime).format("MMMM Do YYYY");

        obj.id = element.id;
        obj.items = [obj];

        this.filteredData.push(obj);
      });
      this.filteredData.forEach(async (element) => {
        let payload1 = await fetch(`https://graph.microsoft.com/v1.0/sites/${element.id}/drives`, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken.accessToken,
          },
        });

        let basi = await payload1.json();

        element.driveId = basi.value[0].id;

        let payload2 = await fetch(
          `https://graph.microsoft.com/v1.0/sites/${element.id}/drives/${element.driveId}/root:/general/recordings:/children`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken.accessToken,
            },
          }
        );

        let basi2 = await payload2.json();
        console.log("basi");
        element.items = basi2.value;

        element.items.forEach((el) => {
          el.displayName = el["name"];
          el.download = el["@microsoft.graph.downloadUrl"];
          el.createdDateTime = moment(el["createdDateTime"]).format("MMMM Do YYYY");
          // el.lastModifiedDateTime = el["lastModifiedDateTime"]; //moment(el["lastModifiedDateTime"]).format("MMMM Do YYYY");
          if (moment().diff(moment(el.lastModifiedDateTime), "days") > 7) {
            el.late = false;
          } else {
            el.late = true;
          }
          this.urlArrays.push(el.download);
        });
      });
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
  },

  computed: {
    count() {
      return this.$store.getters.getToken.accessToken;
    },
  },

  watch: {
    count() {
      console.log("dassaax");
      this.auth();
      console.log(this.filteredData);
    },
  },
};
</script>

<style lang="scss">
@import "../mystyles.scss";

.tablegen {
  width: 80%;
  margin: auto;
  position: relative;
  right: 10rem;
  padding: 10px;
  padding-top: 15rem;
  background-color: white;
}
.loading {
  position: relative;
  top: 11rem;
}
</style>
