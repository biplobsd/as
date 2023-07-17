<script lang="ts">
  import { timeWritable } from "src/utils/storage";
  import ToggleButton from "../setting/Toggle_Button.svelte";
  import Timeout from "../setting/Timeout_Setting.svelte";
</script>

<div class="space-y-2">
  <div>
    <div class="font-bold text-sm mb-1">Mode</div>
    <div class="join w-full flex">
      <ToggleButton text="Easy" />
      <ToggleButton text="Medium" />
      <ToggleButton text="Hard" />
      <ToggleButton text="Custom" />
    </div>
  </div>
  <Timeout />
  <div>
    <div class="font-bold text-sm mb-1">Number Range</div>
    <div class="join w-full flex">
      <ToggleButton text="5" />
      <ToggleButton text="20" />
      <ToggleButton text="100" />
    </div>
  </div>

  <div>
    <div class="font-bold text-sm mb-1">Only (+ or -)</div>
    <div class="join w-full flex">
      <ToggleButton text="Random" />
      <ToggleButton text="+" />
      <ToggleButton text="-" />
    </div>
  </div>
  <div>
    <div class="font-bold text-sm mb-1">Reset</div>
    <div class="join w-full flex">
      <ToggleButton text="Setting" />
      <ToggleButton text="Back to First" />
    </div>
  </div>
</div>
