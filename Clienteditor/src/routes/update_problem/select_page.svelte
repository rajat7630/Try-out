<script>
  export let pageNum = 1;
  import ProblemInitials from "./problem_initials.svelte";
  import ProblemStatement from "./problem_statement.svelte";
  import Testcase from "./testcase.svelte";
  import ProblemSolution from "./problem_solution.svelte";
  export let currentRoute;
</script>


<div>
  {#if pageNum === 1}
    <ProblemInitials />
  {/if}
  {#if pageNum === 2}
    <ProblemStatement />
  {/if}
  {#if pageNum === 3}
    <ProblemSolution />
  {/if}
  {#if pageNum === 4}
    <Testcase {currentRoute}/>
  {/if}
</div>
