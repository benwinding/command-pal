<h1 align="center" style="font-family: mono">command-pal</h1>
<p align="center">⌨ The hackable command palette for the web, inspired by <a href="https://github.com/microsoft/vscode">Visual Studio Code</a>.</p>

![screen cap](https://i.imgur.com/jhJjLVL.gif)

## Benefit's of Command Palettes

- **Ease of use**
	- Simply 1 keyboard shortcut to remember
	- Fuzzy search allows you to find commands easily
- **Speed**
	- Keyboard makes it fast to access any command/function
	- Fuzzy search allows for quick ordering of commands
	- Efficient to find a commands that you used once a long time ago
- **Discoverability**
	- You can scroll down the entire list of commands
	- Find commands by simply searching the Command palette
	- Tips and functions can be given to you as you type

## Features

- JS framework agnostic (can be attached to any site)
- Keyboard first control (shortcuts configurable)
- Custom commands
- Nested commands
- Fuzzy text matching (fuse.js)
- Themeable (theme-light.css and theme-dark.css included)
- Mobile friendly (button in bottom-left)

![screen cap](https://i.imgur.com/Bb6njpV.gif)

**Links**

- [Demo](https://benwinding.github.io/command-pal/demos/cp-advanced)
- [Demo Simple](https://benwinding.github.io/command-pal/demos/cp-simple)
- [Code Pen](https://codepen.io/benaloney/pen/BaobQmd)

## Why?

_Command Palettes_ have alwyas impressed me with how easy they are to use and develop for. I rarely see them on the web platform, so I thought I'd give it a shot.

## Get Started

### Install

Either install from npm

`yarn add command-pal`

Or use the script tag

```html
<script src="https://cdn.jsdelivr.net/npm/command-pal"></script>
```

### Usage - Simple

``` js
const c = new CommandPal({
  hotkey: "ctrl+space",
  commands: [
    {
      name: "Send Message",
      shortcut: "ctrl+m",
      handler: () => alert("Send Message"),
    },
    {
      name: "Search Contacts",
      handler: () => alert("Searching contacts..."),
    },
    {
      name: "Goto Profile",
      shortcut: "ctrl+4",
      handler: () => window.location.hash = "profile",
    },
  ],
});
c.start();
```

### Usage - Avanced

``` js
const c = new CommandPal({
  hotkey: "ctrl+space",
  commands: [
    {
      name: "Change Language",
      children: [
        {
          name: "English",
          handler: () => alert("Changing to English")
        },
        {
          name: "Spanglish",
          handler: () => alert("Changing to Spanglish")
        }
      ]
    },
    {
      name: "Goto About",
      handler: () => window.location.hash = "about",
    },
  ],
});
c.start();
```

## API

### CommandPal instance
``` js
const c = new CommandPal({
  hotkey: "ctrl+space",
  commands: [
    // Commands go here
  ]
});
// Start the instance
c.start()
// Destroy the instance
c.destroy()
```

### Subscribe to events
There's a few events that can be subscribed to during command-pal's execution.

``` js
// When a command is executed
c.subscribe("exec", (e) => { console.log("exec", { e }); });
// On TextChanged
c.subscribe("textChanged", (e) => { console.log("textChanged", { e }); });
// When a command palette is opened
c.subscribe("opened", (e) => { console.log("opened", { e }); });
// When a command palette is closed
c.subscribe("closed", (e) => { console.log("closed", { e }); });
```

### Command Item

``` js
{
  // Required name of command (displayed)
  name: "Open Messages",
  // Required name of command (displayed)
  description: "View all messages in inbox",
  // Shortcut of command
  shortcut: "ctrl+3",
  // Callback function of the command to execute
  handler: (e) => {
    // DO SOMETHING
  }
  // Child commands which can be executed
  children: [...]
},
```

### Command Item Child

Note: Child commands cannot have shortcuts.

``` js
{
  // Required name of command (displayed)
  name: "Open Messages",
  // Required name of command (displayed)
  description: "View all messages in inbox",
  // Callback function of the command to execute
  handler: (e) => {
    // DO SOMETHING
  }
},
```

## Local Development

To develop on `command-pal` simply clone, install and run

```
npm run dev
```

Have a go, PR's and issues always welcome.

## Prior Art
Many applications have implemented this before, here's a few. My favourite implementation is the VScode, which is the main influence for this project.

**Editors**

- [VScode (Text Editor)](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_command-palette)
- [Sublime (Text Editor)](https://www.sublimetext.com/)
- [Atom (Text Editor)](https://atom.io/packages/command-palette)
- [Webstorm's Search Everywhere (IDE)](https://www.jetbrains.com/help/webstorm/searching-everywhere.html?search=search)
- [Caret (Markdown Editor)](https://caret.io/v2)
- [Commander (Eclipse Plugin)](https://github.com/dakaraphi/eclipse-plugin-commander#kavi-implemented-features-for-all-interfaces)

**Misc**

- [Fman (File Manager)](https://fman.io/)
- [Plotinus (GTK desktop extension)](https://github.com/p-e-w/plotinus)
- [command-palette (Wordpress Extension)](https://wordpress.org/plugins/command-palette/)
- [Vimium (Browser Extension)](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)
- [JupyterLab (Notebook)](https://jupyterlab.readthedocs.io/en/stable/user/commands.html)
