<script>
  import ClockIcon from "../icons/Clock_Icon.svelte";
  import StarIcon from "../icons/Star_Icon.svelte";
</script>

<div class="">
  <div class="flex justify-between">
    <div class="flex items-center gap-1 font-semibold">
      <ClockIcon />
      <span>5</span>
    </div>
    <div class="flex items-center gap-1 font-semibold">
      <StarIcon />
      <span>10</span>
    </div>
  </div>
  <progress class="progress progress-success" value="70" max="100" />
</div>
