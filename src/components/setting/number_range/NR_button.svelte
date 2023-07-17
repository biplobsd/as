<script lang="ts">
  import { numberRangeWritable } from "src/utils/storage";
  import ToggleButton from "../Toggle_Button.svelte";
  import { get } from "svelte/store";

  export let numberRange: number;

  function setNR(nr: number) {
    numberRangeWritable.set(nr);
  }
</script>

<ToggleButton
  key={"nr"}
  checked={numberRange === get(numberRangeWritable)}
  onClick={() => setNR(numberRange)}
  text={numberRange.toString()}
/>
