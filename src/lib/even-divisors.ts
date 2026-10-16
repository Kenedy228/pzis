export type DivisorResult =
	| { kind: 'found'; minimum: number; maximum: number }
	| { kind: 'none' }
	| { kind: 'error'; message: string };

export function calculateEvenDivisors(input: string): DivisorResult {
	const text = input.trim();
	if (!/^[+-]?[0-9]+$/.test(text)) {
		return {
			kind: 'error',
			message: 'Введите целое число в десятичной записи, например 12 или −12.'
		};
	}

	const number = Number(text);
	if (!Number.isSafeInteger(number)) {
		return {
			kind: 'error',
			message: 'Введите число от −9007199254740991 до 9007199254740991.'
		};
	}
	if (number === 0) {
		return {
			kind: 'error',
			message: 'У нуля нет максимального положительного чётного делителя.'
		};
	}

	const magnitude = Math.abs(number);
	return magnitude % 2 === 0 ? { kind: 'found', minimum: 2, maximum: magnitude } : { kind: 'none' };
}
