<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let show = false;
  export let inputValue;
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
      dispatch("exec", inputValue);
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
    width: 100%;
  }

  .modal-container {
    max-width: 100%;
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    padding: 0px;
    background-color: #555;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .search {
    width: 100%;
    border: 1px solid #0081cc;
    height: 20px;
    outline: none;
    font-size: 1.1em;
    background-color: #777;
    color: #ddd;
    margin: 0;
    padding: 14px;
    padding-left: 6px;
    box-sizing: border-box;
    box-shadow: none;
    border-radius: 0px;
  }
  .search::placeholder {
    color: #aaa;
    opacity: 1; /* Firefox */
  }
  .search-box {
    padding: 7px;
  }

  .search:focus {
    color: white;
  }
  .hidden {
    display: none;
  }
  @media (min-width: 400px) {
    .modal-container {
      max-width: 400px;
    }
  }
</style>

<div class="modal-mask" class:hidden={!show}>
  <div class="modal-wrapper">
    <div class="modal-container">
      <div class="search-box">
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
      </div>
      <div>
        <slot name="items" />
      </div>
    </div>
  </div>
</div>
