<script lang="ts">
  import { storeIncreaseNumberAfterWritable } from "src/utils/storage";
  import ToggleButton from "../Toggle_Button.svelte";
  import { get } from "svelte/store";

  export let increaseNumber: number;

  function setNR(ina: number) {
    storeIncreaseNumberAfterWritable.set(ina);
  }
</script>

<ToggleButton
  key={"in"}
  checked={increaseNumber === get(storeIncreaseNumberAfterWritable)}
  onClick={() => setNR(increaseNumber)}
  text={increaseNumber.toString()}
/>
