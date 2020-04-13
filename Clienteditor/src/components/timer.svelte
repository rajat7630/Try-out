<script>
  export let expireTime;
  console.log(expireTime);
  let timer = {
    hour: "",
    minute: "",
    second: ""
  };
  function InitializeTimer() {
    let d = new Date();
    let currentTime = Math.floor(d.getTime() / 1000);
    if (currentTime > expireTime) {
      clearInterval(timeCounter);
      return;
    }
    let remainingTime = Math.floor(expireTime - currentTime);
    timer.hour = Math.floor(remainingTime / 3600).toString();
    timer.minute = (Math.floor(remainingTime / 60) % 60).toString();
    timer.second = (remainingTime % 60).toString();
    console.log(timer);
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
