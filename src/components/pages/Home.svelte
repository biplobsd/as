<script lang="ts">
  import Status from "../home/Status.svelte";
  import Action from "../home/Action.svelte";
  import {
    delay,
    getMinMax,
    randomIntFromInterval,
    resetINA,
  } from "src/utils/helper";
  import { shuffle } from "fast-shuffle";
  import type { QuestionPack } from "src/utils/interface";
  import { onMount } from "svelte";
  import { blur } from "svelte/transition";
  import { signWritable, timeWritable } from "src/utils/storage";
  import { get } from "svelte/store";
  import ArrowPath from "../icons/Arrow_Path.svelte";
  import SliderTips from "../tips/Slider_Tips.svelte";

  let stop: boolean = false;
  let timeout: number;
  let currentQuestion: QuestionPack | null = null;
  let warningScreen: boolean = false;

  async function countdown() {
    for (let index = timeout; index > 0; index -= 0.01) {
      if (stop) {
        break;
      }
      if (index % 1 != 0) {
        timeout = Math.round(index);
      }
      await delay(10);
    }

    if (timeout <= 0) {
      warningScreen = true;
    }

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
      const optionAns = randomIntFromInterval(
        ans - randomIntFromInterval(0, 10),
        ans + randomIntFromInterval(0, 10)
      );
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
    currentQuestion = questionInfinity();
    timeout = get(timeWritable);
    countdown();
  }

  function startPress() {
    warningScreen = false;
    start();
  }

  onMount(() => {
    start();
    resetINA();
  });
</script>

<div class="relative">
  {#if warningScreen}
    <div
      transition:blur
      class="backdrop-blur-sm absolute w-full h-full z-10 rounded-md"
    >
      <div class="flex justify-center items-center h-full flex-col gap-3">
        <SliderTips />
        <button on:click={startPress} class="btn btn-info">
          <ArrowPath />
          Try again</button
        >
      </div>
    </div>
  {/if}
  <div>
    <Status bind:timeout />
    <Action
      bind:warningScreen
      bind:currentQuestion
      bind:stop
      startFun={start}
    />
  </div>
</div>
