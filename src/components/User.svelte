<script lang="ts">
  import {
    runtime,
    runtimeMessageSchema,
    type RuntimeMessage,
  } from "src/utils/communication";
  import UserCircleIcon from "./icons/User_circle_Icon.svelte";
  import log from "src/utils/logger";
  import { db, signInWithCredentialAccessToken } from "src/utils/firebase";
  import { onDestroy, onMount } from "svelte";
  import { type UserCredential } from "firebase/auth";
  import {
    isDarkThemeWritable,
    isUserLoggedWritable,
    starWritable,
  } from "src/utils/storage";

  import { writeUserData } from "src/utils/firebase_update";
  import { type RMUser } from "src/utils/interface";
  import { get } from "svelte/store";
  import { child, get as dbGet, ref } from "firebase/database";

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
        case "logoutSuccessful":
          userCredential = null;
          isUserLoggedWritable.set(false);
          isRunning = false;
        default:
          return;
      }
    } else if (dataLocal.type === "dataOptionAuthToken") {
      isRunning = false;
      isRunning = true;
      await setUserCredential(
        await signInWithCredentialAccessToken(dataLocal.authToken)
      );
      isRunning = false;
    }
  }

  async function setUserCredential(uc: UserCredential | null) {
    if (!uc || !uc.user.displayName || !uc.user.photoURL) return;

    const snapshot = await dbGet(child(ref(db), `users/${uc.user.uid}`));
    if (snapshot.exists()) {
      const user = snapshot.val() as RMUser;
      starWritable.set(user.star);
    } else {
      if (
        // @ts-ignore
        await writeUserData({
          ...uc.user,
          star: 0,
        })
      ) {
        starWritable.set(0);
      }
    }

    userCredential = uc;
    isUserLoggedWritable.set(true);
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
  <div class="dropdown dropdown-end">
    <div
      tabIndex={0}
      class="avatar tooltip tooltip-left normal-case font-medium tooltip-info"
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
      on:click={getAuthToken}
    >
      <UserCircleIcon />
    </button>
  </div>
{/if}
