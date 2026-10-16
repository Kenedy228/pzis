# Блок-схема основного алгоритма

Схема соответствует функции [calculateEvenDivisors](../src/lib/even-divisors.ts). Ищем положительные чётные делители; для отрицательного числа рассматриваем его модуль.

```mermaid
flowchart TD
    start(["Начало"]) --> input[/"Запросить и прочитать строку"/]
    input --> trim["Удалить пробелы по краям: trim()"]
    trim --> format{"Вся строка — десятичное целое<br/>с необязательным знаком + или -?"}

    format -- "Нет" --> formatError[/"Ошибка: введите целое число<br/>в десятичной записи"/]
    format -- "Да" --> convert["Преобразовать строку: n = Number(text)"]
    convert --> safe{"Number.isSafeInteger(n)?"}

    safe -- "Нет" --> rangeError[/"Ошибка: число вне безопасного<br/>целочисленного диапазона"/]
    safe -- "Да" --> zero{"n = 0?<br/>Включая -0"}

    zero -- "Да" --> zeroError[/"Ошибка: у нуля нет максимального<br/>положительного чётного делителя"/]
    zero -- "Нет" --> absolute["Вычислить модуль: m = Math.abs(n)"]
    absolute --> even{"m % 2 = 0?"}

    even -- "Нет" --> none[/"Чётных делителей нет"/]
    even -- "Да" --> found[/"Минимальный чётный делитель: 2<br/>Максимальный чётный делитель: m"/]

    formatError --> finish(["Конец"])
    rangeError --> finish
    zeroError --> finish
    none --> finish
    found --> finish
```
