<script lang="ts">
  import toast_ from "svelte-french-toast";
  export let toast: { id: string };
  import { setDefaultSetting } from "../setting/mode/mode_default";
</script>

<div class="space-y-2">
  <div class="text-xl font-bold text-center">Do you want to reset Setting?</div>
  <div class="flex justify-center w-full gap-2">
    <button
      on:click={() => {
        setDefaultSetting();
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
