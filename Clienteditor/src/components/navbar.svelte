<script>
  import { cookieHandler } from "../helperFunctions/cookie_handler.js";
  import { Navigate } from "svelte-router-spa";

  const tokens = cookieHandler.getCookie("access_token").split(".");
  console.log(atob(tokens[1]));
  function myFunction() {
    location.replace("http://localhost:3000/logout");
  }

  if (cookieHandler.getCookie("mode") == "dark") {
    console.log("Working");
    window.document.body.classList.toggle("dark-mode");
  }
  let theme = cookieHandler.getCookie("mode");
  let mode;
  if (theme == "day") {
    mode = "Dark Mode";
  } else {
    mode = "Day Mode";
  }

  function toggle() {
    if (cookieHandler.getCookie("mode") == "day") {
      cookieHandler.setCookie("mode", "dark");
    } else {
      cookieHandler.setCookie("mode", "day");
    }
    window.document.body.classList.toggle("dark-mode");
  }
</script>

<style>
  :global(body) {
    background-color: white;
    color: black;
    transition: background-color 0.3s;
    --color-ed: White;
    --color-d: #88999e;
    --color-l: #106270;
    --color-el: #3c7380;
  }
  :global(body.dark-mode) {
    background-color: #1b262c;
    color: #bfc2c7;
    --color-ed: #1d1f21;
    --color-d: #254b62;
    --color-l: #303030;
    --color-el: #77abb7;
  }
  :global(body.dark-mode) .day {
    background-color: #2d393f;
    color: white;
  }
  :global(body) .day {
    background-color: #77abb7;
    color: white;
  }
  .toggle-checkbox:checked {
    right: 0;
    border-color: #68d391;
  }
  :global(body.dark-mode) toggle-checkbox:checked + .toggle-label {
    background-color: #68d391;
  }
  #btn {
    float: right;
    margin-right: 3%;
  }
  .welcome {
    font-size: 3vh;
    position: absolute;
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
  class="flex shadow-2xl items-center justify-between day flex-wrap sticky p-6">

  <div class="w-full block flex-grow lg:items-right">
    <h1 class="welcome text-primary">
      <Navigate to="/admin/panel/showtests">Welcome Admin</Navigate>
    </h1>
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
            px-4 block whitespace-no-wrap">
            <div
              class="relative inline-block w-10 mr-2 align-middle select-none
              transition duration-200 ease-in">
              <input
                type="checkbox"
                on:click={toggle}
                name="toggle"
                id="toggle"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full
                bg-white border-4 appearance-none cursor-pointer" />
              <label
                for="toggle"
                class="toggle-label block overflow-hidden h-6 rounded-full
                bg-gray-300 cursor-pointer" />
            </div>

            <label>&nbsp;&nbsp;{mode}</label>
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
