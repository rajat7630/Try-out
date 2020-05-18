<script>
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
    <h1 class="welcome text-primary">Welcome,</h1>
    <div id="btn" class="flex flex-row">

      <div class="dropdown">
        <button
          on:click={() => {
            number++;
            let themesize = themes.length;
            changeTheme(number % themesize);
          }}
          class="container bg-white flex outline-none flex-row hover:bg-elight
          text-dark font-semibold hover:text-white py-4 px-6 border
          border-white-500 rounded hover:border-white rounded-full">
          <img
            alt="admin"
            width="25"
            height="25"
            src="https://img.icons8.com/carbon-copy/64/000000/user.png" />
        </button>
      </div>

    </div>
  </div>
</nav>
