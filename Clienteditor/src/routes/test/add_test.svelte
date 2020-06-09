<script>
  import SubNavbar from "./test_navbar.svelte";
  import SelectPage from "./select_page.svelte";
  import TestInitials from "./test_initials.svelte";
  import TestProblems from "./select_problems.svelte";
  $: pageNum = 1;
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
  }
  .problembox {
    @apply mx-auto max-w-6xl rounded-lg p-8 my-10 shadow;
    background-color: white;
    color: black;
  }
  :global(body.dark-mode) .problembox {
    @apply mx-auto max-w-6xl rounded-lg p-8 my-10 shadow;
    background-color: #2d393f;
    color: white;
  }
</style>

<div class="flex flex-col">
  <!-- <header>
    <subheader>
      <SubNavbar position={pageNum} />
    </subheader>
  </header> -->
  <main class=" flex-grow ">
    <!-- <SelectPage {pageNum} class="h-full" /> -->
    <div class="problembox">
      <TestInitials />
    </div>
    <div>
      <TestProblems />
    </div>
  </main>
  <!-- <footer class=" footer my-8 w-full px-20 mx-auto sticky">
    <div class="flex-1 ">
      <button
        id="prevbutton"
        on:click={() => {
          if (pageNum === 1) {
            return;
          }
          pageNum--;
          console.log(pageNum);
        }}
        class="py-4 px-6 float-left shadow-md no-underline rounded-full bg-dark
        text-white font-sans font-semibold text-sm border-white btn-primary
        hover:text-white text-xl hover:bg-elight focus:outline-none
        active:shadow-none mr-2">
        Prev
      </button>
    </div>
    <div class="flex-1">
      <button
        id="nextbutton"
        on:click={() => {
          if (pageNum === 2) {
            return;
          }
          pageNum++;
          console.log(pageNum);
        }}
        class="py-4 px-6 shadow-md text-xl float-right no-underline rounded-full
        bg-dark text-white font-sans font-semibold text-sm border-white
        btn-primary hover:text-dark hover:bg-elight focus:outline-none
        active:shadow-none mr-2">
        Next
      </button>
    </div>
  </footer> -->
</div>
