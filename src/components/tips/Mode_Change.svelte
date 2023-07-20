<script>
  import { slide } from "svelte/transition";
  import modeChange from "src/assets/gifs/tooltips/mode_change.gif";
</script>

<div
  transition:slide
  class=" flex justify-center flex-col gap-3 text-md bg-base-content/90 font-semibold p-3 text-base-300 rounded-md items-center"
>
  <img class="rounded-box h-20" src={modeChange} alt="Mode Change" />
  <div class="text-center space-y-2">
    <p>Switch modes by accessing the settings tab.</p>
  </div>
</div>
