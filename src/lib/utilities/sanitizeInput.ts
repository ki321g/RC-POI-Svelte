/**
 * Sanitizes the input string by replacing HTML special characters with their encoded equivalents.
 *
 * @param input - The input string to be sanitized.
 * @returns The sanitized input string.
 */
export function sanitizeInput(input: string) {
	return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
