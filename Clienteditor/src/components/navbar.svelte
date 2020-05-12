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
    ["#2d132c", "#801336", "#c72c41", "#ee4540"]
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
    margin-right: 3%;
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
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
</style>

<link
  href="https://fonts.googleapis.com/css2?family=Jost&display=swap"
  rel="stylesheet" />
<nav
  class="flex shadow-2xl items-center justify-between flex-wrap bg-dark sticky
  p-6">

  <div class="w-full block flex-grow lg:items-right">
    <h1 class="welcome text-primary">Welcome Admin</h1>
    <div id="btn" class="flex flex-row">

      <div class="dropdown">
        <button
          class="container bg-white mx-3 flex flex-row hover:bg-light text-dark
          font-semibold hover:text-white py-4 px-6 border border-white-500
          rounded hover:border-white hover:border-transparent rounded-full">
          <img
            alt="admin"
            width="25"
            height="25"
            src="https://img.icons8.com/carbon-copy/64/000000/user.png" />
          <p style="font-family: 'Jost', sans-serif;">
            &nbsp;&nbsp;{JSON.parse(atob(tokens[1])).username}
          </p>
        </button>
        <ul class="ml-3 dropdown-content container text-gray-700 pt-1">
          <li
            class="rounded-t flex flex-row bg-gray-200 hover:bg-gray-400 py-2
            px-4 block whitespace-no-wrap"
            on:click={() => {
              number++;
              let themesize = themes.length;
              changeTheme(number % themesize);
            }}>
            <img
              alt="Theme"
              width="25"
              height="25"
              src="https://img.icons8.com/material-rounded/24/000000/change.png" />
            <p>&nbsp;&nbsp;Theme</p>
          </li>
          <li
            class="bg-gray-200 flex flex-row hover:bg-gray-400 py-2 px-4 block
            whitespace-no-wrap"
            on:click={myFunction}>

            <img
              alt="logout"
              width="25"
              height="25"
              src="https://img.icons8.com/pastel-glyph/64/000000/logout-rounded-down.png" />
            <p>&nbsp;&nbsp;Logout</p>
          </li>

        </ul>
      </div>

    </div>
  </div>
</nav>
