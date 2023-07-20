<script lang="ts">
  import Carousel from "svelte-carousel";
  import type { TooltipItem } from "src/utils/interface";
  import keyboardUse from "src/assets/gifs/tooltips/keyboard_use.gif";
  import modeChange from "src/assets/gifs/tooltips/mode_change.gif";
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
  ];

  onMount(() => {
    data = shuffle(data);
  });
</script>

<Carousel
  autoplay
  arrows={false}
  autoplayDuration={5000}
  autoplayProgressVisible
  pauseOnFocus
>
  {#each data as i}
    <Item {...i} />
  {/each}
</Carousel>
