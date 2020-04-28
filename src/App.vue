<template>
  <div>
    <h2>Command Pal</h2>
    <p>Press <code>ctrl + p</code> to access Command Pal!</p>

    <modal
      v-if="showModal"
      @close="showModal = false"
      v-on:blurred="showModal = false"
    >
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import hotkeys from "hotkeys-js";
import modal from "./modal.vue";

export default Vue.extend({
  components: {
    modal,
  },
  name: "App",
  data() {
    return {
      showModal: false,
    };
  },
  mounted() {
    const that = this;
    hotkeys("ctrl+p", function(e) {
      e.preventDefault();
      that.showModal = true;
    });
    hotkeys("esc", function(e) {
      e.preventDefault();
      that.showModal = false;
    });
    hotkeys("enter", function(e) {
      e.preventDefault();
      that.showModal = false;
    });
  },
});
</script>
