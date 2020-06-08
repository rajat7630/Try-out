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
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/css2?family=Jost&display=swap" rel="stylesheet" />
<style>

 :global(body) {
    background-color: #ebe9e9;
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
    background-color: #38b2ac;;
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


body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav li {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a:active {
  background-color: #ddd;
  color: black;
}
.topnav-right {
  float: right;
}

@media screen and (max-width: 500px) {
  .topnav a , .topnav li{
    float: none;
    display: block;
  }
}
</style>
<div class="topnav">
  <Navigate to="/admin/panel/showproblems">
    <li>Welcome <b>{JSON.parse(atob(tokens[1])).username}</b></li>
  </Navigate>
  <Navigate to="/admin/panel/showproblems">
    <a onclick="clickSingleA(this)" class="single active" href="/admin/panel/showproblems">
      <i class="fa fa-server"></i>
      Problems
    </a>
  </Navigate>
  <Navigate to="/admin/panel/showtests">
    <a href="/admin/panel/showtests" onclick="clickSingleA(this)" class="single" >
      <i class="fa fa-database">
      </i>
      Tests
    </a>
  </Navigate>
  <Navigate to="/admin/panel/showresults">
    <a href="/admin/panel/showresults" onclick="clickSingleA(this)" class="single" >
      <i class="fa fa-envelope">
      </i>
      Results
    </a>
  </Navigate>
      <ul class ="topnav-right">
        <li>
           <div class="relative inline-block w-10 mr-2 align-middle select-none
              transition duration-200 ease-in" id="btn-toogle">
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
             <label>{mode}</label>
        </li>
        <a class="nav-link" href ="#" on:click ={myFunction}>
          <i class="fa fa-sign-out">
          </i>
          Logout
        </a>
    </ul>
</div>

	