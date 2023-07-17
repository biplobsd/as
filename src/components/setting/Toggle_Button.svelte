<script lang="ts">
  export let text: string;
  export let key: string | undefined = undefined;
  export let onClick: (() => void) | undefined = undefined;
  export let checked: boolean | undefined = undefined;
</script>

<input
  {checked}
  on:click={onClick}
  class="join-item btn btn-sm flex-1 normal-case text-base-content/50 checked:!btn-success active:btn-success"
  type="radio"
  name={key ?? "options"}
  aria-label={text}
/>
