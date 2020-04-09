<script>
  export let changeCheck;
  const TestCheck = () => {
    changeCheck();
  };

  const showSurprise = () => {
    location.replace("http://localhost:5000/newtest")
  };
</script>

<p>
  <button
    class="bg-transparent border border-gray-500 hover:border-indigo-500
    text-gray-500 hover:text-indigo-500 font-bold py-2 px-4 rounded-full"
    on:click={showSurprise}>
    Add Test
  </button>
</p>
