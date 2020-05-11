<script>
  import { cookieHandler } from "../helperFunctions/cookie_handler.js";
  const tokens = cookieHandler.getCookie("access_token").split(".");
  console.log(atob(tokens[1]));
  function myFunction() {
    location.replace("http://localhost:3000/logout");
  }
  let themes = [
    ["#1D1F21", "#25282c", "#303030", "#c4c4c4"],
    ["#1d3e53", "#254b62", "#476d7c", "#77abb7"],
    ["#1b262c", "#0f4c75", "#3282b8", "#bbe1fa"],
    ["#071e3d", "#1f4287", "#278ea5", "#21e6c1"],
    ["#200f21", "#382039", "#5a3d5c", "#f638dc"],
    ["#2d132c", "#801336", "#c72c41", "#ee4540"],
  ];
  let number = 0;
  function changeTheme(num) {
    console.log(themes[num], num);
    document.documentElement.style.setProperty("--color-ed", themes[num][0]);
    document.documentElement.style.setProperty("--color-d", themes[num][1]);
    document.documentElement.style.setProperty("--color-l", themes[num][2]);
    document.documentElement.style.setProperty("--color-el", themes[num][3]);
  }
  console.log(number);
  changeTheme(number);
</script>

<style>
  #btn {
    float: right;
  }
  .welcome {
    font-size: 3vh;
    color: white;
    position: absolute;
  }
  :root {
    --color-ed: white;
    --color-d: #254b62;
    --color-l: #476d7c;
    --color-el: #77abb7;
  }
</style>

<nav class="flex items-center justify-between flex-wrap bg-dark sticky p-6">

  <div class="w-full block flex-grow lg:items-right">
    <h1 class="welcome text-primary">
      Welcome
      <span
        on:click={() => {
          location.replace('http://localhost:5000/admin');
        }}>
        {JSON.parse(atob(tokens[1])).username}
      </span>
      ...
    </h1>
    <div>
      <button
        on:click={() => {
          number++;
          let themesize = themes.length;
          changeTheme(number % themesize);
        }}
        id="btn"
        class="bg-white hover:bg-light text-dark font-semibold hover:text-white
        py-2 px-4 border border-white-500 rounded hover:border-white hover:border-transparent rounded">
        Change Theme
      </button>
      <button
        on:click={myFunction}
        id="btn"
        class="bg-white mx-3 hover:bg-light text-dark font-semibold
        hover:text-white py-2 px-4 border border-white-500 rounded hover:border-white
        hover:border-transparent rounded">
        Logout
      </button>
    </div>
  </div>
</nav>
