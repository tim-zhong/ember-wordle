export const ROWS = 6;
export const COLS = 5;

export const ALPHABET = Array.from(Array(26)).map((e, i) =>
  String.fromCharCode(i + 65)
);

export const SPECIAL_KEY = {
  ENTER: { name: 'Enter', code: 'Enter' },
  BACKSPACE: { name: 'Backspace', code: 'Backspace' },
};

export const KEYBOARD = [
  [
    { name: 'Q', code: 'KeyQ' },
    { name: 'W', code: 'KeyW' },
    { name: 'E', code: 'KeyE' },
    { name: 'R', code: 'KeyR' },
    { name: 'T', code: 'KeyT' },
    { name: 'Y', code: 'KeyY' },
    { name: 'U', code: 'KeyU' },
    { name: 'I', code: 'KeyI' },
    { name: 'O', code: 'KeyO' },
    { name: 'P', code: 'KeyP' },
  ],
  [
    { name: 'A', code: 'KeyA' },
    { name: 'S', code: 'KeyS' },
    { name: 'D', code: 'KeyD' },
    { name: 'F', code: 'KeyF' },
    { name: 'G', code: 'KeyG' },
    { name: 'H', code: 'KeyH' },
    { name: 'J', code: 'KeyJ' },
    { name: 'K', code: 'KeyK' },
    { name: 'L', code: 'KeyL' },
  ],
  [
    SPECIAL_KEY.ENTER,
    { name: 'Z', code: 'KeyZ' },
    { name: 'X', code: 'KeyX' },
    { name: 'C', code: 'KeyC' },
    { name: 'V', code: 'KeyV' },
    { name: 'B', code: 'KeyB' },
    { name: 'N', code: 'KeyN' },
    { name: 'M', code: 'KeyM' },
    SPECIAL_KEY.BACKSPACE,
  ],
];
