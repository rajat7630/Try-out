<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query } from "svelte-apollo";
  import Modal from "svelte-simple-modal";
  import Content from "../Modals/problemModal.svelte";
  import TestModal from "../Modals/testModal.svelte";
  import Navbar from "../components/navbar.svelte";
  import Sidebar from "../components/Side.svelte";
  import Pubnub from "./pubnub.svelte";
  import { cookieHandler } from "../helperFunctions/cookie_handler.js";
  const client = getClient();
  const tokens = cookieHandler.getCookie("access_token").split(".");
  console.log(atob(tokens[1]));
  const Test = query(client, { query: apolloClient.allTests });
  const Problem = query(client, { query: apolloClient.getProblems });
  const handleProblemAdd = () => {
    Problem.refetch();
  };
  const handleTestAdd = () => {
    Test.refetch();
  };
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />

<body>
  <div class="w-screen bg-edark h-screen flex flex-col">
    <header>
      <Navbar />
      <Sidebar />
    </header>
    <Pubnub />
  </div>

</body>
