<script lang="ts">
  import { signWritable } from "src/utils/storage";
  import ToggleButton from "../Toggle_Button.svelte";
  import { get } from "svelte/store";
  import type { Sign } from "src/utils/types";

  export let signText: Sign;

  function setSign(sign: Sign) {
    signWritable.set(sign);
  }
</script>

<ToggleButton
  key={"sign"}
  checked={signText === get(signWritable)}
  onClick={() => setSign(signText)}
  text={signText}
/>
