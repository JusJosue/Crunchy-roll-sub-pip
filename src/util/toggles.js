// name: default
const toggles = {
  hardsub: true,
  refresh: true,
};

const getToggle = async (key) => {
  console.log(`getting ${key}`);
  const stored = await browser.storage.local.get(key);
  return key in stored ? stored[key] : toggles[key];
};

const setToggle = async (key, value) => {
  console.log(`setting ${key} to ${value}`);
  await browser.storage.local.set({ [key]: value });
};

export { toggles, getToggle, setToggle };
export default { toggles, getToggle, setToggle };
