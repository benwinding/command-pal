# command-pal

A command pallete for the web, inspired by VScode.

## Installation

Either install from npm

`yarn add command-pal`

Or use the script tag

```html
<script src="https://cdn.jsdelivr.net/npm/command-pal"></script>
```

## Usage

``` js
const c = new CommandPal({
  hotkey: "ctrl+space",
  commands: [
    {
      name: "Goto Profile",
      goto: "profile",
    },
    {
      name: "Send Message",
      run: () => alert("Send Message"),
    },
    {
      name: "Goto About",
      goto: "about",
    },
    {
      name: "Search Contacts",
      run: () => alert("Searching contacts..."),
    },
  ],
});
c.start();
```
