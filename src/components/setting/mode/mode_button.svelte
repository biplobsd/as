<script lang="ts">
  import ToggleButton from "../Toggle_Button.svelte";
  import type { Mode } from "src/utils/types";
  import { onMount } from "svelte";
  import { modeWritable } from "src/utils/writable";

  export let modeText: Mode;
  let current: Mode;
  function setMode(mode: Mode) {
    modeWritable.set(mode);
  }

  onMount(() => {
    modeWritable.subscribe((x) => (current = x));
  });
</script>

<ToggleButton
  key={"mode"}
  checked={modeText === current}
  onClick={() => setMode(modeText)}
  text={modeText}
/>
