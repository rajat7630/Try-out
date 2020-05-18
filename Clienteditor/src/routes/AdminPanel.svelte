<script>
  import Sidebar from "../components/Side.svelte";
  import Navbar from "../components/navbar.svelte";
  import { onMount } from "svelte";
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query } from "svelte-apollo";
  import Pubnub from "./pubnub.svelte";
  const client = getClient();
  const Attempts = query(client, { query: apolloClient.getAllAttempts });
  const Test = query(client, { query: apolloClient.allTests });
  const Problem = query(client, { query: apolloClient.getProblems });
  $Attempts.then(res => {
    console.log(res);
  });
  export let currentRoute;
  console.log(currentRoute, "ddddddcdcdcd");

  function myFunction() {
    //console.log("key");
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    //console.log(filter);
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      //tr[i].style.display = "none";
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        //console.log(td.textContent);
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          console.log("true", txtValue);
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
          console.log("false", txtValue);
        }
      }
    }
  }
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
  }
  #myInput {
    background-image: url("/css/searchicon.png");
    background-position: 10px 10px;
    background-repeat: no-repeat;
    font-size: 16px;
    padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
  }
  #pp:hover {
    background: grey;
    cursor: pointer;
  }
  td a {
    display: block;
    border: 1px solid black;
    padding: 16px;
  }
  .container {
    margin-left: 350px;
    margin-top: 50px;
  }
  .add-btn {
    float: right;
    background-color: #008cba;
    padding: 13px 10px;
    font-size: 15px;
    text-decoration: none;
  }
</style>

<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js">
    import { currentRoute } from "./Problems.svelte";
  </script>
</svelte:head>
<body>
  <div class="w-screen bg-edark h-screen flex flex-col">
    <header>
      <Navbar />
      <Sidebar />
    </header>
    <div class="container">
      {#if currentRoute.name === '/admin'}
        <h1 class="mb-8">All Problems:</h1>
        <div>
          <input
            type="text"
            id="myInput"
            on:keyup={myFunction}
            placeholder="Search for Problems.."
            title="Type in a name"
            style="width:90%" />
          <a href="/newProblem" class="add-btn">Add Problem</a>
        </div>
        <table id="myTable" class="text-left w-full">
          <thead class="bg-black flex text-white w-full">
            <tr class="flex w-full mb-4">
              <th class="p-4 w-1/4">Problem Name</th>
              <th class="p-4 w-1/4">Tag</th>
              <th class="p-4 w-1/4">Time Limit</th>
              <th class="p-4 w-1/4">CreatedAt</th>
            </tr>
          </thead>
          <tbody
            class="bg-grey-light flex flex-col items-center justify-between
            overflow-y-scroll w-full"
            style="height: 50vh;">
            {#await $Problem}
              <tr class="flex w-full mb-4">
                <td class="p-4 w-1/4">loading..</td>
                <td class="p-4 w-1/4">loading..</td>
                <td class="p-4 w-1/4">loading..</td>
                <td class="p-4 w-1/4">loading..</td>
              </tr>
            {:then result}
              {#each result.data.allProblems as prob}
                <tr
                  class="flex w-full mb-4"
                  on:click={() => {
                    window.location = `/problem/${prob.id}`;
                  }}
                  id="pp">
                  <td class="p-4 w-1/4">{prob.problemName}</td>
                  <td class="p-4 w-1/4">{prob.tags}</td>
                  <td class="p-4 w-1/4">{prob.timelimit}</td>
                  <td class="p-4 w-1/4">{new Date(prob.createdAt * 1000)}</td>
                </tr>
              {/each}
            {:catch err}
              <td class="p-4 w-1/4">Server Not responding..</td>
            {/await}
          </tbody>
        </table>
      {:else if currentRoute.name === '/showtests'}
        <h1 class="mb-8">All Tests:</h1>
        <div>
          <input
            type="text"
            id="myInput"
            on:keyup={myFunction}
            placeholder="Search for Tests.."
            title="Type in a name"
            style="width:90%" />
          <a href="/newtest" class="add-btn">Add Test</a>
        </div>
        <table id="myTable" class="text-left w-full">
          <thead class="bg-black flex text-white w-full">
            <tr class="flex w-full mb-4">
              <th class="p-4 w-1/3">Test Name</th>
              <th class="p-4 w-1/3">Difficulty</th>
              <th class="p-4 w-1/3">CreatedAt</th>
            </tr>
          </thead>
          <tbody
            class="bg-grey-light flex flex-col items-center justify-between
            overflow-y-scroll w-full"
            style="height: 50vh;">
            {#await $Test}
              <tr class="flex w-full mb-4">
                <td class="p-4 w-1/3">loading..</td>
                <td class="p-4 w-1/3">loading..</td>
                <td class="p-4 w-1/3">loading..</td>
              </tr>
            {:then result}
              {#each result.data.allTests as tes}
                <tr
                  class="flex w-full mb-4"
                  id="pp"
                  on:click={() => {
                    window.location = `/test/${tes.id}`;
                  }}>
                  <td class="p-4 w-1/3">{tes.testName}</td>
                  <td class="p-4 w-1/3">{tes.difficultyLevel}</td>
                  <td class="p-4 w-1/3">{new Date(tes.createdAt * 1000)}</td>
                </tr>
              {/each}
            {:catch err}
              <td class="p-4 w-1/3">Server Not responding..</td>
              <td class="p-4 w-1/3">Server Not responding..</td>
              <td class="p-4 w-1/3">Server Not responding..</td>
            {/await}
          </tbody>
        </table>
      {:else if currentRoute.name === '/showresults'}
        <h1 class="mb-8">Scoreboard:</h1>
        <input
          type="text"
          id="myInput"
          on:keyup={myFunction}
          placeholder="Search for users.."
          title="Type in a name"
          style="width:100%" />
        <table id="myTable" class="text-left w-full">
          <thead class="bg-black flex text-white w-full">
            <tr class="flex w-full mb-4">
              <th class="p-4 w-1/4">User Name</th>
              <th class="p-4 w-1/4">College Name</th>
              <th class="p-4 w-1/4">Test Name</th>
              <th class="p-4 w-1/4">Score</th>
            </tr>
          </thead>
          <tbody
            class="bg-grey-light flex flex-col items-center justify-between
            overflow-y-scroll w-full"
            style="height: 50vh;">
            {#await $Attempts}

              <tr class="flex w-full mb-4">
                <td class="p-4 w-1/4">loading..</td>
                <td class="p-4 w-1/4">loading..</td>
                <td class="p-4 w-1/4">loading..</td>
                <td class="p-4 w-1/4">loading..</td>
              </tr>
            {:then result}
              {#each result.data.getAllAttempt as attempt}
                <tr class="flex w-full mb-4" id="pp">
                  <td class="p-4 w-1/4">{attempt.user.name}</td>
                  <td class="p-4 w-1/4">{attempt.user.collegeName}</td>
                  <td class="p-4 w-1/4">{attempt.test}</td>
                  <td class="p-4 w-1/4">{attempt.score}</td>
                </tr>
              {/each}
            {:catch err}
              <td class="p-4 w-1/4">Server Not responding..</td>
            {/await}
          </tbody>
        </table>
      {/if}
    </div>
    <Pubnub />
  </div>
</body>
