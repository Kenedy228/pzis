import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('Вычисление с клавиатуры, отсутствие делителей и сброс прежнего результата', async ({
	page
}) => {
	await page.goto('/');
	const input = page.getByRole('textbox', { name: 'Целое число' });
	await page.keyboard.press('Tab');
	await expect(input).toBeFocused();
	await input.fill('-12');
	await page.keyboard.press('Tab');
	await expect(page.getByRole('button', { name: 'Вычислить' })).toBeFocused();
	await page.keyboard.press('Enter');
	const result = page.getByRole('status');
	await expect(result).toContainText('Минимальный чётный делитель');
	await expect(result).toContainText('Максимальный чётный делитель');
	await expect(result.getByRole('definition')).toHaveText(['2', '12']);
	await input.fill('7');
	await expect(result).toBeEmpty();
	await input.press('Enter');
	await expect(result).toHaveText('Чётных делителей нет');
	await expect(input).toHaveAttribute('aria-invalid', 'false');
});

test('Ошибка связана с полем, очищается при вводе и позволяет исправить число', async ({
	page
}) => {
	await page.goto('/');
	const input = page.getByRole('textbox', { name: 'Целое число' });
	await input.fill('12abc');
	await input.press('Enter');
	await expect(input).toHaveAttribute('aria-invalid', 'true');
	await expect(input).toHaveAccessibleDescription(/Введите целое число/);
	await expect(page.getByRole('alert')).toContainText('Введите целое число');
	await expect(page.getByRole('status')).toBeEmpty();
	await input.fill('6');
	await expect(page.getByRole('alert')).toHaveCount(0);
	await expect(input).toHaveAttribute('aria-invalid', 'false');
	await page.getByRole('button', { name: 'Вычислить' }).click();
	await expect(page.getByRole('status').getByRole('definition')).toHaveText(['2', '6']);
});

test('Страница и сообщения доступны; на экране 320 px нет переполнения', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 640 });
	await page.goto('/');
	const input = page.getByRole('textbox', { name: 'Целое число' });
	for (const value of ['9007199254740990', '0', '7']) {
		await input.fill(value);
		await input.press('Enter');
		const scan = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(scan.violations).toEqual([]);
		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
		).toBe(true);
	}
});
