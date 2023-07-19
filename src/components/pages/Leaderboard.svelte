<script lang="ts">
  import {
    limitToLast,
    onValue,
    orderByChild,
    query,
    ref,
  } from "firebase/database";
  import { db } from "src/utils/firebase";
  import type { RMUser } from "src/utils/interface";
  import { onMount } from "svelte";
  import TableRow from "../leaderboard/Table_Row.svelte";
  import { leaderboardUserCount } from "src/utils/writable";
  import { get } from "svelte/store";
  let users: RMUser[] | null = null;

  onMount(() => {
    const topUsersRef = query(
      ref(db, "users"),
      orderByChild("star"),
      limitToLast(10)
    );

    onValue(topUsersRef, (snapshot) => {
      leaderboardUserCount.set(snapshot.size);
      const rmUser: RMUser[] = [];
      snapshot.forEach((child) => {
        rmUser.push(child.val());
      });
      users = rmUser.reverse();
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
