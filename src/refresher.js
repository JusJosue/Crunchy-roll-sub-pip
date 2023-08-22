const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

window.addEventListener("message", (ev) => {
  if (ev.origin != "https://static.crunchyroll.com") {
    return;
  }
  const data = JSON.parse(ev.data);
  if (data.event == "subtitles_changed") {
    (async () => {
      console.log("refreshing soon...");
      await wait(1000);
      window.location.reload();
    })();
  }
});
