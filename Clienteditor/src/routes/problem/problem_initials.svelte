<script>
  import { apolloClient } from "../../apolloClient.js";
  import Loader from "./loader.svelte";
  import { getClient, query, subscribe, mutate } from "svelte-apollo";
  import { problemStore } from "./problem_store.js";
  console.log($problemStore);
  let alert =
    "*Name must be in capital letters with no space in between and no special characters";
  const tagList = [
    "Choose Tags",
    "Dynamic_Programming",
    "Mathematics",
    "Binary_Search",
    "Graph",
    "Algorithm",
    "Data_Structure",
    "Trees"
  ];
  const client = getClient();
  $: uniqueNameStatus = 0;

  let selectedTags = [];
  selectedTags = [
    ...$problemStore.tags.split("#").filter((__Directive, index) => {
      return index !== 0;
    })
  ];
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

    $problemStore.tags = hastTagString;
  }
  function newTagHandler(tag) {
    selectedTags = [...selectedTags, tag];
    hastTagString = "";
    console.log(selectedTags);
    $problemStore.tags = "";
    selectedTags.forEach(tag => {
      $problemStore.tags += "#" + tag;
    });
  }

  const onInput = (function checkIfAvailable() {
    let timer;
    return e => {
      timer = setTimeout(async () => {
        uniqueNameStatus = 2;
        const res = await mutate(client, {
          mutation: apolloClient.checkIfAvailable,
          variables: { problemName: $problemStore.problemName }
        });
        console.log(res);
        if (res.data.checkProblemIfExists.success === false) {
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
    @apply text-lg text-elight ml-3;
  }

  .unitinput {
    @apply ml-6 p-2 mb-3 text-lg bg-elight text-edark rounded;
  }
  .status {
    @apply text-elight text-6xl px-3 flex;
  }
</style>

<div class="mx-auto flex-col flex-grow">
  <div class="text-edark mx-auto max-w-6xl w-full">
    <div>
      <label class="text-elight text-2xl my-3">
        Enter a unique Problem code
      </label>
      <div class="flex">
        <div class=" flex-col w-full">
          <div class="w-full">
            <input
              on:keydown={onInput}
              bind:value={$problemStore.problemName}
              type="search"
              name="serch"
              placeholder="Enter Problem Name"
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
        <h2 class="labels text-2xl">Other Details</h2>
      </div>
      <div>
        <div>
          <label class="labels">Enter Time limit</label>
          <input
            bind:value={$problemStore.timelimit}
            class="unitinput"
            type="text"
            placeholder="in milli seconds" />
          <span class="unit">ms</span>
        </div>
        <div>
          <label class="labels">Enter Memory limit</label>
          <input
            bind:value={$problemStore.datalimit}
            class="unitinput"
            type="text"
            placeholder="in Mbs" />
          <span class="unit">Mb</span>
        </div>

        <div>
          <label class="labels">Add Tags</label>

          <div
            class="w-full border-2 border-solid border-gray flex px-5 py-2
            rounded-full">
            <div class="flex overflow-auto tagwidth ">
              {#each selectedTags as tag, ind}
                <div
                  class="flex text-white border-solid border-2 rounded-full p-1 px-3 text-l">
                  {tag}
                  <div
                    class="px-2 cursor-pointer"
                    on:click={() => {
                      selectedTags = [...selectedTags.filter((__, index) => {
                          return ind !== index;
                        })];
                      hastTagString = '';
                      $problemStore.tags = '';
                      selectedTags.forEach(tag => {
                        $problemStore.tags += '#' + tag;
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
                  $problemStore.tags = '';
                  selectedTags.forEach(tag => {
                    $problemStore.tags += '#' + tag;
                  });
                }
              }}
              type="text"
              class="outline-none bg-transparent text-white ml-3 w-full"
              bind:value={hastTagString} />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
