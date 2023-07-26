<script lang="ts">
  import { delay } from "src/utils/helper";
  import { starWritable } from "src/utils/storage";
  import { clsx } from "clsx";

  import type { QuestionPack, Option } from "src/utils/interface";
  import { increaseNumberAfterWritable } from "src/utils/writable";
  import { slide } from "svelte/transition";
  import { runtime } from "src/utils/communication";
  import ArrowPath from "../icons/Arrow_Path.svelte";

  let showAns: boolean = false;
  let showAnsBtnIndex: number;

  export let stop: boolean;
  export let currentQuestion: QuestionPack | null = null;
  export let startFun: () => Promise<void>;
  export let warningScreen: boolean;

  async function checkAns(option: Option, index: number) {
    if (showAns || warningScreen) return;
    showAnsBtnIndex = index;
    showAns = true;
    stop = true;
    await delay(100);
    showAns = false;
    if (option.correct) {
      starWritable.update((x) => x + 1);
      increaseNumberAfterWritable.update((x) => x - 1);
      await runtime.send({
        type: "statusBackground",
        status: {
          code: "incrementStarServer",
          msg: "Add star count",
        },
      });
      await startFun();
    } else {
      warningScreen = true;
    }
  }

  async function onKeyDown(
    e: KeyboardEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) {
    if (!currentQuestion) return;
    const { options } = currentQuestion;
    let op;

    switch (e.key) {
      case "ArrowUp":
        op = options[0];
        op.btn.focus();
        await checkAns(op, 0);
        break;
      case "ArrowDown":
        op = options[1];
        op.btn.focus();
        await checkAns(op, 1);
        break;
      case "ArrowLeft":
        op = options[2];
        op.btn.focus();
        await checkAns(op, 2);
        break;
      case "ArrowRight":
        op = options[3];
        op.btn.focus();
        await checkAns(op, 3);
        break;
    }
  }
</script>

<div class="h-60">
  {#if currentQuestion}
    <div class="flex flex-col gap-1">
      <div class="text-5xl text-center my-10 font-semibold">
        {#key currentQuestion.text}
          <p transition:slide>
            {currentQuestion.text}
          </p>
        {/key}
      </div>
      <div
        role="button"
        tabindex="0"
        on:keydown={onKeyDown}
        aria-label="Press option by keyboard"
        class="grid-cols-2 grid gap-2"
      >
        {#each currentQuestion.options as option, index}
          <button
            bind:this={option.btn}
            on:click={() => checkAns(option, index)}
            class={clsx(
              "btn btn-md rounded-md w-full !py-0 !my-0",
              showAns && showAnsBtnIndex === index
                ? option.correct
                  ? "focus:btn-success"
                  : "focus:btn-error"
                : ""
            )}
          >
            <div>
              {#key option.number}
                <div class="text-3xl" transition:slide={{ duration: 100 }}>
                  {option.number}
                </div>
              {/key}
            </div>
          </button>
        {/each}
      </div>
    </div>
  {:else}
    <div class="flex justify-center h-full items-center flex-col">
      <div class="mb-2">
        <div class="animate-spin">
          <ArrowPath h="h-10" w="w-10" />
        </div>
      </div>
      Please wait question is generating...
    </div>
  {/if}
</div>
