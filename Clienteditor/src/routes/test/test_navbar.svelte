<script>
  export let position = 1;
  let content = [1, 2];
  let activeCircle =
    "w-16 h-16 text-dark bg-elight  mx-auto rounded-full text-lg flex items-center";
  let activeBar =  `w-full bg-elight rounded items-center
            align-middle align-center flex-1`;
</script>

<div class="max-w-2xl mx-auto py-4 my-4 pb-4">
  <div class="flex pb-3">
    <div class="flex-1" />
    {#each content as index}
      <div class="flex-1">
        <div
          class={index <= position ? activeCircle : 'w-16 h-16  bg-light text-white border-2 mx-auto rounded-full text-lg flex items-center'}>
          <span class="text-center w-full text-2xl">{index}</span>
        </div>
      </div>
      {#if index !== content.length}
        <div
          class="w-1/3 align-center items-center align-middle content-center
          flex">
          <div
            class={index < position ? activeBar : 'w-full text-grey-darkest  bg-light rounded items-center align-middle align-center flex-1'}>
            <div class=" text-xs leading-none py-1 text-center rounded " />
          </div>
        </div>
      {/if}
    {/each}

    <div class="flex-1" />
  </div>

  <div class="flex text-xs content-center text-center">
    <div class="w-1/2 flex-1 text-xl text-elight ">Test Initials</div>

    <div class="w-1/2 flex-1 text-xl text-elight">Select Problems</div>
  </div>
</div>
