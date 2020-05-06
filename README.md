<h1 align="center" style="font-family: mono">command-pal</h1>
<p align="center">⌨ An embeddable command pallete for the web, inspired by VScode.</p>

![screen cap](https://i.imgur.com/S305K5Y.gif)

## Features

- Similar to VScode's ctrl+p command palette
- Keyboard first control (configurable)
- Add custom commands
- Fuzzy text matching (fuse.js)
- Small size (<20kb)
- Themeable

## Why?

The command palette is an amazing GUI concept which allows for ...

## Who?

Most people

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

## Local Development

To develop on `command-pal` simply clone, install and run

```
npm run dev
```
