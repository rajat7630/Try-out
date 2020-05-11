<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query } from "svelte-apollo";
  import Modal from "svelte-simple-modal";
  import Content from "../Modals/problemModal.svelte";
  import TestModal from "../Modals/testModal.svelte";
  import Navbar from "../components/navbar.svelte";
  import { publish, grantPermissions } from "../../pubnubClient.js";
  import pubnub from "../../pubnubinit.js";

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
  let hasJoinedChat = false;
  let channels = [""];
  let username = "";
  let newMessage = "";
  let messages = "";
  let output = [""];

  function joined() {
    hasJoinedChat = true;
  }
  function close() {
    hasJoinedChat = false;
  }
  function getCookie(name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
  }
  const userEmail = getCookie("access_email");

  let sEmails = userEmail.split("%");
  let userName = sEmails[0];

  const user = {
    id: Math.floor(Math.random() * 10) + 1,
    email: userName,
    name: userName,
    flag: "A",
    ttl: 1440,
    profileUrl: null
  };

  let channelName = "channel." + userName;
  console.log(channelName);
  pubnub.addListener({
    message: function(m) {
      let flag = true;
      for (let i = 0; i < channels.length; i++) {
        if (channels[i] == m.channel) {
          flag = false;
          break;
        } else {
          flag = true;
        }
      }
      if (flag) {
        console.log("different channel");
        output = [m.message];
        channels = [...channels, m.channel];
        newMessage = "";
      } else {
        output = [...output, m.message];
        newMessage = "";
      }
    }
  });

  grantPermissions(user);

  //subscribe("newUserr.com");
  const changeChannel = m => {
    channelName = m.channel;
  };
</script>

<style>
  :root {
  }

  html {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #ddd;
    padding: 20px;
  }
  .login-form h2 {
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
  }
  label {
    margin-bottom: 20px;
  }
  .btm {
    position: absolute;
    right: 60px;
    bottom: 60px;
  }
  .btm2 {
    position: absolute;
    right: 0px;
    bottom: 359px;
  }
  .chat {
    position: absolute;
    bottom: 50px;
    right: 50px;
    height: 400px;
    display: flex;
    flex-direction: column;
    width: 500px;
    border: 1px solid #dcc;
  }
  .header {
    border-bottom: 1px solid #dcc;
    padding: 20px;
  }
  .messages {
    padding: 10px;
    flex-grow: 1;
    list-style: none;
  }
  .message {
    display: block;
    text-align: left;
    margin-bottom: 20px;
  }
  .message span {
    border-radius: 5px;
    color: #333;
    background-color: #dcc;
    display: inline-block;
    padding: 10px;
  }
  .message.current-user {
    text-align: right;
  }
  .message.current-user span {
    color: #fff;
    background-color: #1e87f0;
  }
  .message-form {
    border-top: 1px solid #dcc;
    position: relative;
    bottom: 0;
  }
  .message-form input {
    border: none;
    margin-bottom: 0;
  }
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }

  #blk {
    margin-top: 6%;
    margin-left: 10%;
    margin-right: 6%;
  }
  #btn {
    float: right;
  }
  .prob {
    list-style: none;
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />
<body>

  <Navbar />

  <div id="blk" class="flex mb-4">
    <div class="w-1/2 h-12">
      <div class="max-w-lg rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Your Tests</div>
          <ol>
            {#await $Test}
              Loading...
            {:then result}
              {#each result.data.allTests as test}
                <li class="prob">
                  <a href="http://localhost:5000/test/{test.id}">
                    {test.testName}
                  </a>
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
    <div class="w-1/2 h-12">
      <div class="max-w-lg rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Your Problems</div>
          <ol>
            {#await $Problem}
              Loading...
            {:then result}
              {#each result.data.allProblems as prob}
                <li class="prob">
                  <a href="http://localhost:5000/problem/{prob.id}">
                    {prob.problemName}
                  </a>
                </li>
              {/each}
            {:catch err}
              Error: {err}
            {/await}
          </ol>
        </div>
        <div class="px-6 py-4" style="margin-right:10%;">
          <Modal>
            <Content changeCheck={handleProblemAdd} />
          </Modal>
        </div>
      </div>
    </div>
  </div>

  <div class="App">
    {#if hasJoinedChat}
      <div class="chat">
        <div class="header">
          <button
            on:click={close}
            class="btm2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
            px-4 rounded-full">
            Close
          </button>
        </div>
        <div class="flex">
          <div class="w-1/2">
            Active Channels
            <div class="message-form">
              <ul class="messages">
                {#each channels as channel}
                  <li>
                    <button on:click={changeChannel({ channel })}>
                      {channel}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
          <div class="w-1/2">
            <p>Enter chat and press enter.</p>
            <form on:submit|preventDefault={publish(newMessage, channelName)}>
              <input bind:value={newMessage} placeholder="Your Message Here" />
            </form>
            <p>Chat Output:</p>
            <div class="message-form">
              <ul class="messages">
                {#each output as message}
                  <li>
                    <span>{message}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>

        </div>
      </div>
    {:else}
      <div class="btm">
        <button
          on:click={joined}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
          rounded-full">
          User Chat
        </button>
      </div>
    {/if}
  </div>
</body>
