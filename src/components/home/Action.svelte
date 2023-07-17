<script lang="ts">
  import { shuffle } from "fast-shuffle";
  import { randomIntFromInterval } from "src/utils/helper";
  import type { Sign } from "src/utils/types";
  import { onMount } from "svelte";

  let sign: Sign = "+";
  let min: number = 0;
  let max: number = 5;
  let currentQuestion: QuestionPack | null = null;

  interface QuestionPack {
    text: string;
    options: {
      number: number;
      correct: boolean;
    }[];
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
      text: questionString + "=?",
      options: shuffle(options),
    };
  }

  function generate() {
    currentQuestion = questionInfinity();
  }

  onMount(() => {
    generate();
  });
</script>

{#if currentQuestion}
  <div class="flex flex-col gap-1">
    <div class="text-5xl text-center my-10 font-semibold">
      {currentQuestion.text}
    </div>
    <div class="grid-cols-2 grid gap-2 h-full">
      {#each currentQuestion.options as option}
        <button class="btn btn-md rounded-md text-3xl">{option.number}</button>
      {/each}
    </div>
  </div>
{:else}
  <div>Please wait question is generating...</div>
{/if}
