<script>
  import Navbar from "../../components/navbar.svelte";
  import SubNavbar from "./problem_navbar.svelte";
  import SelectPage from "./select_page.svelte";
  import { apolloClient } from "../../apolloClient.js";
  import { getClient, query, mutate, subscribe } from "svelte-apollo";
  import { problemStore } from "./problem_store.js";
  export let currentRoute;
  console.log(currentRoute);
  $: pageNum = 1;
  const client = getClient();
  const problem = query(client, {
    query: apolloClient.getProblemById,
    variables: { id: currentRoute.namedParams.id }
  });
  $problem.then(res => {
    let tt = res.data.problemById;
    console.log(tt);
    $problemStore.problemName = tt.problemName;
    $problemStore.description = tt.description;
    $problemStore.problemTests = JSON.parse(tt.problemTests);
    $problemStore.tags = tt.tags;
    $problemStore.datalimit = tt.datalimit;
    $problemStore.timelimit = tt.timelimit;
    $problemStore.solution = tt.solution;
  });
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
</style>

<div class="w-screen bg-edark h-screen flex flex-col">
  <header>
    <subheader>
      <SubNavbar position={pageNum} />
    </subheader>
  </header>
  {#await $problem}
    Loading...
  {:then res}
    <main class=" mx-auto w-full flex-grow overflow-auto">
      <SelectPage {pageNum} class="h-full" {currentRoute} />
    </main>
  {:catch err}
    Err: {err}
  {/await}
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
