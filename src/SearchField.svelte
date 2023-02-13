<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { asyncTimeout } from "./shortcuts";

  export let show;
  export let inputEl;
  export let placeholderText;
  export let backspaceCloseCount;

  let inputValue;
  let inputElFeedback; // will hold the element div.search-feedback
  let currentBackspaceCount = 0;  // counts consecutive pushes of backspace key

  const getUUID = () =>
    Math.random()
      .toString(32)
      .slice(2);
  const inputName = getUUID();

  function onBlur() {
    dispatch("closed");
    inputValue = "";
    currentBackspaceCount = 0;
    setElFeedback('')
  }

  function onFieldBlur() {
    if (window.commandPalIgnoreBlur) return;
    onBlur();
  }

  function setElFeedback(message) {
    if (! inputElFeedback) {
      inputElFeedback = document.getElementById(
	inputName + "-feedback")
    }

    inputElFeedback.innerText = message
    if (!!message) {
      inputElFeedback.classList.add('open');
    } else {
      inputElFeedback.classList.remove('open');
    }
  }

  function onKeyDown(e) {
    const keyCode = e.key.toLowerCase();
    if (keyCode === "enter") {
      dispatch("enter", inputValue);
      onBlur();
    } else if (keyCode === "arrowdown") {
      currentBackspaceCount = 0;
      setElFeedback('')
      dispatch("arrowdown");
    } else if (keyCode === "arrowup") {
      currentBackspaceCount = 0;
      setElFeedback('')
      dispatch("arrowup");
    } else if (keyCode === "backspace" && backspaceCloseCount) {
      // empty input: undefined if just opened, if keys added/deleted is ''
      if (!inputValue){
	currentBackspaceCount++
	if (currentBackspaceCount >= backspaceCloseCount) {
	  onBlur();
	} else {
	  // notify the user
	  let left = backspaceCloseCount - currentBackspaceCount
	  if (left < 5) {
	    setElFeedback(`${left} more to exit`)
	  }
	}
      }
    } else if (keyCode === "escape") {
      onBlur();
    } else {
      currentBackspaceCount = 0;
      setElFeedback('')
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
  .search-feedback {
    display: none;
    font-size: smaller;
    color: goldenrod;
    border-block: black 2px inset;
  }
  /* use this to scope style and force svelte to keep the style since
     .open is applied dynamically and svelte removes it as unused. */
  div:global(.search-feedback.open) {
      display: block;
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
<div id={inputName + '-feedback'} class="search-feedback"></div>
