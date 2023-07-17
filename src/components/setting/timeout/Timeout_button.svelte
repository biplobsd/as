<script lang="ts">
  import { timeWritable } from "src/utils/storage";
  import ToggleButton from "../Toggle_Button.svelte";
  import { onMount } from "svelte";
  import { checkIsInMode } from "../mode/mode_default";

  export let timeout: number;
  let currentTimeout: number;

  function setTimeout(timeout: number) {
    timeWritable.set(timeout);
    checkIsInMode();
  }

  onMount(() => {
    timeWritable.subscribe((x) => (currentTimeout = x));
  });
</script>

<ToggleButton
  key={"timeout"}
  checked={timeout === currentTimeout}
  onClick={() => setTimeout(timeout)}
  text={timeout + "s"}
/>
