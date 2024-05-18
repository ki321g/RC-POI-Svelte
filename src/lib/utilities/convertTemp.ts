/**
 * Converts a temperature value from Kelvin to Celsius or Fahrenheit.
 *
 * @param temp - The temperature value in Kelvin.
 * @param toUnit - The temperature unit to convert to, either "C" for Celsius or "F" for Fahrenheit.
 * @returns The converted temperature value.
 * @throws {Error} If an invalid temperature unit is provided.
 */
export const convertTemp = (temp: number, toUnit: 'C' | 'F') => {
	switch (toUnit) {
		case 'C':
			return temp - 273.15;
		case 'F':
			return (temp - 273.15) * (9 / 5) + 32;
		default:
			throw new Error('Invalid value stored in temp');
	}
};
