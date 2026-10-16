<script lang="ts">
	import { calculateEvenDivisors, type DivisorResult } from '#lib/even-divisors.ts';

	let input = $state('');
	let outcome = $state<DivisorResult | null>(null);
	let error = $derived(outcome?.kind === 'error' ? outcome.message : null);

	function calculate(event: SubmitEvent): void {
		event.preventDefault();
		outcome = calculateEvenDivisors(input);
	}
</script>

<svelte:head>
	<title>Чётные делители — задача № 6</title>
	<meta
		name="description"
		content="Минимальный и максимальный положительные чётные делители целого числа."
	/>
</svelte:head>

<main>
	<header>
		<h1>Чётные делители</h1>
		<p>Введите целое число, чтобы найти его максимальный и минимальный чётные делители.</p>
	</header>

	<section class="card" aria-label="Вычисление делителей">
		<form onsubmit={calculate}>
			<label for="number">Целое число</label>
			<p id="number-help" class="help">
				Например, 12 или -12. Допустимы знак + или -, ведущие нули и пробелы по краям. Диапазон: от
				−9007199254740991 до 9007199254740991, кроме нуля.
			</p>
			<input
				id="number"
				name="number"
				type="text"
				bind:value={input}
				oninput={() => (outcome = null)}
				aria-invalid={error !== null}
				aria-describedby={error ? 'number-help number-error' : 'number-help'}
				autocomplete="off"
				spellcheck={false}
			/>
			{#if error}
				<p id="number-error" class="error" role="alert">{error}</p>
			{/if}
			<button type="submit">Вычислить</button>
		</form>

		<section class="result" aria-labelledby="result-title">
			<h2 id="result-title">Результат</h2>
			<div role="status" aria-atomic="true">
				{#if outcome?.kind === 'found'}
					<dl>
						<div>
							<dt>Минимальный чётный делитель</dt>
							<dd>{outcome.minimum}</dd>
						</div>
						<div>
							<dt>Максимальный чётный делитель</dt>
							<dd>{outcome.maximum}</dd>
						</div>
					</dl>
				{:else if outcome?.kind === 'none'}
					<p>Чётных делителей нет</p>
				{/if}
			</div>
		</section>
		<noscript>Для вычисления включите JavaScript в браузере.</noscript>
	</section>
</main>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
		background: #f3f5f9;
		color: #172238;
		font-family: system-ui, sans-serif;
		line-height: 1.6;
	}
	main {
		max-width: 44rem;
		margin: 0 auto;
		padding: clamp(1rem, 5vw, 3rem);
		overflow-wrap: anywhere;
	}
	h1 {
		margin: 0;
		font-size: clamp(2rem, 6vw, 3rem);
		line-height: 1.2;
	}
	.card {
		margin-top: 2rem;
		padding: clamp(1rem, 4vw, 2rem);
		border: 1px solid #ccd5e1;
		border-radius: 1rem;
		background: white;
	}
	label,
	h2 {
		font-size: 1rem;
		font-weight: 650;
	}
	.help {
		margin: 0.5rem 0 0.75rem;
		color: #46546a;
		font-size: 0.875rem;
	}
	input {
		display: block;
		width: 100%;
		min-width: 0;
		padding: 0.75rem;
		border: 1px solid #63718a;
		border-radius: 0.5rem;
		background: white;
		color: inherit;
		font: inherit;
	}
	input[aria-invalid='true'] {
		border-color: #a81929;
	}
	button {
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		border: 0;
		border-radius: 0.5rem;
		background: #1d4ed8;
		color: white;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}
	button:hover {
		background: #1e40af;
	}
	input:focus-visible,
	button:focus-visible {
		outline: 3px solid #1d4ed8;
		outline-offset: 3px;
	}
	.error {
		margin: 0.5rem 0 0;
		color: #a81929;
	}
	.result {
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid #ccd5e1;
	}
	h2 {
		margin: 0 0 0.75rem;
	}
	dl {
		display: grid;
		gap: 1rem;
		margin: 0;
	}
	dt {
		color: #46546a;
		font-size: 0.875rem;
	}
	dd {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 650;
		font-variant-numeric: tabular-nums;
	}
</style>
