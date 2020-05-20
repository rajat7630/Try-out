<script>
  export let currentRoute;
  import { getClient, query, mutate } from "svelte-apollo";
  import { apolloClient } from "../apolloClient.js";
  import Navbar from "../components/navbar.svelte";
  console.log(currentRoute);
  const client = getClient();
  let mailInitials = {
    email: "",
    linktime: ""
  };
</script>

<style>
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
<div class=" w-full h-full">
  <div>
    <Navbar />
  </div>
  <h1 class="heading text-elight">
    <strong>Send Test</strong>
  </h1>

  <div class="p-8 mx-64 max-w-full mt-24 items-center ">
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
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
            w-full py-2 px-4 text-edark leading-tight focus:outline-none
            focus:bg-white "
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
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
            w-full py-2 px-4 text-edark leading-tight focus:outline-none
            focus:bg-white "
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
            location.replace('http://localhost:5000/admin');
          } catch (err) {
            console.log(err);
          }
        }}
        class="bg-dark hover:bg-elight text-white hover:text-edark font-bold
        py-2 px-4 border border-white rounded">
        Send Test
      </button>
    </div>
  </div>
</div>
