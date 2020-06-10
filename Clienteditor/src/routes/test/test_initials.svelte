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
  selectedTags = [
    ...$testStore.tags.split("#").filter((__Directive, index) => {
      return index !== 0;
    })
  ];
  function newTagHandler(tag) {
    selectedTags = [...selectedTags, tag];
    hastTagString = "";
    console.log(selectedTags);
    $testStore.tags = "";
    selectedTags.forEach(tag => {
      $testStore.tags += "#" + tag;
    });
  }
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
  ::-webkit-scrollbar {
    width: 0;
    display: none;
  }
  .tagwidth {
    max-width: 80vw;
  }
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
              placeholder="Enter Test Name"
              class="bg-elight h-10 px-5 pr-10 rounded-full w-full text-xl
              tet-edark focus:outline-none" />
          </div>
          <div>
            <p class="text-elight text-sm my-2">{alert}</p>
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
    <div class=" mt-6 p-4">
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
          <div
            class="w-full border-2 border-solid border-gray flex px-5 py-2
            rounded-full">
            <div class="flex overflow-auto tagwidth ">
              {#each selectedTags as tag, ind}
                <div
                  class="flex border-solid text-elight border-2 rounded-full p-1
                  px-3 text-l">
                  {tag}
                  <div
                    class="px-2 text-elight cursor-pointer"
                    on:click={() => {
                      selectedTags = [...selectedTags.filter((__, index) => {
                          return ind !== index;
                        })];
                      hastTagString = '';
                      $testStore.tags = '';
                      selectedTags.forEach(tag => {
                        $testStore.tags += '#' + tag;
                      });
                    }}>
                    x
                  </div>
                </div>
              {/each}
            </div>
            <input
              on:keypress={e => {
                if (e.key === ' ') {
                  console.log(hastTagString);
                  newTagHandler(hastTagString);
                  $testStore.tags = '';
                  selectedTags.forEach(tag => {
                    $testStore.tags += '#' + tag;
                  });
                }
              }}
              type="text"
              class="outline-none bg-transparent text-elight ml-3 w-full"
              bind:value={hastTagString} />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
