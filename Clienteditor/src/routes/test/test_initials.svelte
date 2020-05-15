<script>
  import { apolloClient } from "../../apolloClient.js";
  import Loader from "./loader.svelte";
  import { getClient, query, subscribe, mutate } from "svelte-apollo";
  import { testStore } from "./test_store.js";
  console.log($testStore);
  let alert =
    "*Name must be in capital letters with no space in between and no special characters";
  const tagList = [
    "Choose Tags",
    "Java",
    "Nodejs",
    "Angular",
    "Fresher",
    "Devops",
    "Technical_architect"
  ];
  const client = getClient();
  $: uniqueNameStatus = 0;

  let selectedTags = [];
  let hastTagString = "";
  function changeHandler(indexValue) {
    console.log(selectedTags.length, indexValue);
    let rr = selectedTags.length;
    selectedTags = [
      ...selectedTags.filter(ele => {
        return ele !== indexValue;
      })
    ];
    if (rr === selectedTags.length) {
      selectedTags = [...selectedTags, indexValue];
    }
    hastTagString = "";
    selectedTags.forEach(ind => {
      hastTagString += "#" + tagList[ind];
    });
    $testStore.tags = hastTagString;
  }

  const onInput = (function checkIfAvailable() {
    let timer;
    return e => {
      timer = setTimeout(async () => {
        uniqueNameStatus = 2;
        const res = await mutate(client, {
          mutation: apolloClient.checkTestIfAvailable,
          variables: { testName: $testStore.testName }
        });
        console.log(res);
        if (res.data.checkTestIfExists.success === false) {
          uniqueNameStatus = 1;
        } else {
          uniqueNameStatus = 3;
        }
      }, 30);
    };
  })();
</script>

<style>
  .labels {
    @apply text-elight text-2xl mb-3;
  }
  .unit {
    @apply text-2xl text-elight ml-3;
  }

  .unitinput {
    @apply ml-6 p-2 mb-3 text-xl bg-elight text-edark rounded;
  }
  .status {
    @apply text-elight text-6xl px-3 flex;
  }
</style>

<div class="mx-auto flex-col flex-grow">
  <div class="text-edark mx-auto max-w-5xl w-full">
    <div>
      <label class="text-elight text-2xl my-3">Enter a unique Test code</label>
      <div class="flex">
        <div class=" flex-col w-full">
          <div class="w-full">
            <input
              on:keydown={onInput}
              bind:value={$testStore.testName}
              type="search"
              name="serch"
              placeholder="Search"
              class="bg-elight h-10 px-5 pr-10 rounded-full w-full text-xl
              tet-edark focus:outline-none" />
          </div>
          <div>
            <p class="text-white text-sm my-2">{alert}</p>
          </div>
        </div>
        <div class="ml-3">
          {#if uniqueNameStatus === 2}
            <Loader />
          {/if}
          {#if uniqueNameStatus === 1}
            <i class="material-icons status">&#xe876;</i>
          {/if}
          {#if uniqueNameStatus === 3}
            <span class="status material-icons">clear</span>
          {/if}
        </div>
      </div>
    </div>
    <div class="border-solid border-2 mt-6 border-light p-4">
      <div>
        <h2 class="labels text-3xl">Other Details</h2>
      </div>
      <div>
        <div>
          <label class="labels">Enter Time limit</label>
          <input
            bind:value={$testStore.timelimit}
            class="unitinput"
            type="text"
            placeholder="in minutes" />
          <span class="unit">minutes</span>
        </div>
        <div class="flex">
          <div>
            <label class="labels">Select Difficulty Level</label>
            <input
              bind:group={$testStore.difficultyLevel}
              class="unitinput"
              type="radio"
              value="Easy" />
            <span class="unit text-2xl">Easy</span>
            <input
              bind:group={$testStore.difficultyLevel}
              class="unitinput"
              type="radio"
              value="Medium" />
            <span class="unit text-2xl">Medium</span>
            <input
              bind:group={$testStore.difficultyLevel}
              class="unitinput"
              type="radio"
              value="Difficult" />
            <span class="unit text-2xl">Difficult</span>
          </div>
        </div>
        <div>
          <label class="labels">Add Tags</label>
          <div class="flex-col flex">
            <select
              class="unitinput outline-none w-64"
              on:change={e => {
                console.log(e.target.value);
                if (parseInt(e.target.value) === 0) {
                  return;
                }
                changeHandler(parseInt(e.target.value));
              }}>
              {#each tagList as tag, index}
                <option
                  class="text-xl px-2 text-edark"
                  name={tag}
                  value={index}>
                  {tag}
                </option>
              {/each}
            </select>
            <input
              type="text"
              class="unitinput"
              bind:value={$testStore.tags}
              readonly />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
