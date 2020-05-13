<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let items = [];
  export let selectedIndex = 0;
  let selectedIndexLast = 0;

  let listEl;

  function clickedIndex(e, hoverIndex) {
    const isPrimaryButton = e.which === 1;
    if (!isPrimaryButton) {
      return;
    }
    dispatch("clickedIndex", hoverIndex);
  }

  function checkSelectedIndexInView() {
    const listItemEl = listEl.querySelector(".items-list .selected");
    const isPressingDownArrow = 0 < selectedIndex - selectedIndexLast;
    selectedIndexLast = selectedIndex;
    const isPressingUpArrow = !isPressingDownArrow;

    // const isAtScrollBeginning = listEl.scrollTop === 0;
    const isWithinBeginning = listItemEl.offsetTop < listEl.clientHeight - 36;
    const isWithinMiddle =
      listItemEl.offsetTop < listItemEl.offsetTop - listEl.clientHeight + 36*2 &&
      listItemEl.offsetTop > 0;
    const isWithinEnd =
      listItemEl.offsetTop < listItemEl.offsetTop - listEl.clientHeight + 36*2 &&
      listItemEl.offsetTop > 0;
    console.log({ isWithinBeginning, isWithinMiddle, isWithinEnd });
    // if (isAtScrollBeginning && isWithinBeginning) {
    //   return;
    // }
    // if (!isWithinBeginning && isPressingDownArrow) {
    //   listEl.scrollTop = listItemEl.offsetTop - listEl.clientHeight + 36;
    //   return;
    // }
    // if (!isWithinMiddle && isPressingUpArrow) {
    //   listEl.scrollTop = listItemEl.offsetTop - listEl.clientHeight + 36;
    //   return;
    // }

    // const currentScrollHeight = listEl.scrollTop;
    // const currentElementOffset = listItemEl.offsetTop;
    // const itemOffset = currentElementOffset - currentScrollHeight;
    // const isItemWithinView = itemOffset > 0 && itemOffset < listHeight;

    // const isScrolledTop = currentScrollHeight === 0;

    // const shouldScrollDown = isPressingDownArrow && currentElementOffset > (listHeight - 100);
    // const shouldScrollUp = !isPressingDownArrow && currentElementOffset > (listHeight - 100);
    // if (shouldScrollDown) {
    // listEl.scrollTop = listItemEl.offsetTop - listHeight + 150;
    // }
    // else if (!isPressingDownArrow && currentElementOffset) {
    //   listEl.scrollTop = (listItemEl.offsetTop - 50);
    // }
  }

  $: {
    if (listEl && selectedIndexLast != selectedIndex)
      checkSelectedIndexInView();
  }
</script>

<style>
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px;
    padding: 7px;
  }
  .item:hover {
    cursor: pointer;
  }
  kyb {
    padding: 1px 4px;
    border-radius: 6px;
    font-family: monospace;
  }
  .items-list {
    overflow-y: auto;
    max-height: 360px;
  }
</style>

<div class="items-list" bind:this={listEl}>
  {#each items as item, index}
    <p
      class="item"
      class:selected={index == selectedIndex}
      on:mousedown={e => clickedIndex(e, index)}>
      <span>{item.name}</span>
      {#if !!item.shortcut}
        <kyb>{item.shortcut}</kyb>
      {:else}
        <span />
      {/if}
    </p>
  {/each}
</div>
