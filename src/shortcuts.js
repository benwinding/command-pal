import hotkeys from "hotkeys-js";

export const asyncTimeout = ms => new Promise(res => setTimeout(res, ms));

export function setMainShortCut(shortcutKey, onExecCallback) {
  hotkeys.unbind(shortcutKey);
  hotkeys(shortcutKey, function (e) {
    e.preventDefault();
    onExecCallback()
  });
};

export function setAllShortCuts(items, onExecCallback) {
  items
    .filter((item) => item.shortcut)
    .map((item) => {
      hotkeys.unbind(item.shortcut);
      hotkeys(item.shortcut, async function (e) {
        e.preventDefault();
        onExecCallback(item)
      });
    });
};
