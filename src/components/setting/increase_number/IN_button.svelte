<script lang="ts">
  import { storeIncreaseNumberAfterWritable } from "src/utils/storage";
  import ToggleButton from "../Toggle_Button.svelte";
  import { onMount } from "svelte";
  import { checkIsInMode } from "../mode/mode_default";

  export let increaseNumber: number;
  let current: number;

  function setNR(ina: number) {
    storeIncreaseNumberAfterWritable.set(ina);
    checkIsInMode();
  }

  onMount(() => {
    storeIncreaseNumberAfterWritable.subscribe((x) => (current = x));
  });
</script>

<ToggleButton
  key={"in"}
  checked={increaseNumber === current}
  onClick={() => setNR(increaseNumber)}
  text={increaseNumber.toString()}
/>
