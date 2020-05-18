<script>
  import { onMount } from "svelte";
  import EditorArea from "./EditorArea.svelte";
  import Tabs from "./Tabs.svelte";
  import { getClient, query, subscribe } from "svelte-apollo";
  import { apolloClient } from "./apolloClient.js";
  import { dataStore, currentTab } from "./store.js";
  import { getContext } from "svelte";
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

  $problems.then(res => {
    cookieHandler.setCookie("test_id", res.data.testByToken.id);
    dataStore.updateStore(res.data.testByToken.problems);
  });

  let hasJoinedChat = false;
  let is_joined = false;
  let channel = "";
  let username = "";
  let newMessage = "";
  let messages = "";
  let output = [];
  let comment;

  function updateStore(result) {
    console.log(result);
  }
  function joined() {
    hasJoinedChat = true;
    if (is_joined === false) {
      pubbie();
    }
    is_joined = true;
  }
  function close() {
    hasJoinedChat = false;
  }
  pubnub.addListener({
    message: function(m) {
      output = [...output, m];
      newMessage = "";
      console.log(output);
    }
  });

  pubnub.addListener({
    presence: function(p) {
      console.log(p);
      if (p.occupancy >= 1) {
        comment = "Online";
      } else {
        comment = "Offline";
      }
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
    console.log(usern);

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
  input {
    width: 100%;
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
    height: 400px;
    display: flex;
    flex-direction: column;
    width: 300px;
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

  <div class="container">
    {#if hasJoinedChat}
      <div class="chat shadow-xl rounded-lg">

        <!-- //header -->
        <div
          class="px-3 flex items-center bg-grey-light cursor-pointer rounded-lg">
          <div>
            <img
              alt="admin photo"
              class="h-12 w-12 rounded-full"
              src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
          </div>
          <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
            <div class="flex items-bottom justify-between">
              <p class="text-grey-darkest">Helpdesk</p>
            </div>
            <p class="text-grey-dark mt-1 text-sm">{comment}</p>
          </div>
        </div>

        <!-- message box -->
        <div
          class="container mx-auto overflow-auto margin-bottom:10%;"
          style=" bottom: 120px; right: 55px; height: 280px; width: 295px;">
          <div class="message-form">
            <div class="flex-1 overflow-auto">

              {#each output as temp}
                {#if temp.publisher == userName}
                  <div class="flex justify-end mb-2">
                    <div
                      class="rounded py-2 px-3"
                      style="background-color: #E2F7CB">
                      <p class="text-sm mt-1">{temp.message}</p>
                    </div>
                  </div>
                {:else}
                  <div class="ml-4 flex-1 rounded py-4">
                    <div class="flex items-bottom justify-between">
                      <p class="text-grey-darkest">Admin</p>

                    </div>
                    <p class="text-grey-dark mt-1 text-sm">{temp.message}</p>
                  </div>
                {/if}
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
            <h4 class="chat-notification-title">Helpdesk</h4>
          </div>
        </div>
      </div>
    {/if}
  </div>
</body>
