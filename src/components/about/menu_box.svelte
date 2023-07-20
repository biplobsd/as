<script lang="ts">
  import toast from "svelte-french-toast";
  import copy from "copy-text-to-clipboard";
  import ClipboardCopyIcon from "../icons/Clipboard_Copy_Icon.svelte";

  export let title: string;
  export let text: string;
  export let link: string | undefined = undefined;
</script>

<ul class="menu bg-base-200 !p-0">
  <li class="">
    <h2 class="menu-title !py-1">{title}</h2>
    <ul class="!p-0">
      <li class="relative group">
        <div
          class=" hidden hover:bg-transparent group-hover:flex absolute h-full justify-center !m-0 !p-0 right-0.5"
        >
          <button
            class="btn btn-xs !p-1"
            on:click={() => {
              const toastID = toast.loading(`Copying... ${title}`);
              if (copy(text)) {
                toast.success(`${title} copied! `, {
                  id: toastID,
                });
              } else {
                toast.error("Failed copy to clipboard!", {
                  id: toastID,
                });
              }
            }}><ClipboardCopyIcon /></button
          >
        </div>
        {#if link}
          <a
            href={link}
            class="link link-hover"
            target="_blank"
            rel="noreferrer">{text}</a
          >
        {:else}
          <p class="!py-1">{text}</p>
        {/if}
      </li>
    </ul>
  </li>
</ul>
