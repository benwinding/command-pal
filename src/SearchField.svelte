<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let show;

  let inputValue;
  let inputEl;

  const getUUID = () =>
    Math.random()
      .toString(32)
      .slice(2);
  const inputName = getUUID();

  function onBlur() {
    dispatch("closed");
    inputValue = "";
  }

  function onKeyDown(e) {
    const keyCode = e.code.toLowerCase();
    if (keyCode === "enter") {
      dispatch("enter", inputValue);
    } else if (keyCode === "arrowdown") {
      dispatch("arrowdown");
    } else if (keyCode === "arrowup") {
      dispatch("arrowup");
    } else if (keyCode === "escape") {
      onBlur();
    }
  }

  function onKeyUp(e) {
    const keyCode = e.code.toLowerCase();
    if (
      keyCode.includes("space") ||
      keyCode.includes("backspace") ||
      keyCode.includes("delete") ||
      keyCode.startsWith("key") ||
      keyCode.startsWith("digit") ||
      keyCode.startsWith("numpad")
    ) {
      dispatch("textChange", inputValue);
    }
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
  name={inputName}
  on:blur={onBlur}
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
  autocomplete="no"
  type="text"
  placeholder="What are you looking for?" />
