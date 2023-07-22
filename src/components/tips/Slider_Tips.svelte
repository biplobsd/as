<script lang="ts">
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import type { TooltipItem } from "src/utils/interface";
  import keyboardUse from "src/assets/gifs/tooltips/keyboard_use.gif";
  import modeChange from "src/assets/gifs/tooltips/mode_change.gif";
  import bmc from "src/assets/pngs/bmc-logo-no-background.png";
  import { shuffle } from "fast-shuffle";
  import Item from "./Item.svelte";
  import { onMount } from "svelte";

  let data: TooltipItem[] = [
    {
      text: "Use the keyboard Arrow keys to quickly select the option. Press Tab to highlight the area.",
      img: keyboardUse,
      imgAlt: "Keyboard use demo",
    },
    {
      text: "Switch modes by accessing the settings tab.",
      img: modeChange,
      imgAlt: "Mode Change",
    },
    {
      text: "If you enjoy this extension, consider buying me a coffee to support its maintenance.",
      img: bmc,
      imgAlt: "Buy me a coffee icon",
    },
  ];

  onMount(() => {
    data = shuffle(data);
  });
</script>

<Splide
  class="w-full h-48"
  options={{
    type: "loop",
    autoplay: true,
    arrows: false,
  }}
  aria-label="Tips"
>
  {#each data as i}
    <SplideSlide>
      <Item {...i} />
    </SplideSlide>
  {/each}
</Splide>
