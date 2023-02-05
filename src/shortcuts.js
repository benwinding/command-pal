import hotkeys from "hotkeys-js";

export const asyncTimeout = ms => new Promise(res => setTimeout(res, ms));

export function initShortCuts(bindToInputsToo) {
  if (bindToInputsToo) {
    /* 
    Allows binding to input, select and textarea
    https://stackoverflow.com/questions/59855852/input-blocks-hotkeys
    Appears to not work. Setting scope to "all" does work. // rouilj
    */
    hotkeys.filter = function(event){
      var tagName = (event.target || event.srcElement).tagName;
      hotkeys.setScope('all');
      return true;
    }
  }
}

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
