<script lang="ts">
  import INButton from "./IN_button.svelte";
</script>

<div>
  <div class="font-bold text-sm mb-1">Increase number after N star</div>
  <div class="join w-full flex">
    <INButton increaseNumber={50} />
    <INButton increaseNumber={20} />
    <INButton increaseNumber={5} />
  </div>
</div>
