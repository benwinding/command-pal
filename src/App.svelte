<script lang="ts">
  import Fuse from "fuse.js";
  import PaletteContainer from "./PaletteContainer.svelte";
  import CommandList from "./CommandList.svelte";
  import SearchField from "./SearchField.svelte";
  import MobileButton from "./MobileButton.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import {
    asyncTimeout,
    setMainShortCut,
    setAllShortCuts,
    initShortCuts
  } from "./shortcuts";
  const dispatch = createEventDispatcher();

  export let hotkey: string;
  export let inputData = [];
  export let hotkeysGlobal: any;
  export let placeholderText: string;
  export let hideButton: boolean;;
  export let paletteId: string;

  const optionsFuse = {
    isCaseSensitive: false,
    shouldSort: true,
    keys: ["name", "description"]
  };

  let showModal = false;
  let searchField;
  let loadingChildren = false;
  let selectedIndex: any = "";
  let items = inputData;
  let itemsFiltered = inputData;
  let fuse = new Fuse(items, optionsFuse);
  let focusedElement;
  let selectionStart: number | undefined;
  let selectionEnd: number | undefined;

  onMount(() => {
    initShortCuts(hotkeysGlobal);
    setMainShortCut(hotkey, async () => {
      if (showModal) {
      	onClosed()
      } else {
        focusedElement = document.activeElement;
        selectionStart = focusedElement.selectionStart;
        selectionEnd = focusedElement.selectionEnd;
        showModal = true;
        selectedIndex = 0;
        dispatch("opened");
      }
    });
    setAllShortCuts(inputData, async command => {
      focusedElement = document.activeElement
      showModal = true;
      dispatch("opened");
      await asyncTimeout(200);
      selectedIndex = inputData.findIndex(i => i.name === command.name);
      await asyncTimeout(100);
      onHandleCommand(command);
    });
  });

  function setItems(newItems) {
    items = newItems;
    itemsFiltered = items;
    fuse = new Fuse(items, optionsFuse);
  }

  async function onHandleCommand(command) {
    if (!command) {
      return;
    }
    const hasChildren =
      Array.isArray(command.children) && command.children.length;
    if (hasChildren) {
      showModal = true;
      loadingChildren = true;
      setItems(command.children);
      searchField.value = "";
      await asyncTimeout(200);
      searchField.focus();
      loadingChildren = false;
    } else {
      await asyncTimeout(25);
      dispatch("exec", command);
      showModal = false;
    }
    selectedIndex = 0;
  }

  function onClickedIndex(e) {
    selectedIndex = e.detail;
    const command = itemsFiltered[selectedIndex];
    onHandleCommand(command);
  }

  function onKeyEnter(e) {
    const command = itemsFiltered[selectedIndex];
    onHandleCommand(command);
  }

  function onKeyUp(e) {
    selectedIndex--;
    const minIndex = 0;
    const maxIndex = itemsFiltered.length - 1;
    if (selectedIndex < minIndex) {
      selectedIndex = maxIndex;
    }
  }

  function onKeyDown(e) {
    selectedIndex++;
    const minIndex = 0;
    const maxIndex = itemsFiltered.length - 1;
    if (selectedIndex > maxIndex) {
      selectedIndex = minIndex;
    }
  }

  function onTextChange(e) {
    const text = e.detail;
    dispatch("textChanged", text);
    selectedIndex = 0;
    if (!text) {
      itemsFiltered = items;
    } else {
      const fuseResult = fuse.search(text);
      itemsFiltered = fuseResult.map(i => i.item);
    }
  }

  async function onClosed() {
    await asyncTimeout(10);
    if (loadingChildren) {
      return;
    }
    dispatch("closed");
    selectedIndex = 0;
    setItems(inputData);
    showModal = false;
    if ( ! focusedElement ) {
      console.error("focusedElement not set")
    } else {
      focusedElement.focus();
      if (selectionStart && selectionEnd) {
        focusedElement.setSelectionRange(selectionStart, selectionEnd);
      }
    }
  }

  function onMobileClick(e) {
    dispatch("opened");
    showModal = true;
    selectedIndex = 0;
  }

  function onMobileFocus(e) {
    /* Store the item that had focus and assign it to focusedElement.
       This will allow us to set focus back to it when we exit. */

    // Surprisingly event is defined and has the correct data
    // even if I don't do this. But I'll explicity pass it via details.
    // as having event magically defined scares me.
    let event = e.detail;
    if (event.relatedTarget && event.relatedTarget.focus) {
       focusedElement = event.relatedTarget;
    } else {
      focusedElement = document.body
    }
  }
</script>

<div id={paletteId}>
  {#if !hideButton}
    <MobileButton on:click={onMobileClick} on:focus={onMobileFocus}/>
  {/if}
  <PaletteContainer bind:show={showModal}>
    <div slot="search">
      <SearchField
        placeholderText={placeholderText}
        show={showModal}
        bind:inputEl={searchField}
        on:closed={onClosed}
        on:enter={onKeyEnter}
        on:arrowup={onKeyUp}
        on:arrowdown={onKeyDown}
        on:textChange={onTextChange} />
    </div>
    <div slot="items">
      <CommandList
        items={itemsFiltered}
        {selectedIndex}
        on:clickedIndex={onClickedIndex} />
    </div>
  </PaletteContainer>
</div>
