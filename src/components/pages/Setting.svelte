<script lang="ts">
  import toast from "svelte-french-toast";
  import IncreaseNumber from "../setting/increase_number/Increase_Number.svelte";
  import Mode from "../setting/mode/mode.svelte";
  import NumberRange from "../setting/number_range/Number_Range.svelte";
  import Sign from "../setting/sign/Sign.svelte";
  import Timeout from "../setting/timeout/Timeout_Setting.svelte";
  import ResetSetting from "./reset_setting.svelte";
  import BackToFirst from "./back_to_first.svelte";
  import { onMount } from "svelte";
  import { requestUserSetting } from "src/utils/helper";
  import { isUserLoggedWritable } from "src/utils/storage";
  import { get } from "svelte/store";
  import OptionType from "../setting/option_type/Option_Type.svelte";

  onMount(async () => {
    if (get(isUserLoggedWritable)) {
      await requestUserSetting();
    }
  });
</script>

<div class="space-y-2">
  <Mode />
  <Timeout />
  <NumberRange />
  <IncreaseNumber />
  <Sign />
  <OptionType />

  <div>
    <div class="font-bold text-sm mb-1">Reset</div>
    <div class="w-full flex gap-2">
      <button
        class="btn btn-sm normal-case flex-1"
        on:click={() => {
          // @ts-ignore
          toast(ResetSetting, {
            position: "center",
          });
        }}>Setting</button
      >
      <button
        class="btn btn-sm normal-case flex-1"
        on:click={() => {
          // @ts-ignore
          toast(BackToFirst, {
            position: "center",
          });
        }}>Back to First</button
      >
    </div>
  </div>
</div>
