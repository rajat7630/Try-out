<script>
  import Icon from '../Icon.svelte';
</script>

<style lang="postcss">
  .spinner {
    animation-name: spin;
    animation-duration: 3400ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .loader {
    @apply w-full h-64 flex items-center justify-center z-50;
  }
</style>

<div class="loader">
  <span class="spinner">
    <Icon icon="loader" class="w-10 h-10" />
  </span>
</div>
