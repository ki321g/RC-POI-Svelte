/**
 * Converts the first character of the given string to uppercase, and returns the resulting string.
 *
 * @param sentence - The input string to convert to sentence case.
 * @returns The input string with the first character capitalized, or `null` if the input is not a string.
 */
export const toSentenceCase = (sentence: string): string => {
	if (typeof sentence === 'string') {
		return sentence[0].toUpperCase() + sentence.substring(1);
	}
	return null;
};
