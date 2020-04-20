<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query, subscribe, mutate } from "svelte-apollo";
  import Navbar from "../components/navbar.svelte";
  export let currentRoute;
  let testInitial = {
    id: "",
    testName: "",
    difficultyLevel: "",
    problems: []
  };
  const client = getClient();
  const test = subscribe(client, {
    query: apolloClient.getTestById,
    variables: { id: currentRoute.namedParams.id }
  });
  $: ppp = [];
  let test_id;
  $test.then(res => {
    const tt = { ...res.data.testById };
    testInitial.testName = tt.testName;
    testInitial.id = tt.id;
    testInitial.difficultyLevel = tt.difficultyLevel;
    testInitial.problems = [
      ...tt.problems.map(ele => {
        ppp = [...ppp, ele.problemName];
        return ele.id;
      })
    ];
  });
  const Problems = subscribe(client, { query: apolloClient.getProblems });
  async function clickHandler() {
    console.log(testInitial);
    if (
      testInitial.testName === "" ||
      testInitial.difficultyLevel === "" ||
      testInitial.problems.length === 0
    ) {
      return false;
    }
    try {
      await mutate(client, {
        mutation: apolloClient.updateTest,
        variables: testInitial
      });
    } catch (err) {
      console.log(err);
    }
    location.replace("http://localhost:5000/admin");
  }
  function changeHandler(name) {
    console.log(ppp.length, name);
    let rr = ppp.length;
    ppp = [
      ...ppp.filter(ele => {
        return ele !== name;
      })
    ];
    if (rr === ppp.length) {
      ppp = [...ppp, name];
    }
  }
</script>

<style>
  .problist {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 20vh;
  }
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
  button {
    margin-left: 92%;
  }
  #blk {
    margin-top: 6%;
    margin-left: 10%;
    margin-right: 6%;
  }
  .heading {
    width: 100%;
    padding: 1vh;
    text-align: center;
    font-size: 4vh;
    margin-top: 2vh;
  }
  .buttonbox {
    position: relative;
    align-content: center;
    margin: 0;
  }
  .submitbutton {
    float: right;
    position: relative;
    margin-right: 5vw;
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />
<body>
  <div>
    <Navbar />
    <!-- style="margin-left:23%;margin-top:7%; -->
    <h1 class="heading">
      <strong>Add New Test</strong>
    </h1>
    <div class="flex mb-4 h-12">
      <div class="w-1/2 h-12">

        <div class="p-8 mx-2 mt-5 items-center">
          <div class="max-w-auto rounded overflow-hidden shadow-lg">
            <div class="px-12 py-8">

              <br class="my-24" />

              <div class="flex">
                <div class="flex-initial text-center px-4 py-2 m-2">
                  <div class="font-bold text-3xl mb-2">
                    <input
                      type="text"
                      bind:value={testInitial.testName}
                      placeholder="Enter Test Name..." />
                  </div>
                </div>
              </div>
              <br />
              <div class="flex">
                <div class="flex-initial text-center px-4 py-2 m-2">
                  <div class="font-bold text-3xl mb-2">
                    <div class=" md:items-center mb-6">
                      <div class="md:w-2/3">
                        <label
                          class="block text-gray-500 font-bold md:text-right
                          mb-1 md:mb-0 pr-4"
                          for="inline-username">
                          Difficulty Type
                        </label>
                      </div>
                      <div class="">
                        <label class="inline-flex items-center">
                          <input
                            type="radio"
                            class="form-radio"
                            name="difficultyType"
                            bind:group={testInitial.difficultyLevel}
                            value="easy" />
                          <span class="ml-2 text-gray-500">Easy</span>
                        </label>
                        <label class="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            class="form-radio"
                            name="difficultyType"
                            bind:group={testInitial.difficultyLevel}
                            value="medium" />
                          <span class="ml-2 text-gray-500">Medium</span>
                        </label>
                        <label class="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            class="form-radio"
                            name="difficultyType"
                            bind:group={testInitial.difficultyLevel}
                            value="hard" />
                          <span class="ml-2 text-gray-500">Hard</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <p class="font-bold text-2xl mb-2">Problems Added:</p>
              <ul class="problist">
                {#each ppp as p}
                  <li class="text-xl mb-2">{p}</li>
                {/each}
              </ul>

            </div>

          </div>
        </div>

      </div>
      <div class="w-1/2 h-12">
        <div class="p-8 mx-2 mt-5 items-center">
          <div class="max-w-auto rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
              <div class="flex">
                <div class="flex-initial text-center px-4 py-2 m-2">
                  <div class="font-bold text-3xl mb-2">All Problems</div>
                </div>
              </div>
              <ol>
                {#await $Problems}
                  Loading...
                {:then result}
                  {#each result.data.allProblems as prob}
                    <label>
                      <li>
                        <!-- <a href="http://localhost:5000/problem/{prob.id}"> -->
                        <input
                          type="checkbox"
                          bind:group={testInitial.problems}
                          on:change={changeHandler(prob.problemName)}
                          value={prob.id} />
                        {prob.problemName}
                        <!-- </a> -->
                      </li>
                    </label>
                  {/each}
                {:catch err}
                  Error: {err}
                {/await}
              </ol>
            </div>
          </div>
        </div>
        <div class="buttonbox">
          <button
            on:click={clickHandler}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
            border border-blue-700 rounded submitbutton">
            Save
          </button>
        </div>
      </div>
    </div>

  </div>
</body>
