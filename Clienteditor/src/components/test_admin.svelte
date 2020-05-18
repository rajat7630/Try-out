<div class="md:w-4/6 ">
  <div class="max-w-lg rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Your Tests</div>
      <ol>
        {#await $Test}
          Loading...
        {:then result}
          {#each result.data.allTests as test}
            <li class="prob">
              <a href="http://localhost:5000/test/{test.id}">{test.testName}</a>
            </li>
          {/each}
        {:catch err}
          Error: {err}
        {/await}
      </ol>
    </div>
    <div class="px-6 py-4" style="margin-right:5%;">
      <Modal>
        <TestModal changeCheck={handleTestAdd} />
      </Modal>
    </div>
  </div>
</div>
