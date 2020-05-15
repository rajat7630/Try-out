<script>
  export let pageNum = 1;
  import TestInitials from "./test_initials.svelte";
  import TestProblems from "./select_problems.svelte";
</script>

<div>
  {#if pageNum === 1}
    <TestInitials />
  {/if}
  {#if pageNum === 2}
    <TestProblems />
  {/if}
</div>
