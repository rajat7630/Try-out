<script>
  import { Route } from "svelte-router-spa";
  import Navbar from "../components/navbar.svelte";
  import Pubnub from "../components/pubnub.svelte";
  import Sidebar from "../components/Side.svelte";

  export let currentRoute;
  const params = {};
</script>

<div>
  <Navbar />
  <Sidebar />
  <Route {currentRoute} {params} />

</div>
