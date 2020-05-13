<script>
  import { onMount, afterUpdate, beforeUpdate } from "svelte";
  import "ace-builds";
  import "ace-builds/src-noconflict/ext-language_tools.js";
  import "ace-builds/src-noconflict/snippets/text.js";
  import "ace-builds/src-noconflict/snippets/javascript.js";
  import "ace-builds/src-noconflict/mode-javascript.js";
  import "ace-builds/src-noconflict/theme-tomorrow_night.js";
  import { problemStore } from "./problem_store.js";
  console.log($problemStore);
  let editor;
  let inputeditor;
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

  afterUpdate(() => {
    var pos = editor.session.selection.toJSON();
    editor.session.setValue($problemStore.solution);
    editor.session.selection.fromJSON(pos);
  });
  const onInput = (function onInput() {
    let timer;
    return e => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        $problemStore.solution = editor.getValue();
      }, 500);
    };
  })();
  let result = "";
  function outputData(e) {
    try {
      let code = editor.getValue();
      console.log(code);
      $problemStore.solution = code;
      console.log(editor.getValue());
      let testCase = inputeditor.getValue();
      result = eval(`${code} solution(${testCase})`);
    } catch (err) {
      result = err;
    }
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
  <h1 class="text-2xl text-elight mt-3 my-2">Enter Solution</h1>
  <div
    id="editor"
    class="editor mx-60 box-border flex-grow"
    on:keydown={onInput} />

  <div class="flex my-4 p-2 border-solid h-64 border-2 border-light">
    <div class="flex-1 mr-4 box-border">
      <h2 class="text-xl text-elight my-3 my-2">Input</h2>
      <div class="flex-grow h-48 box-border">
        <div
          id="inputeditor"
          class="inputeditor text-xl h-full box-border "
          on:keydown={onInput} />
      </div>
    </div>
    <div class="flex-1 ml-4">
      <h2 class="text-xl text-elight my-3 my-2 box-border">Output</h2>
      <div class="flex-grow h-48">
        <textarea
          bind:value={result}
          class=" h-full w-full bg-dark text-elight text-xl box-border
          border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none
          resize-none"
          id="message"
          readonly />
      </div>
    </div>
  </div>
  <div>
    <button
      on:click={e => {
        outputData(e);
      }}
      class="bg-dark hover:bg-elight hover:text-edark outline-none text-white
      float-right font-bold py-2 px-4 rounded-full">
      Run
    </button>
  </div>
</div>
