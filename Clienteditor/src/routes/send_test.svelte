<script>
  export let currentRoute;
  import { getClient, query, mutate } from "svelte-apollo";
  import { apolloClient } from "../apolloClient.js";
  import Navbar from "../components/navbar.svelte";
  const client = getClient();
  const token = query(client, {
    query: apolloClient.getToken,
    variables: { id: currentRoute.namedParams.id }
  });

  let email = "";
  let mailBody = "";
</script>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
  .buttonbox {
    margin-left: 70vw;
  }
  .savebutton {
    margin-right: 3vw;
  }
  .deleteButton {
    margin-left: 3vw;
  }
  #blk {
    margin-top: 6%;
    margin-left: 10%;
    margin-right: 6%;
  }
  .heading {
    width: 100%;
    padding: 1vh;
    text-align: center;
    font-size: 4vh;
    margin-top: 2vh;
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />
<body>
  <div>
    <Navbar />
    <!-- style="margin-left:23%;margin-top:7%; -->
    <h1 class="heading">
      <strong>Send Test</strong>
    </h1>
    <div class="">
      <div class="h-12">
        {#await $token}
          Loading...
        {:then result}

          <div class="p-8 mx-2 mt-24 items-center">
            <div class="max-w-auto rounded overflow-hidden shadow-lg">
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/5">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1
                    md:mb-0 pr-4"
                    for="inline-full-name">
                    Test Link
                  </label>
                </div>
                <div class="md:w-3/5">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200
                    rounded w-full py-2 px-4 text-gray-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    value="localhost:5000/givetest/{result.data.getToken.token}"
                    readonly />
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/5">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1
                    md:mb-0 pr-4"
                    for="inline-full-name">
                    Email
                  </label>
                </div>
                <div class="md:w-3/5">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200
                    rounded w-full py-2 px-4 text-gray-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    bind:value={email}
                    placeholder="Enter Email" />
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-2">
            <div class="flex buttonbox">
              <button
                on:click={async () => {
                  mailBody = `localhost:5000/givetest/${result.data.getToken.token}`;
                  console.log(email, mailBody);
                  try {
                    await mutate(client, {
                      mutation: apolloClient.sendMail,
                      variables: { email, mailBody }
                    });
                  } catch (err) {
                    console.log(err);
                  }
                }}
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2
                px-4 border border-red-700 rounded">
                Send Test
              </button>

            </div>
          </div>

        {:catch err}
          Error : {err}
        {/await}
      </div>
    </div>
  </div>
</body>
