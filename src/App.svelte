<script>
  import Fuse from "fuse.js";
  import PaletteContainer from "./PaletteContainer.svelte";
  import CommandList from "./CommandList.svelte";
  import SearchField from "./SearchField.svelte";
  import MobileButton from "./MobileButton.svelte";
  import { setContext, onMount, createEventDispatcher } from "svelte";
  import {
    asyncTimeout,
    setMainShortCut,
    setAllShortCuts,
    initShortCuts
  } from "./shortcuts";
  const dispatch = createEventDispatcher();

  export let hotkey;
  export let inputData = [];
  export let hotkeysGlobal;
  export let placeholderText;
  export let debugOutput;

  const optionsFuse = {
    isCaseSensitive: false,
    shouldSort: true,
    keys: ["name", "description"]
  };

  let showModal = false;
  let searchField;
  let loadingChildren = false;
  let currentText = "";
  let selectedIndex = "";
  let items = inputData;
  let itemsFiltered = inputData;
  let fuse = new Fuse(items, optionsFuse);

  onMount(() => {
    initShortCuts(hotkeysGlobal);
    setMainShortCut(hotkey, async () => {
      showModal = true;
      selectedIndex = 0;
      dispatch("opened");
    });
    setAllShortCuts(inputData, async command => {
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

  async function onClosed(e) {
    await asyncTimeout(10);
    if (loadingChildren) {
      return;
    }
    dispatch("closed");
    selectedIndex = 0;
    setItems(inputData);
    showModal = false;
  }

  function onMobileClick(e) {
    dispatch("opened");
    showModal = true;
    selectedIndex = 0;
  }
</script>

<div>
  <MobileButton on:click={onMobileClick} />
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
