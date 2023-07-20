import {
  ref,
  set,
  update,
  increment,
  get,
  child,
  limitToLast,
  onValue,
  orderByChild,
  query,
} from "firebase/database";

import { auth, db } from "./firebase";
import log from "./logger";
import type { UserCredential } from "firebase/auth";
import type { RMUser } from "./schema";
import { runtime } from "./communication";

export async function writeUserData({
  uid,
  star,
  displayName,
  photoURL,
}: {
  uid: string;
  displayName: string;
  photoURL: string;
  star: number;
}) {
  try {
    await set(ref(db, "users/" + uid), {
      displayName,
      photoURL,
      star,
    });
    return true;
  } catch (error) {
    log.error(error);
    // console.log(error);
    return false;
  }
}

export function incrementStarServer() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      const updates = {};

      // @ts-ignore
      updates[`users/${user.uid}/star`] = increment(1);

      update(ref(db), updates);
    }
  });
}

export function starToZero() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      const updates = {};

      // @ts-ignore
      updates[`users/${user.uid}/star`] = 0;

      update(ref(db), updates);
    }
  });
}

export async function setUserCredential(uc: UserCredential | null) {
  if (!uc || !uc.user.displayName || !uc.user.photoURL) return;

  const snapshot = await get(child(ref(db), `users/${uc.user.uid}`));

  if (snapshot.exists()) {
    return snapshot.val() as RMUser;
  } else {
    const user = {
      ...uc.user,
      star: 0,
    } as RMUser;
    if (
      // @ts-ignore
      await writeUserData(user)
    ) {
      return user;
    }
    return;
  }
}

export function onRMValueChangeListener() {
  const topUsersRef = query(
    ref(db, "users"),
    orderByChild("star"),
    limitToLast(10)
  );

  return onValue(topUsersRef, async (snapshot) => {
    const rmUser: RMUser[] = [];
    snapshot.forEach((child) => {
      rmUser.push(child.val());
    });
    const users = rmUser.reverse();
    await runtime.send({
      type: "dataOptionTop10User",
      users,
      status: {
        code: "users",
        msg: "Top 10 users",
      },
    });
  });
}
