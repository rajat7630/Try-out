<script>
  import Sidebar from "../components/Side.svelte";
  import { onMount } from 'svelte';
  import { apolloClient } from "../apolloClient.js";
  import { getClient, query } from "svelte-apollo";

  const client = getClient();
  const Test = query(client, { query: apolloClient.allTests });


  function myFunction() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("myTable");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
		if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		} else {
			tr[i].style.display = "none";
		}
	   }       
	}																																																																																																																																																																																																																																																																									
}																																																																																																																																																																																																																																																																																																																																																																																																										
//    function clickFunction() {
// 				const rows  = document.querySelectorAll("tr[data-href");
// 				rows.forEach(row  => {
// 						window.location.href = row.dataset.href;
// 					});
// 		 console.log("dfdsfsd");
//    }

	// jQuery(document).ready(function($) {
	// 	$("#clickable-row").click(function() {
	// 		window.location = $(this).data("href");
	// 	});

// });
</script>

<style>
#myInput {
  background-image: url('/css/searchicon.png');
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 90%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}

.add-btn {
	float: right;
	background-color: #008CBA;
	padding: 13px 10px;
	font-size: 15px;
	text-decoration: none;
}

 tr:hover { 
   background: grey; 
   cursor: pointer;
}
 td a { 
   display: block; 
   border: 1px solid black;
   padding: 16px; 
}
</style>
<Sidebar>
	<div class="container">
		<h1 class="mb-8">
		All Tests: </h1>
		<div>
			<input type="text" id="myInput" on:keyup={myFunction} placeholder="Search for Tests.." title="Type in a name">
			<a href ="/newtest" class ="add-btn" >Add Test</a>
		</div>
		   <table id ="myTable" class="text-left w-full">
		<thead class="bg-black flex text-white w-full">
			<tr class="flex w-full mb-4">
				<th class="p-4 w-1/2">Test Name</th>
				<th class="p-4 w-1/2">Difficulty</th>
			</tr>
		</thead>
		<tbody class="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style="height: 50vh;">
			  {#await $Test}
			  <tr class="flex w-full mb-4">
					<td class="p-4 w-1/2">loading..</td>
					<td class="p-4 w-1/2">loading..</td>
			   </tr>
			    {:then result}
			      {#each result.data.allTests as tes}
					<tr class="flex w-full mb-4" id ="clickable-row" on:click={ () => {window.location =`/editTest/${tes.id}`}}>
						<td class="p-4 w-1/2">{tes.testName}</td>
						<td class="p-4 w-1/2">{tes.difficultyLevel}</td>
					</tr>
				   {/each}
				{:catch err}
                    <td class="p-4 w-1/2">Server Not responding..</td>
					<td class="p-4 w-1/2">Server Not responding..</td>
               {/await}
			</tbody>
		</table>
	</div>
</Sidebar>