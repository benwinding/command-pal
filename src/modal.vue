<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="search-box">
            <input
              placeholder="What are you looking for?"
              v-bind:name="autoCompleteNameKiller"
              autocomplete="no"
              v-on:blur="handleKeyPress"
              value=">"
              type="text"
              id="search"
              ref="search"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

const getUUID = () =>
  Math.random()
    .toString(32)
    .slice(2);

export default Vue.extend({
  data() {
    return {
      showModal: false,
      autoCompleteNameKiller: getUUID(),
    };
  },
  mounted() {
    this.$refs.search.focus();
  },
  methods: {
    handleKeyPress: function(e) {
      this.$emit('blurred')
    },
  },
});
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
}

.modal-container {
  max-width: 100%;
  margin: 0px auto;
  padding: 8px;
  background-color: #555;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

#search {
  width: 100%;
  border: 1px solid #00b4cc;
  height: 20px;
  outline: none;
  background-color: #777;
  color: #ddd;
}

#search:focus {
  color: white;
}
</style>
