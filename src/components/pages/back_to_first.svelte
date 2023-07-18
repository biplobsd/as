<script lang="ts">
  import toast_ from "svelte-french-toast";
  export let toast: { id: string };
  import { setDefaultSetting } from "../setting/mode/mode_default";
  import {
    isDarkThemeWritable,
    numberPointWritable,
    starWritable,
  } from "src/utils/storage";
  import { THEME_MODE_DEFAULT } from "src/utils/default";
</script>

<div class="space-y-2">
  <div class="text-xl font-bold text-center">Do you want to back to first?</div>
  <div class="flex justify-center w-full gap-2">
    <button
      on:click={() => {
        setDefaultSetting();
        isDarkThemeWritable.set(THEME_MODE_DEFAULT);
        starWritable.set(0);
        numberPointWritable.set(0);
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
