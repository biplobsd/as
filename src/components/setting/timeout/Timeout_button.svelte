<script lang="ts">
  import { timeWritable } from "src/utils/storage";

  import ToggleButton from "../Toggle_Button.svelte";
  import { get } from "svelte/store";

  export let timeout: number;

  function setTimeout(timeout: number) {
    timeWritable.set(timeout);
  }
</script>

<ToggleButton
  key={"timeout"}
  checked={timeout === get(timeWritable)}
  onClick={() => setTimeout(timeout)}
  text={timeout + "s"}
/>
