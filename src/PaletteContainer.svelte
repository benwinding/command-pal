<script lang="ts">
  export let show = false;
</script>

<style>
  .modal-container {
    max-width: 400px;
    margin-top: 0px;
    margin-left: auto;
    margin-right: auto;
    padding: 0px;
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  @media (max-width: 400px) {
    .modal-container {
      max-width: 100%;
    }
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    width: 100%;
  }
  .hidden {
    display: none;
  }

  .search-box {
    padding: 7px;
  }
  /* .search:focus {
  color: white;
} */
</style>

<div class="modal-mask" class:hidden={!show}>
  <div class="modal-wrapper">
    <div class="modal-container">
      <div class="search-box">
        <slot name="search" />
      </div>
      <div>
        <slot name="items" />
      </div>
    </div>
  </div>
</div>
