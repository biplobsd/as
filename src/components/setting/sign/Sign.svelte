<script lang="ts">
  import SignButton from "./Sign_button.svelte";
</script>

<div>
  <div class="font-bold text-sm mb-1">Only (+ or -)</div>
  <div class="join w-full flex">
    <SignButton signText={"+"} />
    <SignButton signText={"-"} />
    <SignButton signText={"random"} />
  </div>
</div>
