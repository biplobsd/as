<script>
  import { APP_NAME, REPO_URL, VERSION } from "src/utils/constants";
  import MenuBox from "../about/menu_box.svelte";
</script>

<div class="space-y-0 rounded-box overflow-hidden py-2 bg-base-200">
  <MenuBox title="App name" text={APP_NAME} />
  <MenuBox title="Version" text={`${VERSION} 2023`} />
  <MenuBox
    title="Email"
    text="biplobsd11@gmail.com"
    link="mainto:biplobsd11@gmail.com"
  />
  <MenuBox title="Source code" text={REPO_URL} link={REPO_URL} />
  <MenuBox
    title="Blogs"
    text="https://biplobsd.github.io"
    link="https://biplobsd.github.io"
  />
  <MenuBox
    title="Developer name"
    text="Biplob Kumar Sutradhar"
    link="https://github.com/biplobsd"
  />
</div>
