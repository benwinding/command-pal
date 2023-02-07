import hotkeys from "hotkeys-js";

export const asyncTimeout = ms => new Promise(res => setTimeout(res, ms));

export function initShortCuts(bindToInputsToo) {
  // create a closure over bindToInputsToo
  hotkeys.filter = function(event){
    // no filtering
    if ( bindToInputsToo ) { return true; }

    // .matches supported by all major browsers in 2017
    // document.activeElement.matches('[data-id=cp-SearchField]'
    // Replaced with dataset supported 2015 and maybe faster?
    if (document.activeElement.dataset['id'] === 'cp-SearchField' ) {
      // allow hotkey to always work in command-pal search input
      return true
    } else {
      // use hotkeys.js default filter rule
      // https://github.com/jaywcjlove/hotkeys/issues/321
      //   is not quite right: tagname = target.tagName not
      //   tagname = target. Corrected below.
      const target = event.target || event.srcElement;
      const tagName = target.tagName;
      // ignore: isContentEditable === 'true', <input> and
      // <textarea> when readOnly state is false, <select>
      return ! (target.isContentEditable ||
		((tagName === 'INPUT' ||
		  tagName === 'TEXTAREA' ||
		  tagName === 'SELECT') && !target.readOnly))
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
