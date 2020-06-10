<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query, mutate } from "svelte-apollo";
  import { Navigate } from "svelte-router-spa";
  export let currentRoute;
  console.log(currentRoute);

  const client = getClient();
  const test = query(client, {
    query: apolloClient.getTestById,
    variables: { id: parseInt(currentRoute.namedParams.id) }
  });
  $test.then(res => {
    console.log(res);
  });
  async function deleteTestHandler() {
    try {
      await mutate(client, {
        mutation: apolloClient.deleteTest,
        variables: { id: currentRoute.namedParams.id }
      });
      location.replace("http://localhost:5000/admin/showtests");
    } catch (err) {
      Error: -{ err };
    }
  }
</script>

<style>
  .savebutton {
    @apply ml-4 outline-none px-4;
  }
  .edit {
    @apply bg-green-400;
  }
  :global(body.dark-mode) .edit {
    background-color: #2d393f;
  }
  .delete {
    @apply bg-red-400;
  }
  :global(body.dark-mode) .delete {
    background-color: #2d393f;
  }
  .share {
    @apply bg-blue-400;
  }
  :global(body.dark-mode) .share {
    background-color: #2d393f;
  }
  .statement {
    height: 50vh;
  }
  .labels {
    @apply text-2xl;
  }
  .outer_box {
    @apply p-3 flex-1 rounded;
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
    --color-l: #1b262c;
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

  <div class="bg-edark h-full flex flex-col">

    {#await $test}
      Loading...
    {:then result}
      <div class="bg-edark flex flex-col max-w-full overflow-auto ">
        <div class="mx-auto mt-8 max-w-full flex flex-col">
          <div class="font-bold text-2xl text-elight mx-auto">
            Test Name : {result.data.testById.testName}
          </div>
          <div class=" text-xl text-elight mx-auto">
            Time Limit : {result.data.testById.timelimit} ms
          </div>
          <div class=" text-xl text-elight mx-auto">
            Difficulty : {result.data.testById.difficultyLevel}
          </div>
        </div>
        <div class="bg-dark max-w-full mt-12 mx-64 rounded">

          <div class="outer_box flex-col h-full">
            <div class="mx-auto mb-4 w-32">
              <h1 class="tag labels">Problems</h1>
            </div>
            <div class="flex-col">
              <div class="flex mb-6">
                <div class="w-10/12">
                  <div class="tag rows mx-4">Problem Name</div>
                </div>
                <div class="w-2/12">
                  <div class="tag rows mx-4">Score</div>
                </div>
              </div>
              <div class="boxheight2 flex flex-col flex-grow overflow-auto">
                {#each JSON.parse(result.data.testById.problems) as prob}
                  <div class="flex pb-3">
                    <div class="w-10/12">
                      <div class="rows bg-edark rounded-full p-2 px-4 mx-2">
                        <a
                          href="/problem/{prob.problem.id}"
                          class="no-underline px-3 text-elight">
                          {prob.problem.problemName}
                        </a>
                      </div>
                    </div>
                    <div class="w-2/12">
                      <div class="rows bg-edark rounded-full">
                        <div
                          type="string"
                          class="text-elight mx-auto w-10 outline-none p-2">
                          {prob.score}
                        </div>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-6xl my-4 mb-32 flex flex-col mx-auto">
          <div class="float-right ">
            <Navigate to="/edittest/{currentRoute.namedParams.id}">
              <button
                class="text-white px-4 w-auto h-12 edit rounded-full
                hover:bg-green-700 active:shadow-lg mouse shadow transition
                ease-in duration-200 focus:outline-none">
                <i class="fas fa-edit" />
                <span>Edit</span>
              </button>
            </Navigate>
            <button
              on:click={deleteTestHandler}
              class="text-white px-4 w-auto h-12 delete rounded-full
              hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in
              duration-200 focus:outline-none">
              <i class="fas fa-trash-alt" />
              <span>Delete</span>
            </button>
            <Navigate to="/sendtest/{currentRoute.namedParams.id}">
              <button
                class="text-white px-4 w-auto h-12 share rounded-full
                hover:bg-blue-700 active:shadow-lg mouse shadow transition
                ease-in duration-200 focus:outline-none">
                <i class="fas fa-share-square" />
                <span>Send</span>
              </button>
            </Navigate>

          </div>
        </div>
      </div>
      <div class=" flex-grow align-bottom relative mx-64">
        <div class="flex bottom-0 absolute w-auto">
          {#each result.data.testById.tags.split('#') as tag, index}
            {#if index !== 0}
              <div
                class="tag border-solid border-2 mr-4 mb-10 rounded-full p-2
                px-4 ">
                #{tag}
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {:catch err}
      Error : {err}
    {/await}
  </div>
</body>
