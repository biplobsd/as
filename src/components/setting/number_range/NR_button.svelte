<script lang="ts">
  import { numberRangeWritable, timeWritable } from "src/utils/storage";

  import { onMount } from "svelte";
  import ToggleButton from "../Toggle_Button.svelte";

  export let numberRange: number;
  let storeNumberRange: number;

  function setNR(nr: number) {
    numberRangeWritable.set(nr);
  }

  onMount(() => {
    numberRangeWritable.subscribe((x) => (storeNumberRange = x));
  });
</script>

<ToggleButton
  checked={numberRange === storeNumberRange}
  onClick={() => setNR(numberRange)}
  text={numberRange.toString()}
/>
