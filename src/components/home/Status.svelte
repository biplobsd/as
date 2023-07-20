<script lang="ts">
  import { onMount } from "svelte";
  import ClockIcon from "../icons/Clock_Icon.svelte";
  import StarIcon from "../icons/Star_Icon.svelte";
  import { starWritable, timeWritable } from "src/utils/storage";
  import { get } from "svelte/store";
  import { slide } from "svelte/transition";
  let localStar: number = 0;
  export let timeout: number;

  onMount(async () => {
    starWritable.subscribe((star) => {
      localStar = star;
    });
  });
</script>

<div class="">
  <div class="flex justify-between">
    <div class="flex items-center gap-1 font-semibold">
      <ClockIcon />
      <div>
        {#key timeout}
          <p transition:slide>{timeout}</p>
        {/key}
      </div>
    </div>
    <div class="flex items-center gap-1 font-semibold">
      <StarIcon />
      <div>
        {#key localStar}
          <p transition:slide>{localStar}</p>
        {/key}
      </div>
    </div>
  </div>
  <div>
    <div class="w-full bg-base-200 rounded-full h-2.5 mt-1">
      <div
        class="bg-base-content/70 h-2.5 rounded-full transition-all duration-500 ease-in-out"
        style={`width: ${Math.round((timeout / get(timeWritable)) * 100)}%`}
      />
    </div>
  </div>
</div>
