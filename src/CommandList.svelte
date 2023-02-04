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
    if (!listEl) {
      return;
    }
    const listItemEl = listEl.querySelector(".items-list .selected");
    if (!listItemEl) {
      return;
    }
    const isPressingDownArrow = 0 < selectedIndex - selectedIndexLast;
    selectedIndexLast = selectedIndex;
    const isPressingUpArrow = !isPressingDownArrow;

    const viewTop = listEl.scrollTop + 36;
    const viewBottom = listEl.scrollTop + listEl.clientHeight;
    const itemTop = listItemEl.offsetTop - 8;
    const viewTopIdealPressingDown = itemTop - listEl.clientHeight;
    const viewTopIdealPressingUp = itemTop - 36;
    const isWithinView = itemTop <= viewBottom && itemTop >= viewTop;

    if (isWithinView) {
      return
    }

    if (isPressingDownArrow) {
      listEl.scrollTop = viewTopIdealPressingDown;
    }
    if (isPressingUpArrow) {
      listEl.scrollTop = viewTopIdealPressingUp;
    }

  }

  $: {
    if (selectedIndexLast != selectedIndex)
      setTimeout(() => checkSelectedIndexInView());
  }
</script>

<style>
  .item {
    display: flex;
    gap: 0.5em;
    align-items: center;
    justify-content: space-between;
    margin: 0px;
    padding: 0px 7px;
    height: 36px;
  }
  .item:hover {
    cursor: pointer;
  }
  .item span {
    flex-grow: 1;
  }
  .item :global(img) {
    height:24px;
    width:24px;
  }
  .item :global(span.icon) {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    width: 24px;
  }
  .item :global(svg) {
    fill: currentcolor;
    height: 24px;
    width: 24px;
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
  .no-matches {
    margin: 5px 0px;
    padding: 0px 7px;
  }
</style>

<div class="items-list" bind:this={listEl}>
  {#if !items.length} 
    <p class="no-matches">No matching commands...</p>
  {/if}
  {#each items as item, index}
    <p
      class="item"
      class:selected={index == selectedIndex}
      on:mousedown={e => clickedIndex(e, index)}>
      {#if !!item.icon}
        {@html item.icon}
      {:else}
	{#if item.icon !== null}
            <svg fill="#000000" class="cp-placeholder" height="24" width="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"></svg>
        {/if}
      {/if}
      <span>{item.name}</span>
      {#if !!item.shortcut}
        <kyb>{item.shortcut}</kyb>
      {:else}
        <span />
      {/if}
    </p>
  {/each}
</div>
