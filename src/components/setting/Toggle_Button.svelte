<script lang="ts">
  import { delay, saveToCloudUserSetting } from "src/utils/helper";

  export let text: string;
  export let key: string | undefined = undefined;
  export let onClick: (() => void) | undefined = undefined;
  export let checked: boolean | undefined = undefined;
</script>

<input
  {checked}
  on:click={async () => {
    if (onClick) {
      onClick();
      await delay(10);
      await saveToCloudUserSetting();
    }
  }}
  class="join-item btn btn-sm flex-1 normal-case text-base-content/50 checked:!btn-success active:btn-success"
  type="radio"
  name={key ?? "options"}
  aria-label={text}
/>
