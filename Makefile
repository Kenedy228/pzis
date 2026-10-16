.DEFAULT_GOAL := help

# Цели SvelteKit используют общий каталог сборки даже при запуске make с -j.
.NOTPARALLEL:

.PHONY: help install dev build preview check lint format test browsers test-e2e verify

help:
	@printf '%s\n' \
		'make install  — установить зависимости из lock-файла' \
		'make dev      — запустить сервер разработки' \
		'make build    — собрать статический сайт' \
		'make preview  — запустить просмотр готовой сборки' \
		'make check    — проверить типы TypeScript и Svelte' \
		'make lint     — проверить форматирование и линтинг' \
		'make format   — отформатировать проект' \
		'make test     — запустить модульные тесты без watch' \
		'make browsers — установить Chromium для Playwright' \
		'make test-e2e — собрать сайт и запустить браузерные тесты' \
		'make verify   — последовательно выполнить check, lint, test и build'

install:
	npm ci

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

check:
	npm run check

lint:
	npm run lint

format:
	npm run format

test:
	npm test

browsers:
	npx playwright install chromium

test-e2e:
	npm run test:e2e

verify:
	$(MAKE) check
	$(MAKE) lint
	$(MAKE) test
	$(MAKE) build
