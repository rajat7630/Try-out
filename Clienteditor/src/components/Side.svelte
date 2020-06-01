<script>
  import Icon from "../Icon.svelte";

  import { Navigate } from "svelte-router-spa";
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: "Josefin Sans", sans-serif;
  }

  .sidebar {
    width: 122px;
    height: 100%;
    color: white;
    padding-left: 3px;
    padding-right: 20px;
    padding-bottom: 50px;
    padding-top: 150px;
    position: fixed;
  }

  .sidebar li a {
    padding: 15px;
    display: block;
    padding-bottom: 40px;
  }
  .sidebar li a {
    color: black;
  }

  :global(body.dark-mode) a {
    color: white;
  }

  .sidebar li a .icon {
    display: flex;
    padding-left: 15px;
    padding-bottom: 10px;
  }
  .sidebar li a .name {
    margin: auto;
    padding-left: 5px;
    padding-top: 10px;
  }
  .sidebar li a:hover {
    color: #dbd7d7;
    background-color: grey;
  }
  .sidebar li a:active {
    color: red;
  }

  /* .sidebar li:hover a{
  color: #fff;
} */

  .main_content {
    position: fixed;
    margin-left: 300px;
    width: 100%;
    padding: 50px;
  }
</style>

<div class="sidebar">
  <ul>
    <li>

      <Navigate to="/admin/panel/showproblems">
        <a href="">
          <span class="icon">
            <Icon icon="server" />
          </span>
          <div class="name">Problems</div>
        </a>
      </Navigate>

    </li>
    <li>

      <Navigate to="/admin/panel/showtests">
        <a href="">
          <span class="icon">
            <Icon icon="folder" />
          </span>
          <div class="name">&nbsp;Tests</div>
        </a>
      </Navigate>

    </li>
    <li>
      <Navigate to="/admin/panel/showresults">
        <a href="">
          <span class="icon">
            <Icon icon="user-check" />
          </span>
          <div class="name">Results</div>
        </a>
      </Navigate>

    </li>
  </ul>
</div>
