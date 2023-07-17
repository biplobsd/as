<script lang="ts">
  import ToggleButton from "../setting/Toggle_Button.svelte";
  import NumberRange from "../setting/number_range/Number_Range.svelte";
  import Timeout from "../setting/timeout/Timeout_Setting.svelte";
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
  <NumberRange />
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
