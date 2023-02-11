<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<style>
  .mobile-button {
    position: fixed;
    left: 5px;
    bottom: 5px;
    margin: 0px;
    padding: 0px;
    background: none;
    border-radius: 2px;
    backface-visibility: hidden;
  }
  .mobile-button:focus {
    box-shadow: none;
    background: none;
  }
  .mobile-button:hover {
    box-shadow: none;
    background: none;
  }
  .mobile-button:active {
    box-shadow: none;
    background: none;
    transform: translateY(2px);
  }
  .mobile-button > svg {
    width: 44px;
    height: 44px;
    display: block;
  }
</style>

<button class="mobile-button" on:click={e => dispatch('click')} title="Click here to open command palette">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    version="1.1">
    <g transform="translate(0 -1028.4)">
      <path
        d="m3 1030.4c-1.1046 0-2 0.9-2 2v7 2 7c0 1.1 0.8954 2 2 2h9 9c1.105 0
        2-0.9 2-2v-7-2-7c0-1.1-0.895-2-2-2h-9-9z"
        fill="#2c3e50" />
      <path
        d="m3 2c-1.1046 0-2 0.8954-2 2v3 3 1 1 1 3 3c0 1.105 0.8954 2 2 2h9
        9c1.105 0 2-0.895 2-2v-3-4-2-3-3c0-1.1046-0.895-2-2-2h-9-9z"
        transform="translate(0 1028.4)"
        fill="#34495e" />
      <path
        d="m4 5.125v1.125l3 1.75-3 1.75v1.125l5-2.875-5-2.875zm5
        4.875v1h5v-1h-5z"
        transform="translate(0 1028.4)"
        fill="#ecf0f1" />
    </g>
  </svg>
</button>
