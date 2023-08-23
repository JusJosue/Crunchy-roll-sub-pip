import { getToggle, setToggle } from "../util/toggles.js";
import { wait } from "../util/wait.js";

const hardsubSwitch = document.querySelector("#hardsub-switch");
const refreshSwitch = document.querySelector("#refresh-switch");

const updateState = async () => {
  hardsubSwitch.checked = await getToggle("hardsub");
  refreshSwitch.checked = await getToggle("refresh");

  refreshSwitch.disabled = !hardsubSwitch.checked;
};

const hardsubSwitchHandler = async (ev) => {
  console.log("clicked hardsub switch");
  await setToggle("hardsub", hardsubSwitch.checked);
  await updateState();

  (async () => {
    const tabs = await browser.tabs.query({
      url: "https://www.crunchyroll.com/watch/*",
    });
    for (let t of tabs) {
      browser.tabs.reload(t.id);
      wait(500);
    }
  })();
};

const refreshSwitchHandler = async (ev) => {
  console.log("clicked refresh switch");
  await setToggle("refresh", refreshSwitch.checked);
  updateState();
};

hardsubSwitch.addEventListener("change", hardsubSwitchHandler);
refreshSwitch.addEventListener("change", refreshSwitchHandler);

updateState();
