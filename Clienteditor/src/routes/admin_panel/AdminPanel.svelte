<script>
  import Sidebar from "../../components/Side.svelte";
  import Navbar from "../../components/navbar.svelte";
  import Loader from "../../components/Loader.svelte";
  import Error from "../../components/Error.svelte";
  import Problems from "./problems.svelte";
  import Tests from "./tests.svelte";
  import Attempts from "./attempts.svelte";
  import { onMount } from "svelte";
  import { apolloClient } from "../../apolloClient.js";
  import { getClient, query } from "svelte-apollo";
  import Pubnub from "../pubnub.svelte";

  const client = getClient();

  export let currentRoute;
  console.log(currentRoute);
</script>

<style>
  :global(body.dark-mode) .btun {
    background-color: #2d393f;
    color: white;
  }
  .btun {
    background-color: #008cba;
    color: white;
  }
  .add-btn {
    float: right;
    padding: 13px 9px;
    font-size: 15px;
    text-decoration: none;
    cursor: pointer;
  }

  #problem-switcher-container {
    @apply flex flex-col items-center;
  }
  #problem-switcher {
    @apply mt-6 flex-grow flex flex-col text-white px-2;
    min-width: 50vw;
    max-width: 720px;
    backdrop-filter: blur(0.25rem);
    height: calc(100% - 6rem);
  }

  .problems {
    @apply flex-grow;
    margin-bottom: 4vh;
  }

  .problem {
    @apply mb-2;
  }
  .problem-search {
    @apply appearance-none w-full bg-white border py-3 px-4 mb-5 shadow rounded text-black;
    background-color: #efefef;
    width: 86%;
  }
  .problem__name {
    @apply font-bold flex w-full justify-between items-center;
  }
  .problem__type {
    @apply rounded-lg text-white text-xs font-semibold px-5 py-2 bg-teal-500;
  }
  .card-problem {
    border-radius: 25px;
    background-position: left top;
    background-repeat: repeat;
    padding: 15px;
    background-color: #dae0e2;
    margin-bottom: 10px;
  }

  @media (min-width: 720px) {
    #problem-switcher-container {
      @apply h-screen;
    }

    .problems {
      @apply overflow-y-auto;
      padding-left: 4.5rem;
      padding-right: 3.5rem;
    }
  }
  :global(body.dark-mode) .day {
    color: #bfc2c7;
  }
  .day {
    color: black;
  }
</style>

<Navbar />
<Sidebar />

{#if currentRoute.name === '/admin'}
  <Problems />
{:else if currentRoute.name === '/showtests'}
  <Tests />
{:else if currentRoute.name === '/showresults'}
  <Attempts />
{/if}
<Pubnub />
