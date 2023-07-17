<script lang="ts">
  import { signWritable } from "src/utils/storage";
  import ToggleButton from "../Toggle_Button.svelte";
  import type { Sign } from "src/utils/types";
  import { onMount } from "svelte";

  export let signText: Sign;
  let current: Sign;

  function setSign(sign: Sign) {
    signWritable.set(sign);
  }

  onMount(() => {
    signWritable.subscribe((x) => (current = x));
  });
</script>

<ToggleButton
  key={"sign"}
  checked={signText === current}
  onClick={() => setSign(signText)}
  text={signText}
/>
