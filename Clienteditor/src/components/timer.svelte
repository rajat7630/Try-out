<script>
  import { dataStore } from "../store.js";
  import { cookieHandler } from "../helperFunctions/cookie_handler.js";
  import { apolloClient } from "../apolloClient.js";
  import { mutate, getClient } from "svelte-apollo";
  export let expireTime;
  console.log(expireTime);
  let timer = {
    hour: "",
    minute: "",
    second: ""
  };
  const client = getClient();

  async function sendSolution(data) {
    let solutions = {
      u_id: parseInt(cookieHandler.getCookie("user_id")),
      t_id: parseInt(cookieHandler.getCookie("test_id")),
      solutions: JSON.stringify(data)
    };
    try {
      await mutate(client, {
        mutation: apolloClient.addAttempt,
        variables: solutions
      });
      location.replace("http://localhost:5000/feedback");
    } catch (err) {
      console.log(err);
    }
  }
  function InitializeTimer() {
    let d = new Date();
    let currentTime = Math.floor(d.getTime() / 1000);
    if (currentTime > expireTime) {
      clearInterval(timeCounter);
      sendSolution($dataStore);
      return;
    }
    let remainingTime = Math.floor(expireTime - currentTime);
    timer.hour = Math.floor(remainingTime / 3600).toString();
    timer.minute = (Math.floor(remainingTime / 60) % 60).toString();
    timer.second = (remainingTime % 60).toString();
  }

  let timeCounter = setInterval(InitializeTimer, 1000);
</script>

<style>
  #clockdiv {
    font-family: sans-serif;
    color: #fff;
    background: #1d1f21;
    display: inline-block;
    font-weight: 100;
    padding: 2px;
    text-align: center;
    font-size: 20px;
  }

  #clockdiv > div {
    padding: 5px;
    border-radius: 3px;
    background: #1d1f21;
    display: inline-block;
  }

  #clockdiv div > span {
    padding: 10px;
    border-radius: 3px;
    background: #25282c;
    display: inline-block;
  }

  .smalltext {
    padding-top: 5px;
    font-size: 10px;
  }
</style>

<div id="clockdiv">
  <div>
    <span class="hours">{timer.hour}</span>
    <div class="smalltext">Hours</div>
  </div>
  <div>
    <span class="minutes">{timer.minute}</span>
    <div class="smalltext">Minutes</div>
  </div>
  <div>
    <span class="seconds">{timer.second}</span>
    <div class="smalltext">Seconds</div>
  </div>
</div>
