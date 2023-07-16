<script lang="ts">
  export let tabName: string;
  export let text: string;
</script>

<button
  on:click={() => (tabName = text)}
  class="tab tab-xs tab-lifted w-full flex-1 {tabName === text && 'tab-active'}"
  >{text}
</button>
