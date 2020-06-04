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
  let pageSize = 5;
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
  }
  .btun {
    background-color: #008cba;
    color: white;
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
    backdrop-filter: blur(0.25rem);
    height: calc(100% - 6rem);
  }

  .problems {
    @apply flex-grow;
    margin-bottom: 4vh;
    height: 60vh;
  }

  .problem {
    @apply mb-2;
  }
  .problem-search {
    @apply appearance-none w-full bg-white border py-3 px-4 mb-5 shadow rounded text-black;
    background-color: #efefef;
    width: 86%;
  }
  .problem__name {
    @apply font-bold flex w-full justify-between items-center;
  }
  .problem__type {
    @apply rounded-lg text-white text-xs font-semibold px-5 py-2 bg-teal-500;
  }
  .card-problem {
    border-radius: 25px;
    background-position: left top;
    background-repeat: repeat;
    padding: 15px;
    background-color: #dae0e2;
    margin-bottom: 10px;
  }

  :global(body.dark-mode) .card-problem {
    border-radius: 25px;
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
      @apply overflow-y-auto;
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

<div class="flex flex-col items-center">
  <div id="problem-switcher">
    <header class="w-full text-center flex flex-col justify-end md:px-16">
      <h2 class="text-3xl day font-semibold mb-6">All Tests:</h2>
      <div class="px-2 w-full flex">
        <input
          class="problem-search rounded-full w-9/12 mr-3"
          id="problem-search"
          name="problem-search"
          style="width:86%"
          type="text"
          placeholder="Enter a Test name"
          on:keypress={() => changePageNumber(1)}
          bind:value={testSearch} />
        <a
          href="/newTest"
          class="add-btn btun rounded-full px-2 mb-5 shadow-2xl w-3/12"
          style="padding: 13px 22px">
          &nbsp; &nbsp; Add Test&nbsp; &nbsp;
        </a>

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
              class="card-problem {'cursor-pointer'} shadow opacity-75">
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
