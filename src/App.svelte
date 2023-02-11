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
  export let displayHints: boolean;
  export let debugOutput: boolean;
  export let orderedCommands: boolean;

  // re: space '(' alphanumeric_word_char
  //            "0 or more word_char space/tab and -" ')'
  //            end of line
  // Note: this should be the unicode equivalent of the Latin regexp:
  //    / \(\w[\s\w-]*\)$/
  let hintRegexp = / \([ \u0000-\u0019\u0021-\uFFFF_-]+\)$/u;

  const optionsFuse = {
    isCaseSensitive: false,
    shouldSort: true,
    keys: ["name", "description", {name: "aliases", weight: 2}],
    includeScore: true,
    includeMatches: true,
  };

  if ( orderedCommands ) {
    optionsFuse.sortFn = function (a,b) {
      /* Sort results in two groups.  If scores of either item are
         below 0.009 sort by score.  This prevents two items with
         weights of 0.003 and 2.2E-16 from being bucketed and sorted
         by order in the command array. If the value is low enough to
         be a really good match, don't use the implicit order in the
         commands array to override it.

         If both scores are larger than 0.009 and the difference
         between them is < 0.05, bucket them together and sort the
         items in the bucket by their original index location in the
         commands array. In this case fuse.js isn't that certain about
         the match and we order based on the position in the command
         array that we have chosen to be most likely.

         Note 0.009 and 0.05 are magic numbers that worked in testing, YMMV.
      */
      return ((a.score > 0.009 && b.score > 0.009) && // if scores > minimum
              Math.abs (a.score - b.score) < 0.05 ?  // bucket them
                (a.idx < b.idx ? -1 : 1) :  // sort by order in commands array
                 (a.score == b.score ?  // else if scores equal
                   (a.idx < b.idx ? -1 : 1) : // sort by index order
                   a.score < b.score ? -1 : 1)) // else sort lowest score first
    }
    if (debugOutput) console.log('Using commands weighted sort');

  } else {
    if (debugOutput) console.log("Using fuse.js's score for sorting");
  }
    
  let showModal = false;
  let searchField;
  let loadingChildren = false;
  let selectedIndex: any = "";
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
      i.name = i.name.replace(hintRegexp, '');
      i.hinted = false
    }})
  }

  /** append best aliases match to command object's name */
  function hintMatch(search_result) {
    /**
     * Accepts an array of 2 element arrays. These are the start/stop
     * that matched the search term for the current match. A metric
     * is calculated from these. Larger values indicate better matches.
     *
     * @param {array} indexList - list of 2 element lists
     * 
     * For each index_list use the [start, end] range to calculate a
     * score. [0,*] indicates first char of term matched. It counts
     * for an additional 0.5 points. Each multi character match [6,7]
     * (2 chars) counts for 2.5 points/char. All numbers are magic
     * weighting factors that seem to work. Formula and number may
     * change.
    */
    let match_metric = (indices) => ( indices.map(
      range => range[0] == 0 ?
	((range[1] - range[0])
	 * 2.5) + 1.5 :
	((range[1] - range[0]) * 2.5) + 1
     ).reduce((sum, val) => sum+val))
    
    const e = search_result.matches.filter(
      i => i.key === "aliases").sort((a,b) => {
	let a_mm = match_metric(a.indices)
	let b_mm = match_metric(b.indices)

	// a higher match_metric is assigned to a term that is a
	// better match for the search.
	// Sort by higher match_metric. If match_metrics are equal,
	// sort the one with the lower index in the aliases array
	// first. (Put the best choice aliases first.)
	//    1 - sort b before a; -1 sort a before b.
	// note: a.refIndex can never equal b.refIndex
	return a_mm == b_mm ?
      	  (a.refIndex < b.refIndex ? -1 : 1) :
          ( a_mm > b_mm? -1 : 1)
      })

    let item = search_result.item
    let hinted = !!item.hinted
    if ( e.length ) {
      /* add hints */
      const hint = ` (${e[0].value})`
      if (! hinted) {
	item.name += hint
      } else {
	item.name = item.name.replace(hintRegexp, hint)
      }
      item.hinted = true
    } else {
      if (item.hinted) {
	/* remove previous hints */
	item.name = item.name.replace(hintRegexp, '')
	item.hinted = false
      }
    }
    if (debugOutput) {
      console.group("CommandPal " + item.name);
      console.debug('score', search_result.score)
      console.debug('index', search_result.refIndex)
      console.debug('weight', item.weight)
      console.debug('hints', e.length)
      console.table(search_result.matches.filter( (i) => {
	if (i.key === "aliases") {
	  i.metric = match_metric(i.indices);
	  return true;
	}
	return false;
      }))
      console.groupEnd("CommandPal " + item.name);
    }
    return item
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
      if (debugOutput && displayHints) console.groupCollapsed(
        "CommandPal search: " + text)
      itemsFiltered = fuseResult.map(processResult);
      if (debugOutput && displayHints) console.groupEnd(
        "CommandPal search: " + text)
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

<div id={paletteId}>
  {#if !hideButton}
    <MobileButton on:click={onMobileClick} />
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
