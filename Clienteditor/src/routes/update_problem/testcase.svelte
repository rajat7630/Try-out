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
  export let currentRoute;
  console.log(currentRoute);
  const client = getClient();
  console.log($problemStore);
  let editor;
  onMount(() => {
    ace.config.set("basePath", "ace-builds/src-noconflict/");
    editor = ace.edit("editor");
    editor.setOptions({
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
    var pos = editor.session.selection.toJSON();
    editor.session.setValue($problemStore.problemTests);
    editor.session.selection.fromJSON(pos);
  });

  const onInput = (function onInput() {
    let timer;
    return e => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        $problemStore.problemTests = editor.getValue();
      }, 500);
    };
  })();

  async function submitData() {
    let problemValue = {
      id: parseInt(currentRoute.namedParams.id),
      problemName: $problemStore.problemName,
      description: $problemStore.description,
      problemTests: JSON.stringify($problemStore.problemTests),
      tags: $problemStore.tags,
      solution: $problemStore.solution,
      timelimit: $problemStore.timelimit,
      datalimit: $problemStore.datalimit
    };
    console.log(problemValue);
    const res = await mutate(client, {
      mutation: apolloClient.updateProblem,
      variables: problemValue
    });
    location.replace("http://localhost:5000/admin");
  }
</script>

<style>
  .editor {
    font-size: 1.4rem;
    height: 40vh;
    border-bottom: solid 2px #25282c;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
</style>

<div class="mx-64 flex-grow editor_window box-border">
  <h1 class="text-2xl text-elight mt-3 my-2">Enter TestCases</h1>

  <div
    id="editor"
    class="editor mx-60 box-border flex-grow"
    on:keydown={onInput} />
  <div class="my-3 flex justify-center">
    <button
      on:click={e => {
        submitData();
      }}
      class="bg-dark hover:bg-elight hover:text-edark outline-none text-white
      font-bold py-4 px-4 text-xl rounded-full">
      Submit
    </button>
  </div>
</div>
