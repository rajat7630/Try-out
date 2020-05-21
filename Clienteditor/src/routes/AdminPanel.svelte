<script>
  import Sidebar from "../components/Side.svelte";
  import Navbar from "../components/navbar.svelte";
  import Loader from "../components/Loader.svelte";
  import Error from "../components/Error.svelte";
  import { onMount } from "svelte";
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query } from "svelte-apollo";
  import Pubnub from "./pubnub.svelte";
  const client = getClient();
  const searchProblems = query(client, {
    query: apolloClient.getSearchProblems,
    variables: {
      search: ""
    }
  });
  const searchTests = query(client, {
    query: apolloClient.getSearchTests,
    variables: {
      search: ""
    }
  });
   const searchAttempts = query(client, {
    query: apolloClient.getSearchAttempts,
    variables: {
      search: ""
    }
  });

  function addProblem() {
    location.replace("http://localhost:5000/newProblem");
  }

  function addTest() {
    location.replace("http://localhost:5000/newTest");
  }

  export let currentRoute;
  console.log(currentRoute);

  let problemSearch = "";
  let testSearch = "";
  let attemptSearch = ""

  $: searchProblems.refetch({
    search: problemSearch
  });

  $: searchTests.refetch({
    search: testSearch
  });

   $: searchAttempts.refetch({
    search: attemptSearch
  });

  function timeConverter(timestamp) {
      let dateObj = new Date(timestamp * 1000);
      let year = dateObj.getUTCFullYear().toString();
      let b = dateObj.getUTCDay()
      let month = dateObj.getUTCMonth().toString();
      let day = dateObj.getUTCDate().toString();

      let hours = dateObj.getUTCHours();  
      let minutes = dateObj.getUTCMinutes(); 
      let seconds = dateObj.getUTCSeconds(); 
      let formattedTime = day + '/'+ month + '/' + year + ' '+hours.toString().padStart(2, '0') + ':' +  
                minutes.toString().padStart(2, '0') + ':' +  
                seconds.toString().padStart(2, '0'); 
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
    float: right;
    padding: 13px 9px;
    font-size: 15px;
    text-decoration: none;
    cursor: pointer;
  }

  #problem-switcher-container {
    @apply flex flex-col items-center;
  }
  #problem-switcher {
    @apply mt-6 flex-grow flex flex-col text-white px-2;
    min-width: 50vw;
    max-width: 720px;
    backdrop-filter: blur(0.25rem);
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

<Navbar />
<Sidebar />

{#if currentRoute.name === '/admin'}
  <div id="problem-switcher-container">

    <div id="problem-switcher">
      <header
        class="w-full text-center flex flex-col justify-end py-3 md:px-16"
        style="min-height: 234px;">
        <h2 class="text-xl day font-semibold mt-4 mb-6">All Problems:</h2>
        <div class="px-4">
          <a
            on:click={addProblem}
            class="add-btn btun rounded-full px-2 shadow-2xl">
            &nbsp; Add Prob. &nbsp;
          </a>
          <input
            class="problem-search rounded-full"
            id="problem-search"
            name="problem-search"
            style= "width:86%"
            type="text"
            placeholder="Enter a problem name"
            bind:value={problemSearch} />

        </div>
      </header>

      {#await $searchProblems}
        <Loader />
      {:then res}
        <div class="problems flex flex-col text-black">
          {#each res.data.searchProblems as problem}
            <div
              id="problem-{problem.id}"
              on:click={() => {
                window.location = `/problem/${problem.id}`;
              }}
              class="card-problem {'cursor-pointer'}">
              <p class="problem__name">
                {problem.problemName}
                <span class="text-xs font-normal italic lowercase">
                  {problem.tags}
                </span>
              </p>
              <div class="flex w-full justify-between items-center mt-4">
                <span class="problem__type">
                  TimeLimit :{problem.timelimit} ms
                </span>
                <div class="text-xs ml-8">
                  <span class="font-bold">
                    {timeConverter(problem.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:catch error}
        <Error {error} />
      {/await}
    </div>
  </div>
{:else if currentRoute.name === '/showtests'}
  <div id="problem-switcher-container">

    <div id="problem-switcher">
      <header
        class="w-full text-center flex flex-col justify-end py-3 md:px-16"
        style="min-height: 234px;">
        <h2 class="text-xl day font-semibold mt-4 mb-6">All Tests:</h2>
        <div class="px-2">
          <a
            on:click={addTest}
            class="add-btn btun rounded-full px-2 shadow-2xl"
            style="padding: 13px 22px">
            &nbsp; &nbsp; Add Test&nbsp; &nbsp;
          </a>
          <input
            class="problem-search rounded-full"
            id="problem-search"
            name="problem-search"
            style= "width:86%"
            type="text"
            placeholder="Enter a Test name"
            bind:value={testSearch} />

        </div>
      </header>

      {#await $searchTests}
        <Loader />
      {:then res}
        <div class="problems flex flex-col text-black">
          {#each res.data.searchTests as test}
            <div
              id="problem-{test.id}"
              on:click={() => {
                window.location = `/test/${test.id}`;
              }}
              class="card-problem {'cursor-pointer'}">
              <p class="problem__name">
                {test.testName}
                <span class="text-xs font-normal italic lowercase">
                  {test.tags}
                </span>
              </p>
              <div class="flex w-full justify-between items-center mt-4">
                <span class="problem__type">TimeLimit :{test.timelimit} min</span>
                <div class="text-xs ml-8">
                  <span class="font-bold">
                    {timeConverter(test.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:catch error}
        <Error {error} />
      {/await}
    </div>
  </div>
{:else if currentRoute.name === '/showresults'}
  <div id="problem-switcher-container">

    <div id="problem-switcher">
      <header
        class="w-full text-center flex flex-col justify-end py-3 md:px-16"
        style="min-height: 234px;">
        <h2 class="text-xl day font-semibold mt-4 mb-6">Scoreboard:</h2>
        <div class="px-4">
          <input
            class="problem-search rounded-full"
            id="problem-search"
            name="problem-search"
            style= "width:100%"
            type="text"
            placeholder="Enter a user name"
            bind:value={attemptSearch} />
        </div>
      </header>

      {#await $searchAttempts}
        <Loader />
      {:then res}
        <div class="problems flex flex-col text-black">
          {#each res.data.searchAttempt as attempt}
            <div
              id="problem-{attempt.id}"
              class="card-problem">
              <p class="problem__name">
                {attempt.user.name}
                <span class="text-xs font-normal italic lowercase">
                  {attempt.user.collegeName}
                </span>
              </p>
              <div class="flex w-full justify-between items-center mt-4">
                <span class="problem__type">
                  Score :{attempt.score}
                </span>
                <div class="text-xs ml-8">
                  <span class="font-bold">
                    {timeConverter(attempt.attemptTime)}
                  </span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:catch error}
        <Error {error} />
      {/await}
    </div>
  </div>
{/if}
<Pubnub />
