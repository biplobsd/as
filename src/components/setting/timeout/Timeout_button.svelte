<script lang="ts">
  import { timeWritable } from "src/utils/storage";

  import { onMount } from "svelte";
  import ToggleButton from "../Toggle_Button.svelte";

  export let timeout: number;
  let storeTimeout: number;

  function setTimeout(timeout: number) {
    timeWritable.set(timeout);
  }

  onMount(() => {
    timeWritable.subscribe((x) => (storeTimeout = x));
  });
</script>

<ToggleButton
  checked={timeout === storeTimeout}
  onClick={() => setTimeout(timeout)}
  text={timeout + "s"}
/>
