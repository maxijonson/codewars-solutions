/**
 * Squares numbers and calculates the sum of them
 * @param numbers an array of numbers that will be squared
 * @returns the sum of the squared numbers
 * @see [Square(n) Sum](https://www.codewars.com/kata/515e271a311df0350d00000f/typescript)
 */
export const squareSum = (numbers: number[]) =>
    numbers.reduce((sum, n) => sum + n ** 2, 0);
