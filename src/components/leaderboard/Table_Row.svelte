<script lang="ts">
  import type { RMUser } from "src/utils/interface";
  import { blur, slide } from "svelte/transition";
  import tc from "thousands-counter";

  export let no: number | undefined = undefined;
  export let rmUser: RMUser | undefined = undefined;
  export let placeholder: boolean | undefined = undefined;
</script>

<tr transition:blur class="hover">
  <th class="w-4">
    {#if placeholder}
      <div transition:slide class="ph-blank" />
    {:else}
      {#key no}
        <div transition:slide>
          {no}
        </div>
      {/key}
    {/if}
  </th>
  <td class="w-5 h-5">
    {#if placeholder}
      <div transition:slide class="ph-blank w-4 rounded-full" />
    {:else if rmUser}
      {#key rmUser.photoURL}
        <div class="avatar">
          <div class="mask mask-squircle w-5 h-5">
            <img src={rmUser.photoURL} alt={rmUser.displayName} />
          </div>
        </div>
      {/key}
    {/if}
  </td>
  <td class="text-left">
    {#if placeholder}
      <div transition:slide class="ph-blank" />
    {:else if rmUser}
      {#key rmUser.displayName}
        <div transition:slide class="font-bold">
          {rmUser.displayName}
        </div>
      {/key}
    {/if}
  </td>
  <td class="text-right w-8">
    {#if placeholder}
      <div transition:slide class="ph-blank" />
    {:else if rmUser}
      {#key rmUser.star}
        <div transition:slide>
          {tc(rmUser.star, { digits: 2 })}
        </div>
      {/key}
    {/if}
  </td>
</tr>
