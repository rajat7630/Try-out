<script>
  import { apolloClient } from "../../apolloClient.js";
  import { getClient, query, subscribe, mutate } from "svelte-apollo";
  export let addProblem;
  const client = getClient();
  const Problems = subscribe(client, { query: apolloClient.getProblems });
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
  }
</style>

<div class="w-full mt-2">
  {#await $Problems}
    Loading...
  {:then result}
    {#each result.data.allProblems as prob}
      <div class="flex mb mt-3 text-xl">
        <div class="w-10/12">
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
        <div class="w-2/12">
          <div class="rows ">
            <button
              on:click={() => {
                let proble = { problemName: prob.problemName, id: prob.id };
                addProblem(proble);
              }}
              class="w-3/4 bg-dark outline-none text-white rounded-full p-2 px-4
              mx-2">
              Add
            </button>
          </div>
        </div>
      </div>
    {/each}
  {:catch err}
    Error: {err}
  {/await}
</div>
