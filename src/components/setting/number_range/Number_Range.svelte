<script lang="ts">
  import { MODE_DEFAULT } from "src/utils/constants";
  import NRButton from "./NR_button.svelte";
  const { easy, medium, hard } = MODE_DEFAULT;
</script>

<div>
  <div class="font-bold text-sm mb-1">Number Range</div>
  <div class="join w-full flex">
    <NRButton numberRange={easy.numberRange} />
    <NRButton numberRange={medium.numberRange} />
    <NRButton numberRange={hard.numberRange} />
  </div>
</div>
