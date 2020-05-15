<script>
  import Fuse from "fuse.js";
  import PaletteContainer from "./PaletteContainer.svelte";
  import CommandList from "./CommandList.svelte";
  import SearchField from "./SearchField.svelte";
  import { setContext, onMount, createEventDispatcher } from "svelte";
  import { asyncTimeout, setMainShortCut, setAllShortCuts } from "./shortcuts";
  const dispatch = createEventDispatcher();

  export let hotkey;
  export let inputData = [];
  const options = {
    isCaseSensitive: false,
    shouldSort: true,
    keys: ["name", "description"]
  };

  let showModal = false;
  let currentText = "";
  let selectedIndex = "";
  let items = inputData;
  let itemsFiltered = inputData;
  let fuse = new Fuse(items, options);

  onMount(() => {
    setMainShortCut(hotkey, async () => {
      showModal = true;
      selectedIndex = 0;
      dispatch("opened");
    });
    setAllShortCuts(inputData, async (command) => {
      showModal = true;
      dispatch("opened");
      await asyncTimeout(200);
      selectedIndex = inputData.findIndex(i => i.name === command.name);
      await asyncTimeout(100);
      onHandleCommand(command);
    });
  });

  function onHandleCommand(command) {
    const hasChildren = command.children;
    if (hasChildren) {
      items = command.children;
      itemsFiltered = items;
      fuse = new Fuse(items, options);
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
    if (selectedIndex < minIndex) {
      selectedIndex = minIndex;
    }
  }

  function onKeyDown(e) {
    selectedIndex++;
    const maxIndex = itemsFiltered.length - 1;
    if (selectedIndex > maxIndex) {
      selectedIndex = maxIndex;
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

  function onClosed(e) {
    dispatch("closed");
    items = inputData;
    itemsFiltered = items;
    showModal = false;
    selectedIndex = 0;
  }
</script>

<div>
  <PaletteContainer bind:show={showModal}>
    <div slot="search">
      <SearchField
        show={showModal}
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