<script>
  import { cookieHandler } from "../helperFunctions/cookie_handler.js";
  const tokens = cookieHandler.getCookie("access_token").split(".");
  console.log(atob(tokens[1]));
  function myFunction() {
    location.replace("http://localhost:3000/logout");
  }
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
</style>

<nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">

  <div class="w-full block flex-grow lg:items-right">
    <h1 class="welcome">
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
        on:click={myFunction}
        id="btn"
        class="inline-block text-sm px-4 py-2 lg:items-right leading-none border
        rounded text-white border-white hover:border-transparent
        hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
        Logout
      </button>
    </div>
  </div>
</nav>
