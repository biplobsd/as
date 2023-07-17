<script lang="ts">
  import NRButton from "./NR_button.svelte";
</script>

<div>
  <div class="font-bold text-sm mb-1">Number Range</div>
  <div class="join w-full flex">
    <NRButton numberRange={5} />
    <NRButton numberRange={20} />
    <NRButton numberRange={100} />
  </div>
</div>
