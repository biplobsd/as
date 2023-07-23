<script lang="ts">
  import { MODE_DEFAULT } from "src/utils/constants";
  import TimeoutButton from "./Timeout_button.svelte";
  const { easy, medium, hard } = MODE_DEFAULT;
</script>

<div>
  <div class="font-bold text-sm mb-1">Timeout</div>
  <div class="join w-full flex">
    <TimeoutButton timeout={easy.timeout} />
    <TimeoutButton timeout={medium.timeout} />
    <TimeoutButton timeout={hard.timeout} />
  </div>
</div>
