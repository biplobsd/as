<script lang="ts">
  import { onMount } from "svelte";
  import ClockIcon from "../icons/Clock_Icon.svelte";
  import StarIcon from "../icons/Star_Icon.svelte";
  import { starWritable, timeWritable } from "src/utils/storage";
  import { get } from "svelte/store";
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
      <span>{timeout}</span>
    </div>
    <div class="flex items-center gap-1 font-semibold">
      <StarIcon />
      <span>{localStar}</span>
    </div>
  </div>
  <progress
    class="progress progress-success transition-all delay-200"
    value={Math.round((timeout / get(timeWritable)) * 100)}
    max="100"
  />
</div>
