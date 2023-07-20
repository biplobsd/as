<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import TableRow from "../leaderboard/Table_Row.svelte";
  import { leaderboardRMUser, leaderboardUserCount } from "src/utils/writable";
  import { get } from "svelte/store";
  import type { RMUser } from "src/utils/schema";
  import { runtime } from "src/utils/communication";
  let users: RMUser[] | null = null;

  onMount(async () => {
    leaderboardRMUser.subscribe((x) => {
      if (x) {
        leaderboardUserCount.set(x.length);
        users = x;
      }
    });

    await runtime.send({
      type: "statusBackground",
      status: {
        code: "top10UserStart",
        msg: "Start listener",
      },
    });
  });

  onDestroy(async () => {
    console.log("Destroy");
    await runtime.send({
      type: "statusBackground",
      status: {
        code: "top10UserStop",
        msg: "Start listener",
      },
    });
  });
</script>

<div class="w-full text-center text-lg">Top 10</div>
<div class="overflow-x-auto">
  <table class="table table-xs">
    <thead>
      <tr>
        <th>No</th>
        <th colspan="2">Name</th>
        <th class="text-right">Star</th>
      </tr>
    </thead>
    <tbody>
      {#if users}
        {#each users as rmUser, index}
          <TableRow no={index + 1} {rmUser} />
        {/each}
      {:else}
        {#each Array.from({ length: get(leaderboardUserCount) + 1 }) as _}
          <TableRow placeholder />
        {/each}
      {/if}
    </tbody>
  </table>
</div>
