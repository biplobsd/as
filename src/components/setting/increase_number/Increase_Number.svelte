<script lang="ts">
  import { MODE_DEFAULT } from "src/utils/constants";
  import INButton from "./IN_button.svelte";

  const { easy, medium, hard } = MODE_DEFAULT;
</script>

<div>
  <div class="font-bold text-sm mb-1">Increase number after N star</div>
  <div class="join w-full flex">
    <INButton increaseNumber={easy.increaseNumber} />
    <INButton increaseNumber={medium.increaseNumber} />
    <INButton increaseNumber={hard.increaseNumber} />
  </div>
</div>
