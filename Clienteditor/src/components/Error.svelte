<script>
  import Icon from '../Icon.svelte';

  export let error;
</script>

<div class="w-full flex items-center justify-center py-20">
  <div
    class="rounded border-2 flex flex-col items-center p-8 bg-gray-100
    text-sm font-semibold">
    {#if error.networkError}
      <span class="mb-8 text-red-900">
        <Icon icon="cloud-off" class="w-10 h-10" />
      </span>
      Unable to connect to the server.
    {:else if error.graphQLErrors && error.graphQLErrors.length}
      <span class="mb-8 text-red-900">
        <Icon icon="x-octagon" class="w-10 h-10" />
      </span>
      {error.graphQLErrors[0].message}
    {/if}
  </div>
</div>
