<script>
  export let items = [];
  export let selectedIndex = 0;
</script>

<style>
p {
  color: white;
  margin: 0px;
  padding: 7px;
}
.selected {
  background-color: rgb(26, 77, 134);
}
</style>

<div>
  {#each items as item, index}
    <p class:selected={index == selectedIndex}>{item.name}</p>
  {/each}
</div>
