<script lang="ts">
  import { slide } from "svelte/transition";

  export let text: string;
  export let img: string;
  export let imgAlt: string;
</script>

<div
  transition:slide
  class=" flex justify-center flex-col gap-3 text-md bg-base-content/90 font-semibold p-3 text-base-300 rounded-md items-center"
>
  <img class="rounded-box h-20" src={img} alt={imgAlt} />
  <div class="text-center space-y-2">
    <p>
      {text}
    </p>
  </div>
</div>
