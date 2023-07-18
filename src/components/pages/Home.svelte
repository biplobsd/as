<script lang="ts">
  import Status from "../home/Status.svelte";
  import Action from "../home/Action.svelte";
  import { delay, randomIntFromInterval } from "src/utils/helper";
  import { shuffle } from "fast-shuffle";
  import type { QuestionPack } from "src/utils/interface";
  import { onMount } from "svelte";
  import { blur } from "svelte/transition";
  import {
    numberPointWritable,
    numberRangeWritable,
    signWritable,
    storeIncreaseNumberAfterWritable,
    timeWritable,
  } from "src/utils/storage";
  import { get } from "svelte/store";
  import { increaseNumberAfterWritable } from "src/utils/writable";

  let stop: boolean = false;
  let isCountDowning: boolean = false;
  let timeout: number;
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
    const { min, max } = getMinMax();
    const number1 = randomIntFromInterval(min, max);
    const number2 = randomIntFromInterval(min, max);
    const sign = get(signWritable);

    let ans: number;
    let signText: string;

    switch (sign) {
      case "+":
        ans = number1 + number2;
        signText = sign;
        break;
      case "-":
        ans = number1 - number2;
        signText = sign;
        break;
      case "random":
        if (Math.random() > 0.5) {
          ans = number1 + number2;
          signText = "+";
        } else {
          ans = number1 - number2;
          signText = "-";
        }
        break;
    }

    const questionString = number1 + signText + number2;

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

  function getMinMax() {
    const numberRange = get(numberRangeWritable);
    const numberPoint = get(numberPointWritable);
    console.log("nr", numberRange, "np", numberPoint);
    const min = numberPoint;
    const max = numberPoint + numberRange;
    return { min, max };
  }

  function resetINA() {
    increaseNumberAfterWritable.set(get(storeIncreaseNumberAfterWritable));
  }

  onMount(() => {
    start();
    resetINA();

    increaseNumberAfterWritable.subscribe((x) => {
      if (x == 0) {
        const { min, max } = getMinMax();
        console.log("max", max, "min", min);
        numberPointWritable.set(max);
        resetINA();
      }
    });
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
