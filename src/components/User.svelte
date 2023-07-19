<script lang="ts">
  import {
    runtime,
    runtimeMessageSchema,
    type RuntimeMessage,
  } from "src/utils/communication";
  import UserCircleIcon from "./icons/User_circle_Icon.svelte";
  import log from "src/utils/logger";
  import { signInWithCredentialAccessToken } from "src/utils/firebase";
  import { onDestroy, onMount } from "svelte";
  import { type UserCredential } from "firebase/auth";
  import { isDarkThemeWritable, isUserLoggedWritable } from "src/utils/storage";
  import { get } from "svelte/store";

  let ready: boolean = false;
  let isRunning: boolean = false;
  let storageRemoveListener: () => void;
  let userCredential: UserCredential | null;
  let isLight = false;

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
      console.log(status.msg);
      switch (status.code) {
        case "loading":
          isRunning = true;
          return;
        case "ready":
          ready = true;
          return;
        case "accept":
          ready = true;
          isRunning = false;
          return;
        case "error":
          isRunning = false;
          ready = true;
          return;
        default:
          return;
      }
    } else if (dataLocal.type === "dataOptionAuthToken") {
      isRunning = false;
      userCredential = await signInWithCredentialAccessToken(
        dataLocal.authToken
      );
      isUserLoggedWritable.set(true);
    }
  }

  async function getAuthToken() {
    await runtime.send({
      type: "statusBackground",
      status: {
        code: "authToken",
        msg: "get the auth token",
      },
    });
  }

  onMount(async () => {
    if (get(isUserLoggedWritable)) {
      await getAuthToken();
    }

    runtime.isOptionsPage = true;
    storageRemoveListener = runtime.addListener(parseData);

    isDarkThemeWritable.subscribe((modeValue) => {
      isLight = modeValue === "light";
    });
  });

  onDestroy(() => {
    storageRemoveListener();
  });
</script>

{#if isRunning}
  <span class="loading loading-spinner loading-xs" />
{:else if userCredential}
  <div
    class="avatar tooltip tooltip-left"
    data-tip={userCredential.user.displayName}
  >
    <div class="mask mask-squircle btn btn-xs btn-ghost btn-circle !m-0 !p-0">
      <div
        class="avatar rounded-full placeholder flex justify-center items-center"
      >
        <img
          src={userCredential.user.photoURL}
          alt={userCredential.user.displayName}
        />
      </div>
    </div>
  </div>
{:else}
  <div
    class="tooltip tooltip-left font-normal tooltip-info"
    data-tip="Sign in with Google"
  >
    <button
      class="btn btn-xs btn-ghost btn-circle !m-0 !p-0"
      on:click={getAuthToken}
    >
      <UserCircleIcon />
    </button>
  </div>
{/if}
