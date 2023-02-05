<h1 align="center" style="font-family: mono">command-pal</h1>
<p align="center">⌨ The hackable command palette for the web, inspired by <a href="https://github.com/microsoft/vscode">Visual Studio Code</a>.</p>
<div align="center">

<!-- [START badges] -->
[![NPM Version](https://img.shields.io/npm/v/command-pal.svg)](https://www.npmjs.com/package/command-pal) 
[![License](https://img.shields.io/npm/l/command-pal.svg)](https://github.com/benwinding/command-pal/blob/master/LICENSE) 
[![Downloads/week](https://img.shields.io/npm/dm/command-pal.svg)](https://www.npmjs.com/package/command-pal) 
[![Github Issues](https://img.shields.io/github/issues/benwinding/command-pal.svg)](https://github.com/benwinding/command-pal)
<!-- [END badges] -->

</div>

![screen cap](https://i.imgur.com/jhJjLVL.gif)

<div align="center">
  <i>Configure custom commands with custom keyboard shortcuts!</i>
</div>

## Demos

- [Demo Simple](https://benwinding.github.io/command-pal/demos/cp-simple)
- [Demo Advanced](https://benwinding.github.io/command-pal/demos/cp-advanced)
- [Demo Dynamic](https://benwinding.github.io/command-pal/demos/cp-dynamic)
- [Code Pen](https://codepen.io/benaloney/pen/BaobQmd)

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
- Dynamically Add/Remove commands
- Nested commands
- Fuzzy text matching (fuse.js)
- Themeable (theme-light.css and theme-dark.css included)
- Mobile friendly (button in bottom-left)

![screen cap](https://i.imgur.com/Bb6njpV.gif)

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
  placeholder: "Custom placeholder text...",
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
  hotkey: "ctrl+space",  // Launcher shortcut
  hotkeysGlobal: true,       // Makes shortcut keys work in any <textarea>, <input> or <select>
  placeholder: "Custom placeholder text...", //  Changes placeholder text of input
  displayHints: false,  // if true, aliases are displayed as command hints
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
  // Other names for the command that can be hints for the user
  aliases: [ "View", "See" ],
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

#### Aliases and Hints

The aliases property is included by the fuzzy search. So searching for
terms in the aliases array always works. Matches in the aliases array
are weighted twice that of the name or description fields. However
setting the `displayHints` option for `CommandPal` to `true` displays
the best matching alias next to the command.

For example suppose the `Open Messages` command has aliases of `See`
and `View`. Typing `se` will display `Open Messages (See)` indicating
that you should use the `Open Messages` command to see your messages.
It helps explain what's being matched and why `Open Messages` is
displayed when `see` is typed.  Similarly typing `vi` will produce
`Open Messages (View)` in the command list. If you were to type `v`
you would start with `Open Messages (View)` then typing `e` would
result in `Open Messages (See)`. By default `displayHints` is
disabled.

The fuse.js fuzzy matcher returns match info. This indicates where it
found matches to the search input.  This information is used to select
the top hint to display to the user. For each match in the aliases
array, the score is the count of the number of matching characters
with a little extra weight given to matches at the beginning of the
alias. If two terms have the same weight, the term more to the left in
the array is chosen. To get the best use from this, order your terms
putting the most used terms first in the array. This scoring method is
a work in progress and may change in the future.

Also keep your aliases short when possible. Don't include terms in the
alias that are already in the command. This helps prevent skewing of
the scores (due to the same term being matched multiple times). It also
keeps the command text size down making it more readable.
Aliases in non-Latin languages should work.

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

### Add/Remove Command's At Runtime

The command list is an observed array, which means you can modify it even after it's instantiated. The following snippet shows how commands can be dynamically added during runtime.

``` js
const commands = [
  {
    name: "Add Command to List",
    handler: () => {
      commands.push({
        name: 'New Command',
        handler: () => {
          // Do something
        },
      });
    },
  },
];
const c = new CommandPal({
  hotkey: "ctrl+space",
  commands: commands,
});
c.start();
```

## Local Development

To develop on `command-pal` simply clone, install and run

```
npm run dev
```
Then the following link:

- http://localhost:5005/cp-advanced/local-dev.html

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
