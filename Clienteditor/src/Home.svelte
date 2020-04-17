<script>
  import { onMount } from "svelte";
  import EditorArea from "./EditorArea.svelte";
  import Tabs from "./Tabs.svelte";
  import { getClient, query, subscribe } from "svelte-apollo";
  import { apolloClient } from "./apolloClient.js";
  import { dataStore, currentTab } from "./store.js";
  import { getContext } from "svelte";
  import Content from "./Modals/userHelper.svelte";
  import Modal from "svelte-simple-modal";
  import { cookieHandler } from "./helperFunctions/cookie_handler.js";
  export let currentRoute;
  import Timer from "./components/timer.svelte";
  import { publish, grantPermissions } from "../pubnubClient.js";
  import pubnub from "../pubnubinit.js";

  console.log(currentRoute);

  const client = getClient();
  const problems = subscribe(client, {
    query: apolloClient.testByToken,
    variables: { token: currentRoute.namedParams.token }
  });
  var tokens = currentRoute.namedParams.token.split(".");
  console.log(JSON.parse(atob(tokens[1])));
  cookieHandler.setCookie("attemptId", JSON.parse(atob(tokens[1])).attemptId);

  $problems.then(res => {
    cookieHandler.setCookie("test_id", res.data.testByToken.id);
    dataStore.updateStore(res.data.testByToken.problems);
  });

  let hasJoinedChat = false;
  let channel = "";
  let username = "";
  let newMessage = "";
  let messages = "";
  let output = [""];

  function updateStore(result) {
    console.log(result);
  }
  function joined() {
    hasJoinedChat = true;
    pubbie();
  }
  function close() {
    hasJoinedChat = false;
  }
  pubnub.addListener({
    message: function(m) {
      output = [...output, m.message];
      newMessage = "";
      // console.log(m);
    }
  });
  let userName = "kumar.adarshluv99";
  async function email() {
    function getCookie(name) {
      var match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      if (match) return match[2];
    }
    const userEmail = getCookie("access_email");
    console.log(userEmail);

    let sEmails = userEmail.split("@");
    userName = sEmails[0];
    return userName;
  }
  async function pubbie() {
    // cookieHandler.setCookie("username",userName);
    const usern = await email();

    const users = {
      id: Math.floor(Math.random() * 10) + 1,
      email: usern,
      name: usern,
      flag: "U",
      ttl: 1440,
      profileUrl: null
    };

    grantPermissions(users);
  }

  //subscribe("newUserr.com");
</script>

<style>
  .App {
    color: #fff;
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

<!-- <svelte:window
  on:keydown={evt => {
    if (evt.ctrlKey && evt.key === 's' && $currentTab.changeData) {
      console.log(evt);
      evt.preventDefault();
      dataStore.changeDataUpdate($currentTab.id);
    } else if (evt.ctrlKey && evt.altKey && evt.key === 'p' && $currentTab.changeData === false) {
      evt.preventDefault();
      dataStore.changeDataUpdate($currentTab.id);
    } else if (evt.ctrlKey && evt.key === 'p' && evt.altKey === false) {
      evt.preventDefault();
      dataStore.add();
    } else if (evt.ctrlKey && evt.altKey && evt.key === 'c') {
      const id = $currentTab.id;
      if ($dataStore.length === 1) {
        return;
      }
      $dataStore.some((tab, index) => {
        if (tab.id !== $currentTab.id) {
          return false;
        }
        if (index === 0) {
          dataStore.activate($dataStore[index + 1].id);
          return true;
        }
        dataStore.activate($dataStore[index - 1].id);
        return true;
      });
      dataStore.deleteTab(id);
    }
  }} /> -->
<body>
  {#if cookieHandler.getCookie('loggedIn') !== 'true'}
    <div>
      <Modal>
        <Content changeStatus />
      </Modal>
    </div>
  {/if}

  {#await $problems}
    {pubbie()}
    <h1>Test is being loaded...</h1>
  {:then result}
    <div class="flex flex-col w-full">
      <Timer expireTime={JSON.parse(atob(tokens[1])).exp} />
      <Tabs />
    </div>
    <EditorArea />
  {:catch err}
    <h1>Error :- Contact Admin</h1>
  {/await}

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
