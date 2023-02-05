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
  export let displayHints;

  const optionsFuse = {
    isCaseSensitive: false,
    shouldSort: true,
    keys: ["name", "description", {name: "aliases", weight: 2}],
    includeMatches: true,
    sortFn: function (a,b) {
      // This is the same stable sorting function supplied by fuse.
      // Except we treat items with scores less than 0.05 apart as equal.
      // This buckets similar commands together and makes the order of
      // the commands in the commands array have more effect on filtered
      // order. 0.05 is just a magic number that worked in testing, YMMV.
      return ( Math.abs (a.score - b.score) < 0.05 ?
	       (a.idx < b.idx ? -1 : 1) :
	       a.score < b.score ? -1 : 1)
    },
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

  function removeHints(items) {
    if (! displayHints ) return;
    items.map( (i) => { if ( i.hinted ) {
      i.name = i.name.replace(/ \(\w[\s\w-]*\)$/, '');
      i.hinted = false
    }})
  }
  
  function hintMatch(i) {
    // get a series of range matches for the characters. [0,0] indicates
    // first char of term matched. So it counts for 1.5 point. [6,7]
    // indicating 2 chars match counts for 2 points.
    let match_index = (a) => ( a.indices.map(
      range => range[0] == 0 ? range[1] - range[0] + 1.5:
      	    range[1] - range[0] + 1).reduce((sum, val) => sum+val))
    
    const e = i.matches.filter(i => i.key === "aliases").sort((a,b) => {
      let a_mi = match_index(a)
      let b_mi = match_index(b)
      // match_index describes number of matches characters current
      // search term matches. So the higher the better.
      // assume alias array referenced by refIndex has higher prio
      // at lower indexes. So the lower the better.
      return a_mi == b_mi? a.refIndex > b.refIndex : a_mi < b_mi
    })
    let hinted = !!i.item.hinted
    if ( e.length ) {
      /* add hints */
      const hint = ` (${e[0].value})`
      if (! hinted) {
	i.item.name += hint
      } else {
	// re: space '(' alphanumeric_word_char
	//            "0 or more word_char space char and -" ')'
	//            end of line
	// Note: this will not work for non-latin.
	i.item.name = i.item.name.replace(/ \(\w[\s\w-]*\)$/, hint)
      }
      i.item.hinted = true
    } else {
      if (i.item.hinted) {
	/* remove previous hints */
	i.item.name = i.item.name.replace(/ \(\w[\s\w-]*\)$/, '')
	i.item.hinted = false
      }
    }
    return i.item
  }

  function onTextChange(e) {
    const text = e.detail;
    dispatch("textChanged", text);
    selectedIndex = 0;

    const processResult = displayHints ? hintMatch: (i) => i.item
      
    if (!text) {
      itemsFiltered = items;
      removeHints(itemsFiltered);
    } else {
      const fuseResult = fuse.search(text);
      itemsFiltered = fuseResult.map(processResult);
    }
  }

  async function onClosed(e) {
    await asyncTimeout(10);
    if (loadingChildren) {
      return;
    }
    dispatch("closed");
    selectedIndex = 0;
    removeHints(inputData);
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
