<script>
  import Navbar from "../../components/navbar.svelte";
  import Sidebar from "../../components/Side.svelte";
  import SubNavbar from "./problem_navbar.svelte";
  import SelectPage from "./select_page.svelte";
  $: pageNum = 1;
</script>

<style>

</style>

<div class="w-screen h-screen flex flex-col">
  <header>
    <Navbar />
    <subheader>
      <SubNavbar position={pageNum} />
    </subheader>
  </header>
  <main class=" mx-auto w-full flex-grow overflow-auto">
    <SelectPage {pageNum} class="h-full" />
  </main>
  <footer class=" footer my-8 w-full px-20 mx-auto sticky">
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
          if (pageNum === 4) {
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
  </footer>
</div>
