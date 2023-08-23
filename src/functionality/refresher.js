const loadModule = async (path) => {
  const src = browser.runtime.getURL(path);
  const contentMain = await import(src);
  return contentMain.default;
};

let getToggle = async () => {
  console.warn("getToggle() not properly loaded");
};
let wait = async () => {
  console.warn("wait() not properly loaded");
};

loadModule("src/util/toggles.js").then((res) => {
  getToggle = res.getToggle;
});
loadModule("src/util/wait.js").then((res) => {
  wait = res;
});

window.addEventListener("message", async (ev) => {
  if (ev.origin != "https://static.crunchyroll.com") {
    return;
  }
  const data = JSON.parse(ev.data);
  if (data.event == "subtitles_changed") {
    const hardsub = await getToggle("hardsub");
    const refresh = await getToggle("refresh");
    if (hardsub && refresh) {
      console.log("refreshing soon...");
      await wait(1000);
      window.location.reload();
    }
  }
});
