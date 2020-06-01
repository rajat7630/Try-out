<script>
  import { Route } from "svelte-router-spa";
  import Pubnub from "../components/pubnub.svelte";

  export let currentRoute;
  const params = {};
</script>

<div>
  <Route {currentRoute} {params} />
  <Pubnub />

</div>
