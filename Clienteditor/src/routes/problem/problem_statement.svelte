<script>
  import { problemStore } from "./problem_store.js";
  import CustomEditor from "../../components/textarea_editor/editor.svelte";
  function solutionData(data) {
    $problemStore.description = data;
  }
</script>

<style>
  .statement {
    height: 50vh;
  }
</style>

<div class="max-w-6xl mx-auto flex flex-grow ">
  <div class="flex-col w-full mb-6">
    <div class="w-full px-3">
      <div class="margin-bottom:20px;">
        <label class="text-2xl text-elight mb-8 my-2">
          Describe Problem Statement here
        </label>
      </div>
      <div class="h-full">
        <CustomEditor {solutionData} data="" />
      </div>
      <!-- <textarea
        bind:value={$problemStore.description}
        class=" h-full w-full bg-dark text-elight text-2xl border
        border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
        focus:border-white h-48 resize-none"
        id="message" /> -->

    </div>
  </div>
</div>
