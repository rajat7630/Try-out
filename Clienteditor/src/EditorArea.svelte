<script>
  import EditorWindow from "./EditorWindow.svelte";
  import { dataStore } from "./store.js";
  import { cookieHandler } from "./helperFunctions/cookie_handler.js";
  import { apolloClient } from "./apolloClient.js";
  import { mutate, getClient } from "svelte-apollo";
  // import NewProblem from "./newProblem.svelte";
  import { currentTab } from "./store";
  let outputData = "";
  let outputCheck = "";
  let dragging = false;
  $: height = "40vh";
  const client = getClient();
  function runHandler() {
    // fetch("http://localhost:5000/result/" + $currentTab.id, {
    //   method:"GET"
    // })
    // .then(res=>{
    //   return res.json();
    // })
    // .then(data=>{
    //   outputData=data.output;
    //   outputCheck=data.answer;
    // })
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
  .title {
    font-size: 1.5rem;
  }
  .sizechanger {
    background: #25282c;
  }

  .runButton {
    padding: 0 2vw 0 2vw;
    margin-left: 90%;
    margin-top: 2vh;
    outline: none;
    font-size: 1.4rem;
  }
  .runButton:active {
    outline: none;
    border: white;
    background: #1d1f21;
  }
  .outputValue {
    font-size: 1.2rem;
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
    <button
      class="runButton"
      on:click={() => {
        console.log(JSON.stringify($dataStore))
        sendSolution($dataStore);
      }}>
      Submit
    </button>
    <h2 class="text-3xl text-center title">Output</h2>
    <div class="flex-1 text-gray-700 text-center px-4 py-2 outputValue">
      {outputData}
    </div>
    <div class="flex-1 text-gray-700 text-center px-4 py-2 outputValue">
      {outputCheck}
    </div>
  </div>
</div>
