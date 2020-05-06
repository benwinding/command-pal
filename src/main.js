import App from "./App.svelte";
import pubsub from "micro-pubsub";

class CommandPal {
  constructor(options) {
    console.log("CommandPal", { options });
    this.options = options || {};
    this.ps = pubsub.create();
  }

  start() {
    this.app = new App({
      target: document.body,
      props: {
        shortcutKey: this.options.hotkey || "ctrl+shift+p",
        items: this.options.commands || [],
      },
    });
    const ctx = this;
    function subTo(eventName) {
      ctx.app.$on(eventName, (e) => ctx.ps.publish(eventName, e.detail));
    }
    subTo("open");
    subTo("closed");
    subTo("textChanged");
    subTo("exec");
    this.ps.subscribe('exec', (item) => {
      if (item.handler && typeof item.handler === 'function') {
        item.handler()
      }
      if (!!item.goto && typeof item.goto === 'string') {
        window.location.hash = item.goto;
      }
    });
  }

  subscribe(eventName, cb) {
    this.ps.subscribe(eventName, (e) => cb(e));
  }
}

export default CommandPal;
window.CommandPal = CommandPal;
