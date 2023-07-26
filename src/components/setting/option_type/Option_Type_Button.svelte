<script lang="ts">
  import { typeWritable } from "src/utils/storage";
  import ToggleButton from "../Toggle_Button.svelte";
  import { onMount } from "svelte";
  import type { Sign } from "src/utils/schema";
  type OnOff = "On" | "Off";
  export let typeText: OnOff;
  let current: OnOff;

  function setOnOff(onOff: OnOff) {
    typeWritable.set(onOff === "On");
  }

  onMount(() => {
    typeWritable.subscribe((x) => (current = x ? "On" : "Off"));
  });
</script>

<ToggleButton
  key={"optionType"}
  checked={typeText === current}
  onClick={() => setOnOff(typeText)}
  text={typeText}
/>
