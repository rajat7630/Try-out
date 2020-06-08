<script>
  import { Route } from "svelte-router-spa";
  import Navbar from "../components/navbar.svelte";
  import Pubnub from "../components/pubnub.svelte";

  export let currentRoute;
  const params = {};
</script>

<div>
  <Navbar />
  <Route {currentRoute} {params} />

</div>
