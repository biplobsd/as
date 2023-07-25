<script lang="ts">
  import Status from "../home/Status.svelte";
  import Action from "../home/Action.svelte";
  import {
    delay,
    getMinMax,
    randomIntFromInterval,
    resetINA,
    saveToCloudUserSetting,
  } from "src/utils/helper";
  import { shuffle } from "fast-shuffle";
  import type { QuestionPack } from "src/utils/interface";
  import { onMount } from "svelte";
  import { blur } from "svelte/transition";
  import {
    numberPointWritable,
    signWritable,
    timeWritable,
  } from "src/utils/storage";
  import { get } from "svelte/store";
  import ArrowPath from "../icons/Arrow_Path.svelte";
  import SliderTips from "../tips/Slider_Tips.svelte";
  import toast from "svelte-french-toast";

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

  async function questionInfinity(): Promise<QuestionPack> {
    const sign = get(signWritable);
    let ans: number;
    let signText: string;
    let number1: number;
    let number2: number;

    while (true) {
      const { min, max } = getMinMax();
      number1 = randomIntFromInterval(min, max);
      number2 = randomIntFromInterval(min, max);

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

      if (ans.toString().length >= 4) {
        numberPointWritable.set(0);
        await delay(10);
        await saveToCloudUserSetting();
        toast(
          "Congratulations! 🎉 4-digit numbers are not supported yet. Resetting the number point to 0."
        );
        continue;
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

  async function start() {
    currentQuestion = await questionInfinity();
    timeout = get(timeWritable);
    countdown();
  }

  async function startPress() {
    warningScreen = false;
    await start();
  }

  onMount(async () => {
    await start();
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
