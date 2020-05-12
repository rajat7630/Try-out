<script>
 import { cookieHandler } from "../helperFunctions/cookie_handler.js";
  const tokens = cookieHandler.getCookie("access_token").split(".");
  console.log(atob(tokens[1]));
  function logout() {
    location.replace("http://localhost:3000/logout");
  }
</script>

<style>
 nav {
   background-color: #7B8788;
 }
  #btn {
    float: right;
  }
  .welcome {
    font-size: 3vh;
    color: white;
    position: absolute;
  }
</style> 

<!-- <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">

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
</nav> -->
<nav class="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
    <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
        <div class="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <span class="font-semibold text-xl tracking-tight">tryout</span>
        </div>
        <div class="block lg:hidden ">
            <button
                id="nav"
                class="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                </svg>
            </button>
        </div>
    </div>
        <div class="flex ">
            <button on:click={logout}
                class=" block text-md px-4  ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">Logout</button>
        </div>
    </nav>
