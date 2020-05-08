<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let items = [];
  export let selectedIndex = 0;

  function clickedIndex(e, hoverIndex) {
    const isPrimaryButton = e.which === 1;
    if (!isPrimaryButton) {
      return;
    }
    dispatch("clickedIndex", hoverIndex);
  }
</script>

<style>
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    margin: 0px;
    padding: 7px;
  }
  .item:hover {
    background-color: rgb(24, 94, 173);
    cursor: pointer;
  }
  .selected {
    background-color: rgb(26, 77, 134);
  }
  kyb {
    background: #353535;
    color: #e2e2e2;
    padding: 1px 4px;
    border-radius: 6px;
    border-bottom: 2px solid #7b7b7b;
    font-family: monospace;
  }
</style>

<div>
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
