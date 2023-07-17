<script lang="ts">
  import { onMount } from "svelte";
  import ModeButton from "./mode_button.svelte";
  import {
    modeWritable,
    timeWritable,
    numberRangeWritable,
    storeIncreaseNumberAfterWritable,
  } from "src/utils/storage";
  import { MODE_DEFAULT } from "./mode_default";

  onMount(() => {
    modeWritable.subscribe((x) => {
      const { easy, medium, hard } = MODE_DEFAULT;
      switch (x) {
        case "Easy":
          timeWritable.set(easy.timeout);
          numberRangeWritable.set(easy.numberRange);
          storeIncreaseNumberAfterWritable.set(easy.increaseNumber);
          break;
        case "Medium":
          timeWritable.set(medium.timeout);
          numberRangeWritable.set(medium.numberRange);
          storeIncreaseNumberAfterWritable.set(medium.increaseNumber);
          break;
        case "Hard":
          timeWritable.set(hard.timeout);
          numberRangeWritable.set(hard.numberRange);
          storeIncreaseNumberAfterWritable.set(hard.increaseNumber);
          break;
      }
    });
  });
</script>

<div>
  <div class="font-bold text-sm mb-1">Mode</div>
  <div class="join w-full flex">
    <ModeButton modeText={"Easy"} />
    <ModeButton modeText={"Medium"} />
    <ModeButton modeText={"Hard"} />
    <ModeButton modeText={"Custom"} />
  </div>
</div>
