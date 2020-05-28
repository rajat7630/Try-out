<script>
  import { testStore } from "./test_store.js";
  import { apolloClient } from "../../apolloClient.js";
  import { getClient, query, subscribe, mutate } from "svelte-apollo";
  const client = getClient();
  let problemScore = JSON.parse($testStore.problems);
  import AllProblems from "./all_problems.svelte";
  function addingProblem(prob) {
    let res = false;
    problemScore.forEach(problem => {
      if (problem.problem.id === prob.id) {
        res = true;
      }
    });
    if (res) {
      return;
    }
    problemScore = [...problemScore, { problem: prob, score: "" }];
    $testStore.problems = JSON.stringify(problemScore);
  }

  function removeProblem(id) {
    console.log(id);
    problemScore = [
      ...problemScore.filter(problem => {
        return parseInt(problem.problem.id) !== parseInt(id);
      })
    ];
    $testStore.problems = JSON.stringify(problemScore);
  }

  async function submitHandler() {
    $testStore.problems = JSON.stringify(problemScore);
    let test = {
      testName: $testStore.testName,
      tags: $testStore.tags,
      problems: $testStore.problems,
      timelimit: $testStore.timelimit,
      difficultyLevel: $testStore.difficultyLevel,
      email: "Sample@gmail.com"
    };
    console.log(test);
    try {
      await mutate(client, {
        mutation: apolloClient.addTest,
        variables: test
      });
      location.replace("http://localhost:5000/showtests");
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
  }
  .statement {
    height: 50vh;
  }
  .labels {
    @apply text-elight text-2xl;
  }
  .outer_box {
    @apply p-3 flex-1 border-solid mx-24 border-dark border-2;
  }
  .rows {
    @apply mx-auto  text-xl text-elight;
  }
  .boxheight {
    height: 405px;
  }
  .boxheight2 {
    height: 385px;
  }
</style>

<div>
  <div class="max-w-full mx-auto flex statement mb-4 ">
    <div class="flex mx-3 w-full mb-6 h-full">
      <div class="outer_box flex-col h-full">
        <div class="mx-auto w-64 mb-4">
          <h1 class="labels">Selected Problems</h1>
        </div>
        <div class="flex-col">
          <div class="flex mb-6">
            <div class="w-9/12">
              <div class="rows mx-4">Problem Name</div>
            </div>
            <div class="w-3/12">
              <div class="rows mx-4">Score</div>
            </div>
          </div>
          <div class="boxheight2 flex flex-col overflow-auto">
            {#each problemScore as problem}
              <div class="flex pb-3">
                <div class="w-9/12">
                  <div class="rows bg-dark rounded-full p-2 px-4 mx-2">
                    {problem.problem.problemName}
                  </div>
                </div>
                <div class="w-2/12">
                  <div class="rows ">
                    <input
                      on:change={() => {
                        $testStore.problems = JSON.stringify(problemScore);
                      }}
                      type="string"
                      class="w-3/4 bg-dark outline-none text-white rounded-full
                      p-2 px-4 mx-2"
                      bind:value={problem.score} />
                  </div>
                </div>
                <div class="w-1/12">
                  <div class="rows ">
                    <button
                      on:click={() => {
                        return removeProblem(problem.problem.id);
                      }}
                      class="w-3/4 bg-dark outline-none text-white rounded-full
                      p-2 px-4 mx-2">
                      X
                    </button>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      <div class="outer_box flex-wrap h-full">
        <div class="mx-auto w-64 pb-2 flex flex-col">
          <h1 class="labels">Select Problems</h1>
        </div>
        <div class=" pb-4 max-w-full flex flex-col">
          <AllProblems addProblem={addingProblem} />
        </div>
      </div>
    </div>
  </div>
  <div class="mt-10 flex justify-center">
    <button
      on:click={e => {
        submitHandler();
      }}
      class="bg-dark hover:bg-elight hover:text-edark outline-none text-white
      font-bold py-4 px-4 text-xl rounded-full">
      Submit
    </button>
  </div>
</div>
