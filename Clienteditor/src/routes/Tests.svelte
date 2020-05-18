<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query, mutate } from "svelte-apollo";
  import Navbar from "../components/navbar.svelte";
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
      location.replace("http://localhost:5000/admin");
    } catch (err) {
      Error: -{ err };
    }
  }
</script>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />
<body>
  <style>
    ::-webkit-scrollbar {
      width: 0px;
    }
    .savebutton {
      @apply text-white ml-4 outline-none px-4;
    }
    .statement {
      height: 50vh;
    }
    .labels {
      @apply text-elight text-2xl;
    }
    .outer_box {
      @apply p-3 flex-1 border-solid border-dark border-2 rounded;
    }
    .rows {
      @apply mx-auto text-xl text-elight;
    }
    .boxheight2 {
      max-height: 385px;
    }
  </style>
  <link
    href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
    rel="stylesheet" />

  <div class="bg-edark h-full flex flex-col box-border">
    <header>
      <Navbar />
    </header>
    {#await $test}
      Loading...
    {:then result}
      <div class="bg-edark flex flex-col max-w-full overflow-auto">
        <div class="mx-auto mt-8 max-w-full flex flex-col">
          <div class="font-bold text-2xl text-elight mx-auto">
            {result.data.testById.testName}
          </div>
          <div class=" text-xl text-elight mx-auto">
            Time Limit :- {result.data.testById.timelimit} ms
          </div>
          <div class=" text-xl text-elight mx-auto">
            Difficulty :- {result.data.testById.difficultyLevel}
          </div>
        </div>
        <div class="bg-dark max-w-full mt-12 mx-64">

          <div class="outer_box flex-col h-full">
            <div class="mx-auto mb-4 w-32">
              <h1 class="labels">Problems</h1>
            </div>
            <div class="flex-col">
              <div class="flex mb-6">
                <div class="w-10/12">
                  <div class="rows mx-4">Problem Name</div>
                </div>
                <div class="w-2/12">
                  <div class="rows mx-4">Score</div>
                </div>
              </div>
              <div class="boxheight2 flex flex-col flex-grow overflow-auto">
                {#each JSON.parse(result.data.testById.problems) as prob}
                  <div class="flex pb-3">
                    <div class="w-10/12">
                      <div class="rows bg-edark rounded-full p-2 px-4 mx-2">
                        <a
                          href="http://localhost:5000/problem/{prob.problem.id}"
                          class="no-underline px-3 text-elight">
                          {prob.problem.problemName}
                        </a>
                      </div>
                    </div>
                    <div class="w-2/12">
                      <div class="rows bg-edark rounded-full">
                        <div
                          type="string"
                          class=" mx-auto w-10 outline-none text-white p-2">
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
            <button
              on:click={() => {
                location.replace(`http://localhost:5000/edittest/${currentRoute.namedParams.id}`);
              }}
              class="savebutton hover:bg-white hover:text-edark font-bold py-2
              px-4 border rounded">
              Edit
            </button>
            <button
              on:click={deleteTestHandler}
              class="savebutton hover:bg-white hover:text-edark font-bold py-2
              px-4 border rounded">
              Delete
            </button>
            <button
              on:click={() => {
                location.replace(`http://localhost:5000/sendtest/${currentRoute.namedParams.id}`);
              }}
              class="savebutton hover:bg-white hover:text-edark font-bold py-2
              px-4 border rounded">
              Send Test
            </button>
          </div>
        </div>
      </div>
      <div class=" flex-grow align-bottom relative mx-64">
        <div class="flex bottom-0 absolute w-auto">
          {#each result.data.testById.tags.split('#') as tag, index}
            {#if index !== 0}
              <div
                class="text-white border-solid border-2 mr-4 mb-10 border-white
                rounded-full p-2 px-4 ">
                {tag}
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
