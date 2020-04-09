<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query, mutate, subscribe } from "svelte-apollo";
  import Navbar from "../components/navbar.svelte";
  import InputWindow from "../inputTest.svelte";
  export let currentRoute;

  let problemInitial = {
    id:currentRoute.namedParams.id,
    problemName: "",
    description: "",
    problemTests: "",
    difficultyLevel: ""
  };
  const client = getClient();
  async function clickHandler() {
    console.log(problem);
    try {
      await mutate(client, {
        mutation: apolloClient.updateProblem,
        variables: problemInitial
      });
      location.replace("http://localhost:5000/admin");
    } catch (err) {
      console.log(err);
    }
  }
  const problem = subscribe(client, {
    query: apolloClient.getProblemById,
    variables: { id: currentRoute.namedParams.id }
  });
  $problem.then(res => {
    let tt = res.data.problemById;
    problemInitial.problemName = tt.problemName;
    problemInitial.description = tt.description;
    problemInitial.difficultyLevel = tt.difficultyLevel;
    problemInitial.problemTests = tt.problemTests;
  });
  function handleInputChange(val) {
    problemInitial.problemTests = val;
  }
</script>

<style>
  .savebutton {
    margin-left: 80vw;
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
  .mainbox {
    margin-top: 2vh;
    padding: 3vh;
  }
  .insidebox {
    padding: 3vh;
  }
  .headingpage {
    align: center;
    padding-top: 2vh;
  }
  .headingtext {
    width: 100vw;
    text-align: center;
    font-size: 3vh;
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />

<Navbar />

<!-- style="margin-left:23%;margin-top:7%; -->
<div class="flex justify-between items-center pb-3 headingpage">
  <p class="headingtext text-2xl font-bold">Add New Problem</p>
</div>
<div class="p-8 mx-56 mt-24 items-center mainbox">
  <div class="w-auto rounded overflow-hidden shadow-lg insidebox">
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/5">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name">
          Problem Name
        </label>
      </div>
      <div class="md:w-3/5">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
          w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
          focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          bind:value={problemInitial.problemName}
          placeholder="Problem Name" />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/5">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-username">
          Problem Description
        </label>
      </div>
      <div class="md:w-3/5">
        <textarea
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
          w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
          focus:bg-white focus:border-purple-500"
          id="inline-username"
          type="text-area"
          bind:value={problemInitial.description}
          placeholder="Problem Statement" />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/5">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-username">
          Test Cases
        </label>
      </div>
      <div class="md:w-3/5">
        <!-- <textarea
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
          w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
          focus:bg-white focus:border-purple-500"
          id="inline-username"
          type="text-area"
          bind:value={problem.problemTests}
          placeholder="eg : [1,3]" /> -->
        <InputWindow inputChange={handleInputChange} inputVal={problemInitial.problemTests} />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/5">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-username">
          Difficulty Type
        </label>
      </div>
      <div class="md:w-3/5">
        <label class="inline-flex items-center">
          <input
            type="radio"
            class="form-radio"
            name="difficultyType"
            bind:group={problemInitial.difficultyLevel}
            value="easy" />
          <span class="ml-2 text-gray-500">Easy</span>
        </label>
        <label class="inline-flex items-center ml-6">
          <input
            type="radio"
            class="form-radio"
            bind:group={problemInitial.difficultyLevel}
            name="difficultyType"
            value="medium" />
          <span class="ml-2 text-gray-500">Medium</span>
        </label>
        <label class="inline-flex items-center ml-6">
          <input
            type="radio"
            class="form-radio"
            name="difficultyType"
            bind:group={problemInitial.difficultyLevel}
            value="hard" />
          <span class="ml-2 text-gray-500">Hard</span>
        </label>
      </div>
    </div>

  </div>
</div>
<div class="flex pt-2">
  <button
    on:click={clickHandler}
    class="px-4 bg-transparent savebutton p-3 rounded-lg text-indigo-500
    hover:bg-gray-100 hover:text-indigo-400 mr-2">
    Save
  </button>
</div>
