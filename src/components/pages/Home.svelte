<script lang="ts">
  import Status from "../home/Status.svelte";
  import Action from "../home/Action.svelte";
  import { delay, randomIntFromInterval } from "src/utils/helper";
  import { shuffle } from "fast-shuffle";
  import type { QuestionPack } from "src/utils/interface";
  import type { Sign } from "src/utils/types";
  import { onMount } from "svelte";
  import { blur } from "svelte/transition";
  import { timeWritable } from "src/utils/storage";
  import { get } from "svelte/store";

  let stop: boolean = false;
  let isCountDowning: boolean = false;
  let timeout: number;
  let sign: Sign = "+";
  let min: number = 0;
  let max: number = 5;
  let currentQuestion: QuestionPack | null = null;

  $: {
    if (!isCountDowning && !stop && timeout !== 0) {
      start();
    }
  }

  async function countdown() {
    if (isCountDowning) return;
    isCountDowning = true;

    for (let index = timeout; index > 0; index -= 0.1) {
      if (stop) {
        break;
      }
      if (index % 1 != 0) {
        timeout = Math.round(index);
      }
      await delay(100);
    }

    isCountDowning = false;
    stop = false;
  }

  function questionInfinity(): QuestionPack {
    const number1 = randomIntFromInterval(min, max);
    const number2 = randomIntFromInterval(min, max);
    const questionString = number1 + sign + number2;
    let ans: number;
    if (sign === "+") {
      ans = number1 + number2;
    } else {
      ans = number1 - number2;
    }
    const options = [
      {
        number: ans,
        correct: true,
      },
    ];

    while (true) {
      const optionAns = randomIntFromInterval(min, max);
      if (optionAns === ans || options.some((x) => x.number === optionAns)) {
        continue;
      }
      options.push({
        number: optionAns,
        correct: false,
      });
      if (options.length === 4) {
        break;
      }
    }

    return {
      text: questionString,
      options: shuffle(options),
    };
  }

  function start() {
    timeout = get(timeWritable);
    currentQuestion = questionInfinity();
    countdown();
  }

  onMount(() => {
    start();
  });
</script>

<div class="relative">
  {#if timeout === 0}
    <div
      transition:blur
      class="backdrop-blur-sm absolute w-full h-full z-10 rounded-md"
    >
      <div class="flex justify-center items-center h-full">
        <button on:click={start} class="btn btn-info">Try again</button>
      </div>
    </div>
  {/if}
  <div>
    <Status bind:timeout />
    <Action bind:currentQuestion bind:stop />
  </div>
</div>
