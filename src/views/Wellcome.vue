<template>
  <div>
    <a href="#fake" class="enter">ENTER</a>
    <div class="page">
      <div class="main">
        <!--  Content of page -->
        <header class="clearfix">
          <div class="container">
            <div class="intro">
              <a href="/grid"><h1>WELCOME</h1></a>
              <p>to Microsoft file manager</p>
            </div>
          </div>
        </header>

        <section class="words">
          <div class="container">
            <TableTH />
          </div>
        </section>

        <section class="words">
          <div class="container"></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from "jquery";
import * as Msal from "msal";
var $ = require("jquery");
import TableTH from "./Home";
export default {
  props: ["propData"],
  components: { TableTH },
  data() {
    return {};
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
      return loginResponse;
    },
  },
  mounted() {
    var preloader = (function () {
      "use-strict";

      // Vars

      var main = $(".main"),
        btn = $(".enter"),
        page = $(".page");

      return {
        run: function () {
          // show on load
          main.show();
          // apend and prepend html
          main.prepend(this.tmpl.tl + this.tmpl.tr);
          main.append(this.tmpl.bl + this.tmpl.br);
          // on click open site
          this.click_btn();
        },

        tmpl: {
          tl: '<span class="tl"></span>',
          tr: '<span class="tr"></span>',
          bl: '<span class="bl"></span>',
          br: '<span class="br"></span>',
        },

        click_btn: function () {
          btn.on("click", function () {
            page.addClass("loaded");
            btn.addClass("hideThis");
            preloader.animations();
          });
        },

        animations: function () {
          var tl = $(".loaded .tl"),
            tr = $(".loaded .tr"),
            bl = $(".loaded .bl"),
            br = $(".loaded .br");

          tl.delay(600).animate({ top: "-100%", left: "-100%" }, 1000);
          tr.delay(600).animate({ top: "-100%", left: "100%" }, 1000);
          bl.delay(400).animate({ top: "100%", left: "100%" }, 2000);
          br.delay(400).animate({ top: "100%", left: "-100%" }, 2000);
          btn.remove();
        },
      };
    })(jQuery);
    this.auth();
    preloader.run();
  },
};
</script>

<style>
html,
body {
  background: #e74c3c;
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
}
.page {
  font-family: "Lato", sans-serif;
  display: block;
  float: left;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.loaded {
  overflow-y: auto;
}
.main {
  display: none;
}
.tl,
.tr,
.bl,
.br {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(https://25.media.tumblr.com/f4f22b2eb234e51e3183fde267ccdc70/tumblr_n10mxm8L7u1st5lhmo1_1280.jpg) no-repeat center center
    fixed #000;
  -moz-background-size: cover;
  background-size: cover;
}
/* top left*/
.tl {
  top: 0;
  top: -75%;
  left: -50%;
}
/* top right*/
.tr {
  top: -75%;
  left: 50%;
}
/* botton left*/
.bl {
  top: 0%;
  left: 50%;
}
/* botton right*/
.br {
  top: 0%;
  left: -50%;
}
.enter:after,
.enter:hover:after,
.enter,
.enter:hover {
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
}
.enter {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  background-color: #2a2a2b;
  background-color: rgba(17, 17, 17, 0.67);
  z-index: 999999999;
  text-align: center;
  line-height: 100px;
  text-decoration: none;
  color: #fff;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  -webkit-box-shadow: 0 0 15px 2px #000;
  -moz-box-shadow: 0 0 15px 2px #000;
  box-shadow: 0 0 15px 2px #000;
}
.enter:after {
  content: " ";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 80px;
  height: 80px;
  background-color: #3fb4be;
  background-color: rgba(0, 235, 255, 0.44);
  z-index: 999999999;
  text-align: center;
  line-height: 80px;
  text-decoration: none;
  color: #fff;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  -webkit-box-shadow: 0 0 15px 2px #000;
  -moz-box-shadow: 0 0 15px 2px #000;
  box-shadow: 0 0 15px 2px #000;
}
.enter:hover {
  -webkit-box-shadow: 0 0 4px 4px #3fb4be;
  -moz-box-shadow: 0 0 4px 4px #3fb4be;
  box-shadow: 0 0 4px 4px #3fb4be;
}
.enter:hover:after {
  background-color: #2a2a2b;
  background-color: rgba(17, 17, 17, 0.67);
}
.hideThis {
  -webkit-box-shadow: 0 0 0 0 #3fb4be;
  -moz-box-shadow: 0 0 0 0 #3fb4be;
  box-shadow: 0 0 0 0 #3fb4be;
  opacity: 0;
  z-index: -5;
}
/* Layout
============================== */

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  background-color: #000;
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  height: 10px;
  background-color: #333;
}
html {
  font: 100%/1.5 "lato", sans-serif;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
@media (min-width: 40rem) {
  html {
    font-size: 112%;
  }
}
@media (min-width: 64rem) {
  html {
    font-size: 120%;
  }
}
body {
  background-color: #fff;
  color: #555;
}
.container {
  margin: 0 auto;
  max-width: 53rem;
  width: 90%;
}
/* Header
================================== */

body {
  background: url(https://25.media.tumblr.com/f4f22b2eb234e51e3183fde267ccdc70/tumblr_n10mxm8L7u1st5lhmo1_1280.jpg) no-repeat center center
    fixed #ecf0f1;
  text-align: center;
  -moz-background-size: cover;
  background-size: cover;
}
.intro {
  margin: 2rem 0;
}
@media (min-width: 40rem) {
  .intro {
    margin: 4rem 0;
  }
}
header h1 {
  color: #fff;
  padding: 0.4rem 0.6rem;
  display: inline-block;
  font-size: 1.8rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}
header p {
  color: white;
  margin: 0 auto;
}
/* Section
========================================= */
.words {
  background: white;
  height: 45rem;
}
section {
  border-top: 1px solid #eee;
  padding: 2rem 0;
}
section:first-of-type {
  border-top: none;
}
@media (min-width: 40rem) {
  section {
    padding: 4rem 0;
  }
}
/* Clearfix by Nicolas Gallagher
========================================== */

.clearfix:before,
.clearfix:after {
  /* content: " "; */
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
</style>
