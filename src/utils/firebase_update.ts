import { ref, set, update, increment } from "firebase/database";

import { auth, db } from "./firebase";
import log from "./logger";

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
