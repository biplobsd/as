<script lang="ts">
  import {
    runtime,
    runtimeMessageSchema,
    type RuntimeMessage,
  } from "src/utils/communication";
  import UserCircleIcon from "./icons/User_circle_Icon.svelte";
  import log from "src/utils/logger";
  import { onDestroy, onMount } from "svelte";

  import { isUserLoggedWritable, starWritable } from "src/utils/storage";

  import { get } from "svelte/store";
  import type { RMUser } from "src/utils/schema";
  import { leaderboardRMUser } from "src/utils/writable";
  import { delay, requestUserSetting, setUserSetting } from "src/utils/helper";
  import { setDefaultUserSetting } from "./setting/mode/mode_default";

  let isRunning: boolean = false;
  let storageRemoveListener: () => void;
  let rmUser: RMUser | null;

  let lastStatusData: RuntimeMessage | undefined = undefined;

  async function parseData(dataLocal: RuntimeMessage) {
    const validationResult = await runtimeMessageSchema.safeParseAsync(
      dataLocal
    );

    if (!validationResult.success) {
      lastStatusData = undefined;
      return;
    }

    lastStatusData = validationResult.data;

    log.info(lastStatusData);

    if (
      lastStatusData.type === "status" ||
      lastStatusData.type === "statusOption"
    ) {
      const status = lastStatusData.status;
      log.info(status.msg);
      switch (status.code) {
        case "loading":
          isRunning = true;
          return;
        case "accept":
          isRunning = false;
          return;
        case "error":
          isRunning = false;
          return;
        case "logoutSuccessful":
          rmUser = null;
          isUserLoggedWritable.set(false);
          setDefaultUserSetting();
          isRunning = false;
        default:
          return;
      }
    } else if (dataLocal.type === "dataOptionUser") {
      rmUser = dataLocal.user;
      isUserLoggedWritable.set(true);
      starWritable.set(rmUser.star);
      isRunning = false;
      await delay(10);
      await requestUserSetting();
    } else if (dataLocal.type === "dataOptionTop10User") {
      leaderboardRMUser.set(dataLocal.users);
    } else if (dataLocal.type === "dataOptionUserSetting") {
      setUserSetting(dataLocal.userSetting);
    }
  }

  async function getRMUser() {
    await runtime.send({
      type: "statusBackground",
      status: {
        code: "user",
        msg: "get the RM user",
      },
    });
  }

  async function logout() {
    await runtime.send({
      type: "statusBackground",
      status: {
        code: "logout",
        msg: "Logout current user",
      },
    });
  }

  onMount(async () => {
    runtime.isOptionsPage = true;
    storageRemoveListener = runtime.addListener(parseData);

    await delay(10);
    if (get(isUserLoggedWritable)) {
      await getRMUser();
    }
  });

  onDestroy(async () => {
    storageRemoveListener();
    await runtime.send({
      type: "statusBackground",
      status: {
        code: "top10UserStop",
        msg: "Start listener",
      },
    });
  });
</script>

{#if isRunning}
  <span class="loading loading-spinner loading-xs" />
{:else if rmUser}
  <div class="dropdown dropdown-end">
    <div
      tabIndex={0}
      class="avatar tooltip tooltip-left normal-case font-medium tooltip-info"
      data-tip={rmUser.displayName}
    >
      <div class="mask mask-squircle btn btn-xs btn-ghost btn-circle !m-0 !p-0">
        <div
          class="avatar rounded-full placeholder flex justify-center items-center"
        >
          <img src={rmUser.photoURL} alt={rmUser.displayName} />
        </div>
      </div>
    </div>
    <ul
      tabIndex={0}
      class="mt-1 z-[1] p-1 shadow-2xl menu menu-xs dropdown-content rounded-md backdrop-blur bg-base-content/10 ring ring-success/20"
    >
      <li>
        <button
          disabled={isRunning}
          on:click={logout}
          class="btn btn-xs btn-ghost normal-case">Logout</button
        >
      </li>
    </ul>
  </div>
{:else}
  <div
    class="tooltip tooltip-left font-normal tooltip-info"
    data-tip="Sign in with Google"
  >
    <button
      class="btn btn-xs btn-ghost btn-circle !m-0 !p-0"
      on:click={getRMUser}
    >
      <UserCircleIcon />
    </button>
  </div>
{/if}
