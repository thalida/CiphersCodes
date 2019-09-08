# {{cipher.NAME}}

## About
[{{cipher.NAME}}](http://en.wikipedia.org/wiki/Caesar_cipher) a popular substitution cipher, where the alphabet is shifted up or down a specified number of positions.

## Supports
✅ Perfect Decoding
✅ Uppercase letters (`A-Z`)
✅ Lowercase letters (`a-z`)
❌ Numbers (`0-9`)
❌ Symbols (`!@#$`)
❌ Emojis (`😍🤬👩🏾‍💻`)

**Numbers, Symbols, and Emojis**
Numbers, symbols, and emoji are **outputted as-is** by this cipher.

**What is "Perfect Decoding"?**
Perfect Decoding is when the decoded text exactly matches the text that was encoded.

## Source
[View {{cipher.NAME}} on Github](https://github.com/thalida/ciphers.codes/blob/master/src/ciphers/caesar/caesar.js)

---

## Formulas

### Encoding
```js
(letterPosition + shift) mod 26
```

### Decoding
```js
(letterPosition - shift) mod 26
```

---

## Live Example
Based on the current settings for {{cipher.NAME}}:
- `shift` = `{{cipher.INPUTS_BY_NAME.shift.value}}`

### Encoding Formula
```js
(letterPosition + {{cipher.INPUTS_BY_NAME.shift.value}}) mod 26
```

### Decoding Formula
```js
(letterPosition - {{cipher.INPUTS_BY_NAME.shift.value}}) mod 26
```


### Sample String
{{ cipher.SAMPLE_STRING }}

### When, **Encoded**
{{ cipher.encodingExample(cipher) }}

### Then, **Decoded**
{{ cipher.decodingExample(cipher) }}

---

## How it works
- `letterPosition` is the index of the letter
- `shift` any integer

### `letterPosition`
Index of the letter in the English alphabet (0-indexed). For example, A=0, B=1, C=2, and so on until Z=25.

### `shift`
Any integer, positive or negative. This number is used to "shift" the alphabet. For example, if shift=1, then B=0, C=1, D=2, until A=25.

### `mod 26`
Both formulas for encoding and decoding have `mod 26` which performs the modulo (%) operation on the output.

This is a safe-keeping action to guarantee the character is one of the 26 letters in the alphabet. [Javascript doesn't have proper support for mod](https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e) so this formula is used:
```js
export function mod (a, b) {
  return ((a % b) + b) % b
}
```
