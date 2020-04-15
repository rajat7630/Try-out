<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query } from "svelte-apollo";
  import Modal from "svelte-simple-modal";
  import Content from "../Modals/problemModal.svelte";
  import TestModal from "../Modals/testModal.svelte";
  import Navbar from "../components/navbar.svelte";
  import { publish, grantPermissions } from "../../pubnubClient.js";
  import pubnub from "../../pubnubinit.js";

  const client = getClient();
  const Test = query(client, { query: apolloClient.allTests });
  const Problem = query(client, { query: apolloClient.getProblems });
  const handleProblemAdd = () => {
    Problem.refetch();
  };
  const handleTestAdd = () => {
    Test.refetch();
  };
  let hasJoinedChat = false;
  let channel = "";
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

  // const user = {
  //   id: 1,
  //   email: "newUserr.com",
  //   name: "adarash",
  //   flag: "U",
  //   ttl: 1440,
  //   profileUrl: "xyz.com"
  // };

  pubnub.addListener({
    message: function(m) {
      output = [...output, m.message];
      newMessage = "";
      // console.log(m);
    }
  });

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
    flag: "U",
    ttl: 1440,
    profileUrl: null
  };

  grantPermissions(user);

  //subscribe("newUserr.com");
</script>

<style>
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
    position: fixed;
    right: 120px;
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
    width: 300px;
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
  button {
    margin-left: 92%;
  }
  #blk {
    margin-top: 6%;
    margin-left: 10%;
    margin-right: 6%;
  }
  #btn {
    float: right;
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />
<body>

  <Navbar />

  <div>
    <p>USER PAGE</p>
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
        <p>
          <a href="https://www.pubnub.com/?devrel_pbpn=javascript-chat">
            <img
              src="https://d2c805weuec6z7.cloudfront.net/Powered_By_PubNub.png"
              alt="Powered By PubNub"
              width="150" />
          </a>
        </p>
        <p />
        <p>Enter chat and press enter.</p>
        <form
          on:submit|preventDefault={publish(newMessage, 'channel.' + userName)}>
          <input bind:value={newMessage} placeholder="Your Message Here" />
          <button type="submit">Send</button>
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
    {:else}
      <div class="btm">
        <button
          on:click={joined}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
          rounded-full">
          Helpdesk...
        </button>
      </div>
    {/if}
  </div>
</body>
