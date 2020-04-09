<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query, mutate } from "svelte-apollo";
  import Navbar from "../components/navbar.svelte";
  import InputWindow from "../inputTest.svelte";
  export let currentRoute;
  console.log(currentRoute);

  const client = getClient();
  const problem = query(client, {
    query: apolloClient.getProblemById,
    variables: { id: currentRoute.namedParams.id }
  });
  async function deleteProblemHandler() {
    try {
      console.log("ddd");
      mutate(client, {
        mutation: apolloClient.deleteProblem,
        variables: { id: currentRoute.namedParams.id }
      });
      console.log("hp");
      location.replace("http://localhost:5000/admin");
    } catch (err) {
      Error: -{ err };
    }
  }
</script>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }

  .buttonbox {
    margin-top: 2vh;
    margin-left: 50vw;
  }
  .deleteButton {
    margin-left: 1.5vw;
  }
  #blk {
    margin-top: 6%;
    margin-left: 10%;
    margin-right: 6%;
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />

<Navbar />

<!-- style="margin-left:23%;margin-top:7%; -->
{#await $problem}
  Loading...
{:then result}
  <div class="p-8 mx-56 mt-24 items-center">
    <div class="w-auto rounded overflow-hidden shadow-lg">
      <div class="px-12 py-8">
        <div class="font-bold text-3xl mb-2">
          {result.data.problemById.problemName}
        </div>
        <br class="my-24" />
        <p class="text-gray-700 text-2xl">
          {result.data.problemById.description}
        </p>
        <br class="my-24" />
        <div class="text-xl mb-2 font-bold pointer-events-none">
          Test Cases :
          <InputWindow inputVal={result.data.problemById.problemTests} />
          <!-- {JSON.parse(result.data.problemById.problemTests)} -->

        </div>
        <br class="my-24" />

        <div class="text-xl mb-2 font-bold">Output :</div>
      </div>
    </div>
    <div class="px-4 py-2">
      <div class="flex buttonbox">
        <button
          on:click={() => {
            location.replace(`http://localhost:5000/editProblem/${currentRoute.namedParams.id}`);
          }}
          class="savebutton bg-red-500 hover:bg-red-700 text-white font-bold
          py-2 px-4 border border-red-700 rounded">
          Edit
        </button>
        <button
          on:click={deleteProblemHandler}
          class="deleteButton bg-red-500 hover:bg-red-700 text-white font-bold
          py-2 px-4 border border-red-700 rounded">
          Delete
        </button>
      </div>
    </div>
  </div>
{:catch err}
  Error : {err}
{/await}
