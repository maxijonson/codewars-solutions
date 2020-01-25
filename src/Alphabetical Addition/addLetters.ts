/**
 * Adds up multiple letters together. If the sum is bigger than 'z', the letters will overflow back to 'a'.
 *
 * @param letters the letters to sum. They should be lowercase alpha characters.
 * @returns the resulting letter of the sum or 'z' if no letter is specified
 * @see [Alphabetical Addition](https://www.codewars.com/kata/5d50e3914861a500121e1958/typescript)
 *
 * Examples
 * ```
 * addLetters('a', 'b', 'c') // = 'f'
 * addLetters('a', 'b') // = 'c'
 * addLetters('z') // = 'z'
 * addLetters('z', 'a') // = 'a'
 * addLetters('y', 'c', 'b') // = 'd' notice the letters overflowing
 * addLetters() // = 'z'
 * ```
 */
export const addLetters = (...letters: string[]) => {
    if (letters.length == 0) return "z";
    const offset = 96;
    const modulo = 26;
    const sum =
        letters.reduce(
            (acc, letter) => acc + letter.charCodeAt(0) - offset,
            0
        ) % modulo;
    return sum ? String.fromCharCode((sum % modulo) + offset) : "z";
};
