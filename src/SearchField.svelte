<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { asyncTimeout } from "./shortcuts";

  export let show;
  export let inputEl;
  export let placeholderText;

  let inputValue;

  const getUUID = () =>
    Math.random()
      .toString(32)
      .slice(2);
  const inputName = getUUID();

  function onBlur() {
    dispatch("closed");
    inputValue = "";
  }

  function onFieldBlur() {
    if (window.commandPalIgnoreBlur) return;
    onBlur();
  }

  function onKeyDown(e) {
    let keyCode = e.key.toLowerCase();

    if (keyCode === "enter") {
      dispatch("enter", inputValue);
      onBlur();
    } else if (keyCode === "arrowdown") {
      dispatch("arrowdown");
    } else if (keyCode === "arrowup") {
      dispatch("arrowup");
    } else if (keyCode === "escape") {
      onBlur();
    }
  }

  async function onTextChanged(e) {
    await asyncTimeout(10)
    dispatch("textChange", inputValue);
  }

  $: {
    if (!!show && !!inputEl) {
      setTimeout(() => {
        inputEl.focus();
      });
    }
  }
</script>

<style>
  .search {
    width: 100%;
    height: 20px;
    outline: none;
    font-size: 1.1em;
    margin: 0;
    padding: 14px;
    padding-left: 6px;
    box-sizing: border-box;
    box-shadow: none;
    border-radius: 0px;
  }
  .search::placeholder {
    opacity: 1; /* Firefox */
  }
</style>

<input
  class="search"
  bind:this={inputEl}
  bind:value={inputValue}
  id={inputName}
  name={inputName}
  on:blur={onFieldBlur}
  on:keydown={onKeyDown}
  on:input={onTextChanged}
  autocomplete="no"
  type="text"
  placeholder={placeholderText} />
