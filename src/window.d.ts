export {};

declare global {
  interface Window {
    // Reference the CommandPal class globally    
    CommandPal: any;
    // debugging to prevent the palette disappearing
    commandPalIgnoreBlur: () => void;
  }
}
