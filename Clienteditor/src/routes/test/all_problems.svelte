<script>
  import { apolloClient } from "../../apolloClient.js";
  import { getClient, query, subscribe, mutate } from "svelte-apollo";
  export let addProblem;
  import Pagination from "./pagination.svelte";
  const client = getClient();
  let problemSearch = "";
  let pageNumber = 1;
  let pageSize = 6;
  const searchProblems = query(client, {
    query: apolloClient.getSearchProblems,
    variables: {
      search: "",
      page: pageNumber,
      pageSize: pageSize
    }
  });
  function changePageNumber(page) {
    console.log(page);
    pageNumber = parseInt(page);
  }

  $: searchProblems.refetch({
    search: problemSearch,
    page: pageNumber,
    pageSize: pageSize
  });
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
  }
  .problemheight {
    height: 30vh;
  }
  .pageWidth {
    max-width: 20vw;
  }
</style>

<link
  href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Rubik&display=swap"
  rel="stylesheet" />

<link
  rel="stylesheet"
  href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
  integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
  crossorigin="anonymous" />

<div class="w-full mt-2">
  <div>
    <input
      class="rounded-full w-full text-xl bg-white border py-3 px-4 mb-5 shadow
      rounded text-black outline-none"
      type="text"
      placeholder="Enter a problem name"
      bind:value={problemSearch}
      on:keypress={() => changePageNumber(1)} />
  </div>
  {#await $searchProblems}
    Loading...
  {:then res}
    <div class="problemheight overflow-auto mb-3">
      {#each res.data.searchProblems.problems as prob}
        <div class="flex mb mt-3 text-xl">
          <div class="w-9/12">
            <div
              class="rows bg-dark rounded-full p-2 px-4 mx-2 text-white text-xl
              px-3">
              <a
                href="http://localhost:5000/problem/{prob.id}"
                class="no-underline px-3 text-elight">
                {prob.problemName}
              </a>
            </div>
          </div>
          <div class="w-3/12">
            <div class="rows ">
              <button
                on:click={() => {
                  let proble = { problemName: prob.problemName, id: prob.id };
                  addProblem(proble);
                }}
                class="w-3/4 bg-dark outline-none text-white rounded-full p-2
                px-4 mx-2">
                <i class="far fa-plus-square" />
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div class="mx-auto w-full pageWidth mt-2">
      <Pagination
        changePage={changePageNumber}
        currPage={pageNumber}
        {pageSize}
        total={res.data.searchProblems.total} />
    </div>
  {:catch err}
    Error: {err}
  {/await}
</div>
