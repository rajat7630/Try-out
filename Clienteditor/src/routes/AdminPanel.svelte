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
  const attempts = query(client, { query: apolloClient.getAllAttempts });
  const searchProblems = query(client, {
    query: apolloClient.getSearchProblems,
    variables: {
      search: '',
    },
  });
   const searchTests = query(client, {
    query: apolloClient.getSearchTests,
    variables: {
      search: '',
    },
  });

  export let currentRoute;
  console.log(currentRoute);

  let problemSearch = '';
  let testSearch = '';

  $: searchProblems.refetch({
      search: problemSearch,
    });

    $: searchTests.refetch({
      search: testSearch,
    });

</script>

<style>
   .add-btn {
    float: right;
    background-color: #008cba;
    padding: 13px 9px;
    font-size: 15px;
    text-decoration: none;
  }

  #problem-switcher-container {
    @apply flex flex-col items-center;
  }
  #problem-switcher {
    @apply mt-6 flex-grow flex flex-col text-white px-2;
    min-width: 50vw;
    max-width: 720px;
    background-color: #99AAAB;
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
    @apply appearance-none block w-full bg-white border py-3 px-4 mb-5 shadow rounded text-black;
    background-color: #efefef;
    width:86%;
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
  background-color: #DAE0E2;
  margin-bottom:10px;
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
</style>

  <svelte:head>
    <title>Welcome</title>
  </svelte:head>
    <Navbar />
    <Sidebar />

 {#if currentRoute.name === '/admin'}
    <div id="problem-switcher-container">
      
      <div id="problem-switcher">
        <header
          class="w-full text-center flex flex-col justify-end py-3
          md:px-16"
          style="min-height: 234px;">
          <h2 class="text-xl font-semibold mt-4 mb-6 color-blue">
            All Problems:
          </h2>
          <div class="px-2">
          <a href="/newProblem" class="add-btn">Add Problem</a>
            <input
              class="problem-search"
              id="problem-search"
              name="problem-search"
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
                <div
                  class="flex w-full justify-between items-center mt-4">
                  <span class="problem__type">TimeLimit :{problem.timelimit}ms</span>
                  <div class="text-xs ml-8">
                    <span class="font-bold">
                      {new Date(problem.createdAt *1000)}
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
          class="w-full text-center flex flex-col justify-end py-3
          md:px-16"
          style="min-height: 234px;">
          <h2 class="text-xl font-semibold mt-4 mb-6 color-blue">
            All Tests:
          </h2>
          <div class="px-2">
          <a href="/newTest" class="add-btn" style ="padding: 13px 22px">Add Test</a>
            <input
              class="problem-search"
              id="problem-search"
              name="problem-search"
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
                <div
                  class="flex w-full justify-between items-center mt-4">
                  <span class="problem__type">TimeLimit :{test.timelimit}ms</span>
                  <div class="text-xs ml-8">
                    <span class="font-bold">
                      {new Date(test.createdAt *1000)}
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

