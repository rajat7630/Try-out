<script>
  export let total = 18;
  export let changePage;
  export let currPage = 1;
  export let pageSize;
  let currLength = Math.ceil(total / pageSize);
</script>

<div class="flex text-gray-700 ">
  <div class="mx-auto flex">
    <div
      on:click={() => {
        if (currPage - 1 >= 1) {
          changePage(currPage - 1);
        }
      }}
      class="h-12 w-12 mr-1 flex justify-center items-center rounded-full
      bg-gray-200 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-left w-6 h-6">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </div>
    <div class="flex h-12 font-medium rounded-full bg-gray-200">
      {#each [1, 2] as index}
        {#if index < currPage}
          <div
            on:click={() => {
              changePage(index);
            }}
            class="w-12 md:flex justify-center items-center hidden
            cursor-pointer leading-5 transition duration-150 ease-in
            rounded-full ">
            {index}
          </div>
        {/if}
      {/each}
      {#if currPage > 3 && currLength > 4}
        <div
          class="w-12 md:flex justify-center items-center hidden cursor-pointer
          leading-5 transition duration-150 ease-in rounded-full ">
          ...
        </div>
      {/if}
      <div
        class="w-12 md:flex justify-center items-center hidden cursor-pointer
        leading-5 transition duration-150 ease-in rounded-full bg-teal-600
        text-white ">
        {currPage}
      </div>
      {#if currPage < currLength - 2 && currLength > 4}
        <div
          class="w-12 md:flex justify-center items-center hidden cursor-pointer
          leading-5 transition duration-150 ease-in rounded-full ">
          ...
        </div>
      {/if}
      {#each [currLength - 1, currLength] as index}
        {#if index > currPage}
          <div
            on:click={() => {
              changePage(index);
            }}
            class="w-12 md:flex justify-center items-center hidden
            cursor-pointer leading-5 transition duration-150 ease-in
            rounded-full ">
            {index}
          </div>
        {/if}
      {/each}
    </div>
    <div
      on:click={() => {
        if (currPage + 1 <= currLength) {
          changePage(currPage + 1);
        }
      }}
      class="h-12 w-12 ml-1 flex justify-center items-center rounded-full
      bg-gray-200 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-right w-6 h-6">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  </div>
</div>
