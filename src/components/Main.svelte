<script lang="ts">
  import Settings from "src/components/pages/Setting.svelte";
  import Home from "src/components/pages/Home.svelte";
  import About from "src/components/pages/About.svelte";
  import type { TabName } from "../utils/types";
  import { slide } from "svelte/transition";
  import TabButton from "./Tab_Button.svelte";
  import Leaderboard from "./pages/Leaderboard.svelte";

  let tabName: TabName = "Home";
</script>

<main>
  <div class="tabs w-full flex items-stretch">
    <TabButton bind:tabName text="Home" />
    <TabButton bind:tabName text="Leaderboard" />
    <TabButton bind:tabName text="Settings" />
    <TabButton bind:tabName text="About" />
  </div>
  <div class="my-2 w-full">
    {#if tabName === "Home"}
      <div in:slide>
        <Home />
      </div>
    {:else if tabName === "Leaderboard"}
      <div in:slide>
        <Leaderboard />
      </div>
    {:else if tabName === "Settings"}
      <div in:slide>
        <Settings />
      </div>
    {:else if tabName === "About"}
      <div in:slide>
        <About />
      </div>
    {/if}
  </div>
</main>
