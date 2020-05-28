<script>
  import Loader from "../../components/Loader.svelte";
  import Error from "../../components/Error.svelte";
  import { onMount } from "svelte";
  import { apolloClient } from "../../apolloClient.js";
  import { getClient, query } from "svelte-apollo";
  import Pagination from "./pagination.svelte";
  const client = getClient();
  let pageNumber = 1;
  let pageSize = 6;
  const searchAttempts = query(client, {
    query: apolloClient.getSearchAttempts,
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
  let attemptSearch = "";

  $: searchAttempts.refetch({
    search: attemptSearch,
    page: pageNumber,
    pageSize: pageSize
  });

  function timeConverter(timestamp) {
    let dateObj = new Date(timestamp * 1000);
    let year = dateObj.getUTCFullYear().toString();
    let b = dateObj.getUTCDay();
    let month = dateObj.getUTCMonth().toString();
    let day = dateObj.getUTCDate().toString();

    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getUTCSeconds();
    let formattedTime =
      day +
      "/" +
      month +
      "/" +
      year +
      " " +
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    return formattedTime;
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
    <header class=" text-center flex flex-col justify-end py-3">
      <h2 class="text-3xl day font-semibold mb-6">Scoreboard:</h2>
      <div class="px-4">
        <input
          class="problem-search rounded-full w-full"
          id="problem-search"
          name="problem-search"
          on:keypress={() => changePageNumber(1)}
          style="width:100%"
          type="text"
          placeholder="Enter a user name"
          bind:value={attemptSearch} />
      </div>
    </header>

    {#await $searchAttempts}
      <Loader />
    {:then res}
      <div class="problems flex flex-col text-black">
        {#each res.data.searchAttempt.attempts as attempt}
          <div id="problem-{attempt.id}" class="card-problem">
            <p class="problem__name">
              {attempt.user.name}
              <span class="text-xs font-normal italic lowercase">
                {attempt.user.collegeName}
              </span>
            </p>
            <div class="flex w-full justify-between items-center mt-4">
              <span class="problem__type">Score: {attempt.score}</span>
              <div class="text-xs ml-8">
                <span class="font-bold">
                  {timeConverter(attempt.attemptTime)}
                </span>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="items-center mx-auto max-w-6xl">
        <Pagination
          changePage={changePageNumber}
          currPage={pageNumber}
          {pageSize}
          total={res.data.searchAttempt.total} />
      </div>
    {:catch error}
      <Error {error} />
    {/await}
  </div>

</div>
