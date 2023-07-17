import Popup from "src/components/Popup.svelte";
import log from "src/utils/logger";

const target = document.getElementById("app");

function render() {
  if (target) {
    new Popup({
      target,
    });
  } else {
    log.error("Unable to find app element");
  }
}

document.addEventListener("DOMContentLoaded", render);
