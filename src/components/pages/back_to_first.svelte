<script lang="ts">
  import toast_ from "svelte-french-toast";
  export let toast: { id: string };
  import {
    setDefaultSetting,
    setDefaultUserSetting,
  } from "../setting/mode/mode_default";
  import {
    isDarkThemeWritable,
    numberPointWritable,
    starWritable,
  } from "src/utils/storage";
  import { THEME_MODE_DEFAULT } from "src/utils/default";
  import { runtime } from "src/utils/communication";
  import { delay, saveToCloudUserSetting } from "src/utils/helper";
</script>

<div class="space-y-2">
  <div class="text-xl font-bold text-center">Do you want to back to first?</div>
  <div class="flex justify-center w-full gap-2">
    <button
      on:click={async () => {
        setDefaultUserSetting();
        await runtime.send({
          type: "statusBackground",
          status: {
            code: "starToZero",
            msg: "Set star to zero",
          },
        });
        await delay(10);
        await saveToCloudUserSetting();
        toast_.dismiss(toast.id);
      }}
      class="btn btn-sm btn-error">Reset</button
    >
    <button
      on:click={() => toast_.dismiss(toast.id)}
      class="btn btn-sm btn-success">Dismiss</button
    >
  </div>
</div>
