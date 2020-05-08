<script>
  import hotkeys from "hotkeys-js";
  import Fuse from "fuse.js";
  import Modal from "./modal.svelte";
  import ItemsFiltered from "./ItemsFiltered.svelte";

  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const asyncTimeout = ms => new Promise(res => setTimeout(res, ms));

  export let shortcutKey;
  export let items = [];
  const options = {
    isCaseSensitive: false,
    shouldSort: true,
    keys: ["name"]
  };

  let showModal = false;
  let currentText = "";
  let selectedIndex = "";
  const fuse = new Fuse(items, options);

  let itemsFiltered = items;

  onMount(() => {
    console.log("CommandPal.App", { shortcutKey });
    hotkeys(shortcutKey, function(e) {
      e.preventDefault();
      showModal = true;
      dispatch("opened");
    });
    items
      .filter(item => item.shortcut)
      .map(item => {
        hotkeys(item.shortcut, async function(e) {
          e.preventDefault();
          showModal = true;
          dispatch("opened");
          await asyncTimeout(200);
          selectedIndex = items.findIndex(i => i.name === item.name)
          await asyncTimeout(100);
          onExec({})
        });
      });
  });

  function onExec(e) {
    const currentItem = itemsFiltered[selectedIndex];
    dispatch("exec", currentItem);
    showModal = false;
    selectedIndex = 0;
  }

  function onClickedIndex(e) {
    selectedIndex = e.detail;
    const currentItem = itemsFiltered[selectedIndex];
    dispatch("exec", currentItem);
  }
  function onClosed(e) {
    dispatch("closed");
    showModal = false;
    selectedIndex = 0;
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
</script>

<div>
  <Modal
    bind:show={showModal}
    on:closed={onClosed}
    on:exec={onExec}
    on:arrowup={onKeyUp}
    on:arrowdown={onKeyDown}
    on:textChange={onTextChange}>
    <div slot="items">
      <ItemsFiltered
        items={itemsFiltered}
        {selectedIndex}
        on:clickedIndex={onClickedIndex} />
    </div>
  </Modal>
</div>
