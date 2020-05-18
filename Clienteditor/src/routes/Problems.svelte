<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query, mutate } from "svelte-apollo";
  import Navbar from "../components/navbar.svelte";
  import Sidebar from "../components/Side.svelte";
  import InputWindow from "../inputTest.svelte";
  export let currentRoute;
  console.log(currentRoute);
  const client = getClient();
  const problem = query(client, {
    query: apolloClient.getProblemById,
    variables: { id: parseInt(currentRoute.namedParams.id) }
  });
  async function deleteProblemHandler() {
    try {
      console.log("ddd");
      mutate(client, {
        mutation: apolloClient.deleteProblem,
        variables: { id: parseInt(currentRoute.namedParams.id) }
      });
      console.log("hp");
      location.replace("http://localhost:5000/admin");
    } catch (err) {
      Error: -{ err };
    }
  }
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
  }
  .savebutton {
    @apply text-white ml-4 outline-none px-4;
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />

<div class="bg-edark h-full flex flex-col box-border">
  <header>
    <Navbar />
  </header>
  <div class="bg-edark flex flex-col max-w-full overflow-auto">
    {#await $problem}
      Loading...
    {:then result}
      <div class="mx-auto mt-8 max-w-xl flex flex-col">
        <div class="font-bold text-2xl text-elight mx-auto">
          {result.data.problemById.problemName}
        </div>
        <div class=" text-xl text-elight mx-auto">
          Data Limit :- {result.data.problemById.datalimit} Mb
        </div>
        <div class=" text-xl text-elight mx-auto">
          Time Limit :- {result.data.problemById.timelimit} ms
        </div>
      </div>
      <div class="bg-dark max-w-full mt-12 mx-64">

        <div class="rounded shadow-lg">
          <div class="px-12 py-8">
            <div class="w-full h-full px-3 flex flex-col">
              <label class=" text-2xl text-elight mb-3 my-2">Description</label>
              <p class="text-xl text-elight">
                {result.data.problemById.description}
              </p>
            </div>

            <div class="w-full h-full px-3 flex flex-col">
              <label class=" text-2xl text-elight mb-3 my-2">TestCases</label>
              <textarea
                value={JSON.parse(result.data.problemById.problemTests)}
                class=" w-full bg-edark flex-grow text-elight text-2xl border
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                focus:border-white h-48 resize-none"
                id="message"
                readonly />
            </div>
            <div class="flex flex-col w-full h-full px-3">
              <label class=" text-2xl text-elight mb-3 my-2">Solution</label>
              <textarea
                value={result.data.problemById.solution}
                class=" flex-grow w-full bg-edark text-elight text-2xl border
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                focus:border-white h-48 resize-none"
                id="message"
                readonly />
            </div>

            <div class="w-full h-full px-3 flex flex-col">
              <label class=" text-2xl text-elight mb-3 my-2">Tags</label>
              <p class="text-xl text-elight">{result.data.problemById.tags}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-6xl my-4 mb-32 flex flex-col mx-auto">
        <div class="float-right ">
          <button
            on:click={() => {
              location.replace(`http://localhost:5000/editProblem/${currentRoute.namedParams.id}`);
            }}
            class="savebutton hover:bg-white hover:text-edark font-bold py-2
            px-4 border rounded">
            Edit
          </button>
          <button
            on:click={deleteProblemHandler}
            class="savebutton hover:bg-white hover:text-edark font-bold py-2
            px-4 border rounded">
            Delete
          </button>
        </div>
      </div>
    {:catch err}
      Error : {err}
    {/await}
  </div>
</div>
