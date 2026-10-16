import { describe, expect, it } from 'vitest';
import { calculateEvenDivisors } from './even-divisors';

describe('Положительные чётные делители', () => {
	it.each([
		['2', 2],
		['-2', 2],
		['6', 6],
		['12', 12],
		['-12', 12],
		['100', 100],
		['  +12  ', 12],
		['0012', 12],
		['9007199254740990', 9007199254740990],
		['-9007199254740990', 9007199254740990]
	])('для %s возвращает точные границы', (input, maximum) => {
		expect(calculateEvenDivisors(input)).toEqual({ kind: 'found', minimum: 2, maximum });
	});

	it.each(['1', '7', '-7', '9007199254740991', '-9007199254740991'])(
		'для нечётного %s сообщает об отсутствии делителей',
		(input) => {
			expect(calculateEvenDivisors(input)).toEqual({ kind: 'none' });
		}
	);

	it.each(['0', '-0', '+000'])('отклоняет ноль %s', (input) => {
		expect(calculateEvenDivisors(input)).toEqual({
			kind: 'error',
			message: 'У нуля нет максимального положительного чётного делителя.'
		});
	});

	it.each([
		'',
		'   ',
		'2.5',
		'12.0',
		'12abc',
		'1e3',
		'0x10',
		'Infinity',
		'NaN',
		'+',
		'1 2',
		'12\n3'
	])('отклоняет недопустимую запись %j целиком', (input) => {
		expect(calculateEvenDivisors(input)).toEqual({
			kind: 'error',
			message: 'Введите целое число в десятичной записи, например 12 или −12.'
		});
	});

	it.each(['9007199254740992', '-9007199254740992', '9'.repeat(400)])(
		'отклоняет число за безопасной границей',
		(input) => {
			expect(calculateEvenDivisors(input)).toEqual({
				kind: 'error',
				message: 'Введите число от −9007199254740991 до 9007199254740991.'
			});
		}
	);
});
