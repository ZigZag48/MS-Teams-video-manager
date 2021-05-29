<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Login</p>
    </header>
    <div class="modal-card-body modal_body">
      <div class="inner-div">
        <b-field label="Email">
          <b-input type="email" :value="email" placeholder="Your email" required> </b-input>
        </b-field>
        <br />
      </div>
      <b-field label="Date format" grouped group-multiline position="is-centered">
        <b-radio v-model="dateformat1" name="name" native-value="MMMM Do YYYY"> MMMM Do YYYY </b-radio>
        <b-radio v-model="dateformat1" name="name" native-value="YYYY-MM-DD"> YYYY-MM-DD </b-radio>
        <b-radio v-model="dateformat1" name="name" native-value="DD MM YYYY hh:mm:ss"> DD MM YYYY hh:mm:ss </b-radio>
        <b-radio v-model="dateformat1" name="name" native-value="MM-DD-YYYY"> MM-DD-YYYY </b-radio>
      </b-field>
      <br />
      <br />
      <b-field label="Table adjustment" grouped group-multiline position="is-centered">
        <div class="control">
          <b-switch v-model="isBordered1">Bordered</b-switch>
        </div>
        <div class="control">
          <b-switch v-model="isStriped1">Striped</b-switch>
        </div>
        <div class="control">
          <b-switch v-model="isNarrowed1">Narrowed</b-switch>
        </div>
        <div class="control">
          <b-switch v-model="isHoverable1">Hoverable</b-switch>
        </div>
        <div class="control">
          <b-switch v-model="isFocusable1">Focusable</b-switch>
        </div>
      </b-field>
    </div>
    <footer class="modal-card-foot">
      <b-button rounded label="Close" @click="$parent.close()"></b-button>
      <!-- <b-button label="Save" @click="runevent" type="is-primary" /> -->
      <SaveBTN @clickthis="runevent" />
    </footer>
  </div>
</template>

<script>
import SaveBTN from "./front/SaveBtn";
export default {
  name: "Settings",
  components: { SaveBTN },
  props: ["email", "password", "dateformat", "isBordered", "isStriped", "isNarrowed", "isHoverable", "isFocusable"],
  methods: {
    runevent() {
      console.log("gedir");
      this.$emit(
        "setSettings",
        this.dateformat1,
        this.isBordered1,
        this.isStriped1,
        this.isNarrowed1,
        this.isHoverable1,
        this.isFocusable1
      );
    },
  },
  data() {
    return {
      isBordered1: this.isBordered,
      isStriped1: this.isStriped,
      isNarrowed1: this.isNarrowed,
      isHoverable1: this.isHoverable,
      isFocusable1: this.isFocusable,
      dateformat1: this.dateformat,
    };
  },
  computed: {},
  mounted() {},
};
</script>

<style lang="css">
.b-radio.radio .control-label {
  padding-left: calc(0.75em - 1px);
  color: black;
}

h2 {
  color: black;
}
label {
  color: black;
}
.headerbasi {
  color: black;
}
.modal_body {
  margin: auto;
  width: 60%;
  border: 3px solid #53e3a6;
  padding: 10px;
}
.inner-div {
  margin: auto;
  width: 30%;
  padding-top: 5%;
}
</style>
