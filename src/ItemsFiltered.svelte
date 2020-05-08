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
    dispatch('clickedIndex', hoverIndex);
  }
</script>

<style>
  p {
    color: white;
    margin: 0px;
    padding: 7px;
  }
  p:hover {
    background-color: rgb(24, 94, 173);
    cursor: pointer;
  }
  .selected {
    background-color: rgb(26, 77, 134);
  }
</style>

<div>
  {#each items as item, index}
    <p class:selected={index == selectedIndex} on:mousedown={e => clickedIndex(e, index)}>
      {item.name}
    </p>
  {/each}
</div>
