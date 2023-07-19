<script lang="ts">
  import { delay } from "src/utils/helper";
  import { starWritable } from "src/utils/storage";
  import { clsx } from "clsx";

  import type { QuestionPack, Option } from "src/utils/interface";
  import { increaseNumberAfterWritable } from "src/utils/writable";
  import { incrementStarServer } from "src/utils/firebase_update";

  let showAns: boolean = false;
  let showAnsBtnIndex: number;

  export let stop: boolean;
  export let currentQuestion: QuestionPack | null = null;

  async function checkAns(option: Option, index: number) {
    if (showAns) return;
    showAns = true;
    showAnsBtnIndex = index;
    await delay(100);
    stop = true;
    if (option.correct) {
      starWritable.update((x) => x + 1);
      increaseNumberAfterWritable.update((x) => x - 1);
      incrementStarServer();
    }
    showAns = false;
  }
</script>

{#if currentQuestion}
  <div class="flex flex-col gap-1">
    <div class="text-5xl text-center my-10 font-semibold">
      {currentQuestion.text}
    </div>
    <div class="grid-cols-2 grid gap-2 h-full">
      {#each currentQuestion.options as option, index}
        <button
          on:click={() => checkAns(option, index)}
          class={clsx(
            "btn btn-md rounded-md text-3xl",
            showAns && showAnsBtnIndex === index
              ? option.correct
                ? "focus:btn-success"
                : "focus:btn-error"
              : ""
          )}
        >
          {option.number}
        </button>
      {/each}
    </div>
  </div>
{:else}
  <div>Please wait question is generating...</div>
{/if}
