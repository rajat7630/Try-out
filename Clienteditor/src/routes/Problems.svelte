<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query, mutate } from "svelte-apollo";
  import Navbar from "../components/navbar.svelte";
  import InputWindow from "../inputTest.svelte";
  import { Navigate } from "svelte-router-spa";
  export let currentRoute;
  import { onMount } from "svelte";
  console.log(currentRoute);
  const client = getClient();
  const problem = query(client, {
    query: apolloClient.getProblemById,
    variables: { id: parseInt(currentRoute.namedParams.id) }
  });
  let description;
  let eeeditor;
  $problem.then(data => {
    console.log(data);
    description = data.data.problemById.description;
  });
  async function deleteProblemHandler() {
    try {
      console.log("ddd");
      mutate(client, {
        mutation: apolloClient.deleteProblem,
        variables: { id: parseInt(currentRoute.namedParams.id) }
      });
      console.log("hp");
      location.replace("http://localhost:5000/admin/showproblems");
    } catch (err) {
      Error: -{ err };
    }
  }
  function EditorInput() {
    document.getElementById("description").innerHTML = description;
  }
</script>

<style>
  .savebutton {
    @apply ml-4 outline-none px-4;
  }
  .edit {
    @apply bg-blue-500;
  }
  :global(body.dark-mode) .edit {
    background-color: #2d393f;
  }
  .delete {
    @apply bg-red-500;
  }
  :global(body.dark-mode) .delete {
    background-color: #2d393f;
  }
  .statement {
    height: 50vh;
  }
  .labels {
    @apply text-2xl;
  }
  .outer_box {
    @apply p-3 flex-1 border-solid  border-2 rounded;
  }
  .rows {
    @apply mx-auto text-xl;
  }
  .boxheight2 {
    max-height: 385px;
  }
  body {
    --color-ed: #ebe9e9;
    --color-d: white;
    --color-l: #106270;
    --color-el: #3c7380;
  }
  :global(body.dark-mode) body {
    --color-ed: #1b262c;
    --color-d: #2d393f;
    --color-l: #303030;
    --color-el: #77abb7;
  }
  .tag {
    color: black;
  }
  :global(body.dark-mode) .tag {
    color: white;
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

<body>
  <div class="bg-edark h-full flex flex-col box-border">

    {#await $problem}
      Loading...
    {:then result}
      <div class="bg-edark rounded flex flex-col max-w-full overflow-auto p-16">
        <div class="mx-auto max-w-xl flex flex-col">
          <div class="font-bold text-2xl text-elight mx-auto">
            Problem Name : {result.data.problemById.problemName}
          </div>
          <div class=" text-xl text-elight mx-auto">
            Data Limit : {result.data.problemById.datalimit} Mb
          </div>
          <div class=" text-xl text-elight mx-auto">
            Time Limit : {result.data.problemById.timelimit} ms
          </div>
        </div>
        <div class="bg-dark rounded max-w-full mt-12 mx-64">

          <div class="shadow-lg rounded">
            <div class="px-12 py-8">
              <div class="w-full h-full px-3 flex flex-col">
                <label class=" text-2xl text-elight mb-3 my-2">
                  Description
                </label>
                <div
                  use:EditorInput
                  class=" w-full bg-edark flex-grow text-elight text-2xl border
                  rounded py-3 px-4 mb-3 leading-tight "
                  id="description"
                  readonly />
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
                <p class="text-xl text-elight">
                  {result.data.problemById.tags}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-6xl my-4 mb-32 flex flex-col mx-auto">
          <div class="float-right ">

            <Navigate to="/editProblem/{currentRoute.namedParams.id}">
              <button
                class="text-white px-4 w-auto h-12 edit rounded-full
                hover:bg-blue-700 active:shadow-lg mouse shadow transition
                ease-in duration-200 focus:outline-none">
                <i class="fas fa-edit" />
                <span>Edit</span>
              </button>
            </Navigate>

            <button
              on:click={deleteProblemHandler}
              class="text-white px-4 w-auto h-12 delete rounded-full
              hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in
              duration-200 focus:outline-none">
              <i class="fas fa-trash-alt" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    {:catch err}
      Error : {err}
    {/await}
  </div>

</body>
