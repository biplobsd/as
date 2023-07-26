<script lang="ts">
  import { delay } from "src/utils/helper";
  import { starWritable, typeWritable } from "src/utils/storage";
  import { clsx } from "clsx";

  import type { QuestionPack, Option } from "src/utils/interface";
  import { increaseNumberAfterWritable } from "src/utils/writable";
  import { slide } from "svelte/transition";
  import { runtime } from "src/utils/communication";
  import ArrowPath from "../icons/Arrow_Path.svelte";
  import { onMount } from "svelte";
  import CheckIcon from "../icons/Check_Icon.svelte";

  let showAns: boolean = false;
  let showAnsBtnIndex: number;
  let type: boolean;
  let inputValue = "";
  let isCorrect = false;

  export let stop: boolean;
  export let currentQuestion: QuestionPack | null = null;
  export let startFun: () => Promise<void>;
  export let warningScreen: boolean;

  async function checkAns({
    option,
    index,
    typeNumber,
  }: {
    option?: Option;
    index?: number;
    typeNumber?: number;
  }) {
    if (showAns || warningScreen || !currentQuestion) return;
    if (index) {
      showAnsBtnIndex = index;
    }

    if (option) {
      isCorrect = option.correct;
    } else {
      isCorrect =
        typeNumber === currentQuestion.options.find((x) => x.correct)?.number;
    }

    showAns = true;
    stop = true;
    await delay(100);
    showAns = false;
    inputValue = "";

    if (isCorrect) {
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
    let option;

    switch (e.key) {
      case "ArrowUp":
        option = options[0];
        option.btn.focus();
        await checkAns({ option, index: 0 });
        break;
      case "ArrowDown":
        option = options[1];
        option.btn.focus();
        await checkAns({ option, index: 1 });
        break;
      case "ArrowLeft":
        option = options[2];
        option.btn.focus();
        await checkAns({ option, index: 2 });
        break;
      case "ArrowRight":
        option = options[3];
        option.btn.focus();
        await checkAns({ option, index: 3 });
        break;
    }
  }

  const handleSubmit = () => {
    checkAns({ typeNumber: +inputValue });
  };

  onMount(() => {
    typeWritable.subscribe((x) => (type = x));
  });
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
      {#if type}
        <form on:submit|preventDefault={handleSubmit} class="space-y-2">
          <input
            type="number"
            placeholder="Correct number"
            class={clsx(
              "input input-bordered w-full",
              showAns ? (isCorrect ? "input-success" : "input-error") : ""
            )}
            bind:value={inputValue}
          />
          <button class="btn w-full"><CheckIcon />Submit</button>
        </form>
      {:else}
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
              on:click={() => checkAns({ option, index })}
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
      {/if}
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
