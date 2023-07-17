<script lang="ts">
  import { modeWritable } from "src/utils/storage";
  import ToggleButton from "../Toggle_Button.svelte";
  import type { Mode } from "src/utils/types";
  import { checkIsInMode } from "./mode_default";
  import { onMount } from "svelte";

  export let modeText: Mode;
  let current: Mode;
  function setMode(mode: Mode) {
    modeWritable.set(mode);
    checkIsInMode();
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
