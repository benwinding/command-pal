<h1 align="center" style="font-family: mono">command-pal</h1>
<p align="center">⌨ The hackable command pallete for the web, inspired by <a href="https://github.com/microsoft/vscode">Visual Studio Code</a>.</p>

![screen cap](https://i.imgur.com/S305K5Y.gif)

## What is a command palette?

Command palettes are incredibly useful, they provide a flexible and efficient way of running commands in an environment. They allow the user to discover functions and quickly lookup functions.

- Keyboard first control (shortcuts configurable)
- Custom commands
- Fuzzy text matching (fuse.js)
- Themeable (theme-light.css and theme-dark.css included)

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

## Usage - Simple

``` js
const c = new CommandPal({
  hotkey: "ctrl+space",
  commands: [
    {
      name: "Send Message",
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
    {
      name: "Goto About",
      handler: () => window.location.hash = "about",
    },
  ],
});
c.start();
```

## Usage - Avanced

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
