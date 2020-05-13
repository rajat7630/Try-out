<script>
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query } from "svelte-apollo";
  import Modal from "svelte-simple-modal";
  import Content from "../Modals/problemModal.svelte";
  import TestModal from "../Modals/testModal.svelte";
  import Navbar from "../components/navbar.svelte";
  import Sidebar from "../components/Side.svelte";
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
  input {
    width: 60%;
    margin-bottom: 20px;
    padding: 10px;
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
  .header {
    border-bottom: 1px solid #dcc;
    padding: 20px;
  }
  .messages {
    padding: 10px;
    flex-grow: 1;
    list-style: none;
  }
  #blk {
    margin-top: 6%;
    margin-left: 10%;
    margin-right: 6%;
  }
  input {
    width: 66%;
    margin-bottom: 20px;
    padding: 10px;
  }
  .btm {
    position: fixed;
    right: 3%;
    bottom: 5%;
  }
  .chat {
    position: fixed;
    background-color: #fff;
    bottom: 120px;
    right: 50px;
    height: 500px;
    display: flex;
    flex-direction: column;
    width: 600px;
    border: 1px solid #dcc;
  }
  /* chit chat */
  .chat-notification {
    display: flex;
    max-width: 14rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 1.5rem;
    width: 1.5rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
  .prob {
    list-style: none;
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />

<body>
<header>
 <Navbar/>
 <Sidebar/>
</header>
  <div class="container">
    {#if hasJoinedChat}
      <div class="chat flex flex-row shadow-xl rounded-lg">
        <!-- Left-->
        <div class="w-1/3 border flex flex-col">

          <!-- Header -->
          <div
            class="py-2 px-3 bg-grey-lighter flex flex-row justify-between
            items-center">
            <div class="flex">

              <p>Active User</p>
            </div>
          </div>

          <!-- Contacts -->
          <div class="bg-grey-lighter flex-1 overflow-auto">

            {#each channels as channel}
              <div
                class="bg-white hover:bg-gray-400 px-3 flex items-center
                hover:bg-grey-lighter cursor-pointer"
                on:click={changeChannel({ channel })}>

                <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
                  <div class="flex items-bottom justify-between">
                    <p class="text-grey-darkest">{channel}</p>

                  </div>

                </div>
              </div>
            {/each}

          </div>

        </div>
        <!-- Right -->
        <div class="w-2/3 border flex flex-col">

          <!-- //header -->

          <div
            class="px-3 flex-row items-center bg-grey-light cursor-pointer
            rounded-lg">
            <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
              <div class="flex items-bottom justify-between">
                <p class="text-grey-darkest">{channelName}</p>
              </div>
              <p class="text-grey-dark mt-1 text-sm">User Assitant</p>
            </div>
          </div>

          <!-- message box -->
          <div
            class="container mx-auto overflow-auto margin-bottom:10%;"
            style=" bottom: 120px; right: 55px; height: 380px; width: 390px;">
            <div class="message-form">
              <div class="flex-1 overflow-auto">
                <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
                  <div class="flex items-bottom justify-between">
                    <p class="text-grey-darkest">Admin</p>

                  </div>
                  <p class="text-grey-dark mt-1 text-sm">
                    Hey! if you need any help,Please message me
                  </p>
                </div>
                {#each output as message}
                  <div class="flex justify-end mb-2">
                    <div
                      class="rounded py-2 px-3"
                      style="background-color: #E2F7CB">
                      <p class="text-sm mt-1">{message}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <!-- message box end -->

          <!-- bottom container -->
          <div class="container block" style=" position: absolute; bottom: 0;">
            <div class="relative text-gray-600">
              <form
                on:submit|preventDefault={publish(newMessage, 'channel.' + userName)}>
                <input
                  type="search"
                  bind:value={newMessage}
                  name="serch"
                  placeholder="Type Message and Press Enter"
                  class="bg-white h-10 px-5 pr-10 rounded-full text-sm
                  focus:outline-none" />

              </form>

            </div>
          </div>

        </div>
      </div>

      <!-- chat end -->

      <!-- header end -->

      <!-- button half -->
      <div class="btm" on:click={close}>
        <div class="chat-notification">
          <div class="chat-notification-logo-wrapper">
            <img
              class="chat-notification-logo"
              src="https://img.icons8.com/cute-clipart/50/000000/close-window.png"
              alt="ChitChat Logo" />
          </div>
        </div>
      </div>
    {:else}
      <div class="btm" on:click={joined}>
        <div class="chat-notification">
          <div class="chat-notification-logo-wrapper">
            <img
              class="chat-notification-logo"
              src="https://img.icons8.com/cotton/50/000000/filled-chat.png"
              alt="ChitChat Logo" />
          </div>
          <div class="chat-notification-content">
            <h4 class="chat-notification-title">User Chat</h4>
          </div>
        </div>
      </div>
    {/if}
  </div>
</body>