<script>
  import pubnub from "../components/pubnub.js";
  //import "./csspubnub.svelte";

  let hasJoinedChat = false;
  let user = "";

  let username = "";
  let newMessage = "";
  let messages = [];
  let output = [];
  const handleChange = value => (messages = value);

  function createUser() {
    pubnub.createUser(
      {
        name: username
      },
      function(status, response) {}
    );
    hasJoinedChat = true;
  }

  pubnub.getUser(
    {
      include: {
        customFields: true
      }
    },
    function(status, response) {}
  );

  function initializeChannel() {
    //console.log("Subscribing..");
  }

  function publish() {
    function publishSampleMessage() {
      console.log("This is Check Part");
      var publishConfig = {
        channel: "chat",
        message: newMessage
      };
      pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
      });
    }

    pubnub.addListener({
      status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
          publishSampleMessage();
        }
      },
      message: function(msg) {
        output = [...output] + msg.message;
        console.log(msg.message);
      },
      presence: function(presenceEvent) {
        // handle presence
      }
    });
    pubnub.subscribe({
      channels: ["chat"]
    });
  }
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
  button[type="submit"] {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    color: #fff;
    background-color: #000;
    cursor: pointer;
  }
  button[type="submit"]:hover {
    color: #000;
    background-color: #fff;
  }
  input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
  }
  label {
    margin-bottom: 20px;
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
  .chat header {
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
</style>

<div class="App">
  {#if hasJoinedChat}
    <div class="chat">
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
      <input bind:value={newMessage} placeholder="Your Message Here" />
      <button on:click={publish}>Send</button>
      <p>Chat Output:</p>
      <ul class="messages">
        {#each output as message}
          <li>
            <span>{message}</span>
          </li>
        {/each}
      </ul>
    </div>
  {:else}
    <div class="login-form">
      <h2>Sign in to Chat</h2>
      <form on:submit={createUser}>
        <label for="username">Enter your username</label>
        <input
          type="text"
          bind:value={username}
          id="username"
          name="username"
          placeholder="Username" />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  {/if}
</div>
