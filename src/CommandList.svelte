<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let items: any = [];
  export let selectedIndex = 0;
  let selectedIndexLast = 0;

  let listEl: HTMLDivElement;

  function clickedIndex(e: any, hoverIndex: number) {
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
    const listItemEl: HTMLDivElement | null = listEl.querySelector(".items-list .selected");
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
    align-items: center;
    justify-content: space-between;
    margin: 0px;
    padding: 0px 7px;
    height: 36px;
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
    /* indicata ability to scroll with edge scroll shadow.
       https://css-scroll-shadows.vercel.app */
    background:
	linear-gradient(#373737 33%, rgba(55,55,55, 0)),
	linear-gradient(rgba(55,55,55, 0), #373737 66%) 0 100%,
	radial-gradient(farthest-side at 50% 0, rgba(255,255,255, 0.5),
			rgba(0,0,0,0)),
	radial-gradient(farthest-side at 50% 100%, rgba(255,255,255, 0.5),
			rgba(0,0,0,0)) 0 100%;
    background-color: #373737;
    background-repeat: no-repeat;
    background-attachment: local, local, scroll, scroll;
    background-size: 100% 72px, 100% 72px, 100% 24px, 100% 24px;
    overflow-y: auto;
    max-height: min(360px, 50vh);
    max-height: min(360px, 80dvh);
    overscroll-behavior: contain;
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
      <span>{item.name}</span>
      {#if !!item.shortcut}
        <kyb>{item.shortcut}</kyb>
      {:else}
        <span />
      {/if}
    </p>
  {/each}
</div>
