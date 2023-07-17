<script lang="ts">
  import TimeoutButton from "./Timeout_button.svelte";
</script>

<div>
  <div class="font-bold text-sm mb-1">Timeout</div>
  <div class="join w-full flex">
    <TimeoutButton timeout={30} />
    <TimeoutButton timeout={20} />
    <TimeoutButton timeout={5} />
  </div>
</div>
