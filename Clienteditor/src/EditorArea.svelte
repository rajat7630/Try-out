<script>
  import EditorWindow from "./EditorWindow.svelte";
  import { dataStore } from "./store.js";
  import { cookieHandler } from "./helperFunctions/cookie_handler.js";
  import { apolloClient } from "./apolloClient.js";
  import { mutate, getClient } from "svelte-apollo";
  import { onMount, afterUpdate, beforeUpdate } from "svelte";
  import "ace-builds";
  import "ace-builds/src-noconflict/ext-language_tools.js";
  import "ace-builds/src-noconflict/snippets/text.js";
  import "ace-builds/src-noconflict/snippets/javascript.js";
  import "ace-builds/src-noconflict/mode-javascript.js";
  import "ace-builds/src-noconflict/theme-tomorrow_night.js";
  import { currentTab } from "./store";
  let dragging = false;
  $: height = "40vh";
  const client = getClient();
  let inputeditor;
  let result = "";
  onMount(() => {
    ace.config.set("basePath", "ace-builds/src-noconflict/");
    inputeditor = ace.edit("inputeditor");
    inputeditor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      highlightActiveLine: true,
      showPrintMargin: false,
      theme: "ace/theme/tomorrow_night",
      mode: "ace/mode/javascript",
      enableLiveAutocompletion: true,
      useWorker: false
    });
  });
  async function runHandler() {
    let ind = 0;
    $dataStore.forEach((ele, index) => {
      if (ele.id === $currentTab.id) {
        ind = index;
        return;
      }
    });
    console.log(ind);
    let code = $dataStore[ind].solution;
    console.log(code);
    console.log(inputeditor.getValue());
    let testCase = inputeditor.getValue();
    let res = `${code} solution(${testCase})`;
    let data = await mutate(client, {
      mutation: apolloClient.checkTimeLimit,
      variables: { data: res, timelimit: $dataStore[ind].timelimit }
    });
    console.log(data);
    if (data.data.checkTimeLimit.success  === true) {
      try {
        result = eval(`${code} solution(${testCase})`);
      } catch (err) {
        result = err;
      }
    } else {
      result = "Timelimit Exceeded";
    }
  }

  async function sendSolution(data) {
    let solutions = {
      id: parseInt(cookieHandler.getCookie("attempt_id")),
      u_id: parseInt(cookieHandler.getCookie("user_id")),
      solutions: JSON.stringify(data)
    };
    console.log(solutions);
    try {
      await mutate(client, {
        mutation: apolloClient.updateAttempt,
        variables: solutions
      });
      location.replace("http://localhost:5000/thankyou");
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style>
  .output {
    background-color: #1d1f21;
    color: white;
    min-height: 30vh;
    font-size: 2rem;
  }
  .question {
    border-left: solid 46px #25282c;
    color: white;
    background-color: #1d1f21;
    font-size: 1.4rem;
  }
  .mainDiv {
    height: 94.9%;
  }

  .sizechanger {
    background: #25282c;
  }
</style>

<svelte:window
  on:keydown={e => {
    if (!e.altKey || e.key !== 'r') {
      return;
    }
    e.preventDefault();
    runHandler();
  }} />
<div
  class="mainDiv flex flex-col"
  on:mousemove={evt => {
    if (dragging) {
      height = `${100 * ((document.body.clientHeight - evt.clientY) / document.body.clientHeight)}vh`;
    }
  }}
  on:mouseup={() => {
    dragging = false;
  }}>
  <!-- {#if $currentTab.changeData}
    <NewProblem />
  {:else}
  {/if} -->
  <h1 class="question px-3 py-3">{$currentTab.description}</h1>
  <EditorWindow />
  <div
    class="w-full bg-gray-800 sizechanger cursor-move text-bg-600 flex
    justify-center text-3xl h-3"
    style="line-height: 1px; cursor: ns-resize;"
    on:mousedown={evt => {
      dragging = true;
    }} />
  <div class="output" id="outputid" style="height:{height}">

    <div class="flex my-4 p-2 border-solid border-2 border-black">
      <div class="flex-1 mr-4 box-border">
        <h2 class="text-xl text-white my-3 my-2">Input</h2>
        <div class="flex-grow h-48 box-border">
          <div
            id="inputeditor"
            class="inputeditor text-xl h-full box-border " />
        </div>
      </div>
      <div class="flex-1 ml-4">
        <h2 class="text-xl text-white my-3 my-2 box-border">Output</h2>
        <div class="flex-grow h-48">
          <textarea
            bind:value={result}
            class=" h-full w-full bg-gray-900 text-white text-xl box-border
            border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none
            resize-none"
            id="message"
            readonly />
        </div>
      </div>
    </div>
    <div class="float-left ml-10 text-xl">
      <button
        class="bg-black hover:bg-white hover:text-black mr-10 outline-none
        text-white float-right py-2 px-4 rounded-full"
        on:click={() => {
          console.log(JSON.stringify($dataStore));
          sendSolution($dataStore);
        }}>
        Submit
      </button>
      <button
        on:click={e => {
          runHandler(e);
        }}
        class="bg-black hover:bg-white hover:text-black mr-10 outline-none
        text-white float-right py-2 px-4 rounded-full">
        Run
      </button>
    </div>
  </div>
</div>
