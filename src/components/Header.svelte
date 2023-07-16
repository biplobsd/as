<script lang="ts">
  import { APP_NAME, VERSION } from "src/utils/constants";
  import icon48 from "src/assets/icons/icon128.png";
  import ThemeSwitch from "./Theme_Switch.svelte";
  import UserCircleIcon from "./icons/User_circle_Icon.svelte";
</script>

<div
  class=" w-full flex items-center gap-1 mb-3 tracking-wider font-extrabold text-xl"
>
  <div class="w-full flex items-center gap-1">
    <div class="w-12 h-full flex justify-center items-center flex-col">
      <img src={icon48} alt="Logo" class="mx-auto" />
    </div>
    <div class="flex flex-col">
      <span class="text-sm tracking-wide">{APP_NAME}</span>
      <span class="text-xs font-mono text-base-content/80">{VERSION}</span>
    </div>
  </div>
  <div class="flex flex-col items-center">
    <button class="btn btn-circle btn-xs"><UserCircleIcon /></button>
    <ThemeSwitch />
  </div>
</div>
