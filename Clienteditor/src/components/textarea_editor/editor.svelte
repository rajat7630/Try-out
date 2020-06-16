<script>
  import MenuList from "./menu_list.svelte";
  import { onMount, afterUpdate, beforeUpdate, tick } from "svelte";
  export let solutionData;
  export let data;
  let description = data;
  const onInput = (function onInput() {
    let timer;
    return e => {
      timer = setTimeout(() => {
        description = document.getElementById("texteditor").innerHTML;
        solutionData(description);
      }, 10);
    };
  })();
  function ChangeData() {
    document.getElementById("texteditor").innerHTML = description;
  }
</script>

<style>
  .boxsize {
    height: 40vh;
  }
  ::-webkit-scrollbar {
    width: 0;
    display: none;
  }
</style>

<svelte:window on:click={onInput} />
<div class="flex-col">
  <div>
    <MenuList />
  </div>
  <div class="">
    <div
      use:ChangeData
      id="texteditor"
      on:keyup={onInput}
      on:mouseup={onInput}
      contenteditable
      class="w-full bg-dark boxsize text-elight overflow-auto text-2xl border
      border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
      focus:border-white resize-none" />
  </div>
</div>
