<script lang="ts">
  import "src/popup/styles.css";
  import "@splidejs/svelte-splide/css";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import Main from "./Main.svelte";
  import { Toaster } from "svelte-french-toast";
</script>

<div
  class="w-72 h-full mt-4 mx-3 px-1 items-center overflow-hidden justify-between flex flex-col gap-2 tracking-wider"
>
  <div class="w-full">
    <Header />
    <Main />
  </div>
  <Footer />
</div>
<Toaster
  toastOptions={{
    className:
      "!ring ring-success/20 !tracking-wider !font-bold !bg-base-300/40 !backdrop-blur !text-base-content",
  }}
/>
