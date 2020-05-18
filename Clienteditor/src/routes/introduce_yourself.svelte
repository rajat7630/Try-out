<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query, subscribe, mutate } from "svelte-apollo";
  import { cookieHandler } from "../helperFunctions/cookie_handler.js";
  import EditorNavbar from "../components/editor_navbar.svelte";
  export let currentRoute;
  let user = {
    name: "",
    email: "",
    collegeName: "",
    testId: ""
  };
  var tokens = currentRoute.namedParams.token.split(".");
  console.log(JSON.parse(atob(tokens[1])));
  const client = getClient();
  user.testId = JSON.parse(atob(tokens[1])).testId;
  async function submitData() {
    if (user.name === "" || user.email === "" || user.collegeName === "") {
      return;
    }
    console.log(user);
    try {
      const res = await mutate(client, {
        mutation: apolloClient.addUser,
        variables: user
      });

      location.replace(
        `http://localhost:5000/starttest/${res.data.addUser.token}`
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style>
  .labels {
    @apply text-elight text-3xl mb-3;
  }
  .unit {
    @apply text-2xl text-elight ml-3;
  }

  .unitinput {
    @apply ml-6 p-2 mb-3 text-2xl bg-elight w-full max-w-4xl box-border text-edark rounded;
  }
  .status {
    @apply text-elight text-6xl px-3 flex;
  }
</style>

<div class="mx-auto flex-col flex-grow w-full h-full bg-edark">
  <EditorNavbar />
  <div class="text-edark mx-auto max-w-5xl w-full">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-elight text-5xl my-10">Sourcefuse Technologies</h1>

    </div>
    <div class="border-solid border-2 mt-10 border-light p-4">
      <div>
        <h2 class="labels text-4xl">User Details</h2>
      </div>
      <div>
        <div>
          <label class="labels">Name</label>
          <input
            bind:value={user.name}
            class="unitinput"
            type="text"
            placeholder="Enter Name" />
        </div>
        <div>
          <label class="labels">Registered Email</label>
          <input
            bind:value={user.email}
            class="unitinput"
            type="text"
            placeholder="Email" />
        </div>
        <div>
          <label class="labels">College Name</label>
          <input
            bind:value={user.collegeName}
            class="unitinput"
            type="text"
            placeholder="College Name" />
        </div>
      </div>
    </div>
  </div>
  <div class="my-10 flex justify-center">
    <button
      on:click={() => submitData()}
      class="bg-dark hover:bg-elight hover:text-edark outline-none text-white
      font-bold py-4 px-4 text-xl rounded-full">
      Submit
    </button>
  </div>
</div>
