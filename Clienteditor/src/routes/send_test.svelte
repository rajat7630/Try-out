<script>
  export let currentRoute;
  import { getClient, query, mutate } from "svelte-apollo";
  import { apolloClient } from "../apolloClient.js";
  import Navbar from "../components/navbar.svelte";
  console.log(currentRoute);
  const client = getClient();
  const test = query(client, {
    query: apolloClient.getTestById,
    variables: { id: parseInt(currentRoute.namedParams.id) }
  });
  let mailInitials = {
    email: "",
    linktime: ""
  };
</script>

<style>
  .problembox {
    @apply mx-auto max-w-6xl rounded-lg p-8 my-10 shadow;
    background-color: white;
    color: black;
  }
  :global(body.dark-mode) .problembox {
    @apply mx-auto max-w-6xl rounded-lg p-8 my-10 shadow;
    background-color: #2d393f;
    color: white;
  }
  .share {
    @apply bg-blue-400;
  }
  :global(body.dark-mode) .share {
    background-color: #2d393f;
  }
</style>

<link
  href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Rubik&display=swap"
  rel="stylesheet" />

<link
  rel="stylesheet"
  href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
  integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
  crossorigin="anonymous" />

<div class="h-full flex flex-col box-border">
  {#await $test}
    Loading...
  {:then result}
    <div class="rounded flex flex-col max-w-full overflow-auto p-16">
      <h1
        style="font-family: 'Rubik', sans-serif;"
        class="text-3xl day text-centerfont-semibold mb-6 ml-64">
        <i class="fas fa-share-alt-square" />
        <strong>Send '{result.data.testById.testName}' Test</strong>
      </h1>

      <div class=" problembox p-8 mx-64 max-w-full mt-24 items-center ">
        <div class="">

          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                class="block text-elight text-xl font-bold md:text-right mb-1
                md:mb-0 pr-4"
                for="inline-full-name">
                Email
              </label>
            </div>
            <div class="md:w-3/5">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200
                rounded-full w-full py-2 px-4 text-black leading-tight
                focus:outline-none focus:bg-white focus:text-black"
                id="inline-full-name"
                type="text"
                bind:value={mailInitials.email}
                placeholder="Enter Email" />
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                class="block text-elight text-xl font-bold md:text-right mb-1
                md:mb-0 pr-4"
                for="inline-full-name">
                Link Activation Time
              </label>
            </div>
            <div class="md:w-3/5">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200
                rounded-full w-full py-2 px-4 text-black leading-tight
                focus:outline-none focus:bg-white "
                id="inline-full-name"
                type="Number"
                bind:value={mailInitials.linktime}
                placeholder="Enter time in hours" />
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-2">
        <div class="flex buttonbox mx-auto w-48 mt-10">
          <button
            on:click={async () => {
              try {
                await mutate(client, {
                  mutation: apolloClient.sendMail,
                  variables: {
                    email: mailInitials.email,
                    test_id: currentRoute.namedParams.id,
                    linktime: mailInitials.linktime
                  }
                });
                location.replace('http://localhost:5000/admin/showtests');
              } catch (err) {
                console.log(err);
              }
            }}
            class="text-white px-4 w-auto h-12 rounded-full share
            active:shadow-lg mouse hover:bg-blue-700; shadow transition ease-in
            duration-200 focus:outline-none">
            <i class="fas fa-share-square" />
            <span>Send Test</span>
          </button>

        </div>
      </div>
    </div>
  {/await}
</div>
