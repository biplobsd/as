<script lang="ts">
  import ToggleButton from "../setting/Toggle_Button.svelte";
  import IncreaseNumber from "../setting/increase_number/Increase_Number.svelte";
  import Mode from "../setting/mode/mode.svelte";
  import NumberRange from "../setting/number_range/Number_Range.svelte";
  import Sign from "../setting/sign/Sign.svelte";
  import Timeout from "../setting/timeout/Timeout_Setting.svelte";
</script>

<div class="space-y-2">
  <Mode />
  <Timeout />
  <NumberRange />
  <IncreaseNumber />
  <Sign />
  <div>
    <div class="font-bold text-sm mb-1">Reset</div>
    <div class="join w-full flex">
      <ToggleButton text="Setting" />
      <ToggleButton text="Back to First" />
    </div>
  </div>
</div>
