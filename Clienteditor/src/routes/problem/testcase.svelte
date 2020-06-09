<script>
  import { onMount, afterUpdate, beforeUpdate } from "svelte";
  import "ace-builds";
  import "ace-builds/src-noconflict/ext-language_tools.js";
  import "ace-builds/src-noconflict/snippets/text.js";
  import "ace-builds/src-noconflict/snippets/javascript.js";
  import "ace-builds/src-noconflict/mode-javascript.js";
  import "ace-builds/src-noconflict/theme-tomorrow_night.js";
  import { problemStore } from "./problem_store.js";
  import { apolloClient } from "../../apolloClient.js";
  import { getClient, query, subscribe, mutate } from "svelte-apollo";
  const client = getClient();
  console.log($problemStore);
  let testeditor;
  onMount(() => {
    ace.config.set("basePath", "ace-builds/src-noconflict/");
    testeditor = ace.edit("testeditor");
    testeditor.setOptions({
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

  afterUpdate(() => {
    var pos = testeditor.session.selection.toJSON();
    testeditor.session.setValue($problemStore.problemTests);
    testeditor.session.selection.fromJSON(pos);
  });

  const onInput = (function onInput() {
    let timer;
    return e => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        $problemStore.problemTests = testeditor.getValue();
      }, 500);
    };
  })();

  async function submitData() {
    let problemValue = {
      problemName: $problemStore.problemName,
      description: $problemStore.description,
      problemTests: JSON.stringify($problemStore.problemTests),
      tags: $problemStore.tags,
      solution: $problemStore.solution,
      timelimit: $problemStore.timelimit,
      datalimit: $problemStore.datalimit,
      email: $problemStore.email
    };
    console.log(problemValue);
    const res = await mutate(client, {
      mutation: apolloClient.addProblem,
      variables: problemValue
    });
    location.replace("http://localhost:5000/admin");
  }
</script>

<style>
  .problembox {
    @apply mx-auto max-w-6xl rounded-lg p-8 my-10 shadow;
    background-color: white;
    color: black;
  }
  :global(body.dark-mode) .problembox {
    @apply mx-auto max-w-6xl rounded-lg p-8 my-10 shadow;
    background-color: #2d393f;
    color: white;
  }
  .testeditor {
    font-size: 1.4rem;
    height: 40vh;
    border-bottom: solid 2px #25282c;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
</style>

<div
  class="problembox mx-auto max-w-6xl flex-grow testeditor_window box-border">
  <h1 class="text-2xl text-elight mt-3 my-2">Enter TestCases</h1>

  <div
    id="testeditor"
    class="testeditor mx-60 box-border flex-grow"
    on:keydown={onInput} />

</div>
<div class="my-3 mb-20 flex justify-center">
  <button
    on:click={e => {
      submitData();
    }}
    class="bg-dark hover:bg-elight hover:text-edark outline-none text-white
    font-bold py-4 px-4 text-xl rounded-full">
    Submit
  </button>
</div>
