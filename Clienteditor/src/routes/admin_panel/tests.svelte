<script>
  import Loader from "../../components/Loader.svelte";
  import { Navigate } from "svelte-router-spa";
  import Error from "../../components/Error.svelte";
  import { onMount } from "svelte";
  import { apolloClient } from "../../apolloClient.js";
  import { getClient, query } from "svelte-apollo";
  import Pagination from "./pagination.svelte";
  import moment from "moment";

  const client = getClient();
  let pageNumber = 1;
  let pageSize = 6;
  const searchTests = query(client, {
    query: apolloClient.getSearchTests,
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

  let testSearch = "";
  $: searchTests.refetch({
    search: testSearch,

    page: pageNumber,
    pageSize: pageSize
  });

  function timeConverter(timestamp) {
    let date = moment.unix(timestamp / 1000).format("DD/MM/YYYY HH:mm:ss");
    return date;
  }
</script>

<style>
  :global(body.dark-mode) .btun {
    background-color: #2d393f;
    color: white;
    @apply py-3 px-4 mb-5;
    text-decoration: none;
    cursor: pointer;
  }
  .btun {
    background-color: #008cba;
    color: white;
    @apply py-3 px-4 mb-5;
    text-decoration: none;
    cursor: pointer;
  }
  .add-btn {
    background-color: #008cba;
    color: white;
    @apply py-3 px-4 mb-5;
    text-decoration: none;
    cursor: pointer;
  }

  #problem-switcher {
    @apply flex-grow flex flex-col text-white px-2;
    min-width: 50vw;
    height: calc(100% - 6rem);
  }

  .problems {
    @apply flex-grow;
    margin-bottom: 4vh;
  }

  .problem {
    @apply mb-2;
  }
  .problem-search {
    @apply appearance-none w-full bg-white border py-3 px-4 mb-5 shadow rounded text-black;
    background-color: #ffffff;
    width: 86%;
  }
  .problem__name {
    @apply font-bold flex w-full justify-between items-center;
  }
  .problem__type {
    @apply rounded-lg text-white text-xs font-semibold px-5 py-2 bg-teal-500;
  }
  .card-problem {
    border-radius: 15px;
    background-position: left top;
    background-repeat: repeat;
    padding: 15px;
    background-color: white;
    margin-bottom: 10px;
  }

  :global(body.dark-mode) .card-problem {
    border-radius: 15px;
    background-position: left top;
    background-repeat: repeat;
    padding: 15px;
    background-color: #2d393f;
    margin-bottom: 10px;
  }

  @media (min-width: 720px) {
    #problem-switcher-container {
      @apply h-screen;
    }

    .problems {
      padding-left: 4.5rem;
      padding-right: 3.5rem;
    }
  }
  :global(body.dark-mode) .day {
    color: #bfc2c7;
  }
  .day {
    color: black;
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

<div class="flex flex-col items-center p-6">
  <div id="problem-switcher">
    <header class="w-full flex flex-col justify-end md:px-16">
      <h2
        style="font-family: 'Rubik', sans-serif;"
        class="text-3xl day font-semibold mb-6">
        <i
          class="far fa-file-alt text-blue-500 hover:text-blue-600 transition
          duration-150" />
        &nbsp; ALL TESTS:
      </h2>
      <div class="w-full flex">
        <input
          class="problem-search rounded-lg shadow w-11/12 mr-3"
          id="problem-search"
          name="problem-search"
          style="width:86%"
          type="text"
          placeholder="Enter a Test name"
          on:keypress={() => changePageNumber(1)}
          bind:value={testSearch} />
        <div class="text-xl btun w-1/12 rounded-lg">
          <a
            href="/newTest"
            class="fas fa-folder-plus w-10 mx-auto" />
        </div>

      </div>
    </header>
    {#await $searchTests}
      <Loader />
    {:then res}
      <div class="problems flex flex-col day">
        {#each res.data.searchTests.tests as test}
          <Navigate to="/test/{test.id}">
            <div
              id="problem-{test.id}"
              class="card-problem {'cursor-pointer'} shadow">
              <p class="problem__name">
                {test.testName}
                <span class="text-xs font-normal italic lowercase">
                  {test.tags}
                </span>
              </p>
              <div class="flex w-full justify-between items-center mt-4">
                <span class="problem__type">
                  Time Limit : {test.timelimit} min
                </span>
                <div class="text-xs ml-8">
                  <span class="font-bold">{timeConverter(test.createdAt)}</span>
                </div>
              </div>
            </div>
          </Navigate>
        {/each}
      </div>
      <div class="items-center mx-auto max-w-6xl">
        <Pagination
          changePage={changePageNumber}
          currPage={pageNumber}
          {pageSize}
          total={res.data.searchTests.total} />
      </div>
    {:catch error}
      <Error {error} />
    {/await}

  </div>

</div>
