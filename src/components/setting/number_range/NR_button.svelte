<script lang="ts">
  import { numberRangeWritable } from "src/utils/storage";
  import ToggleButton from "../Toggle_Button.svelte";
  import { onMount } from "svelte";
  import { checkIsInMode } from "../mode/mode_default";

  export let numberRange: number;
  let current: number;

  function setNR(nr: number) {
    numberRangeWritable.set(nr);
    checkIsInMode();
  }

  onMount(() => {
    numberRangeWritable.subscribe((x) => (current = x));
  });
</script>

<ToggleButton
  key={"nr"}
  checked={numberRange === current}
  onClick={() => setNR(numberRange)}
  text={numberRange.toString()}
/>
