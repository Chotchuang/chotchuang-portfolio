# Hotel Analyzer for the Netherlands

Video demo: https://youtu.be/svxSeMudx4w

CS50 Python final project that turns a Netherlands hotel CSV into searchable,
filterable insights. The rewrite deliberately exercises skills from **Weeks 0–9**.

## Run

```bash
cd "python project"
python3 -m pytest -q
python3 project.py
python3 project.py --city Amsterdam --min-price 5000 --max-price 15000 --output amsterdam.csv
python3 project.py --interactive
```

## Skills mapped to the code

| Week | Skill | Where it appears |
| --- | --- | --- |
| 0 | Functions, f-strings, `main` | `Hotel.__str__`, `main()`, helpers |
| 0–1 | `input`, normalize with `strip`/`lower`, `elif` | `run_interactive`, prompts |
| 2 | `while` / `break` / `continue`, `enumerate` | interactive menu + listings |
| 3 | `try` / `except` / `else`, validate loops | load path, prompts, CLI errors |
| 4 | `sys`/`argparse`, `random` | CLI flags, `pick_random_hotel` |
| 5 | `pytest`, `pytest.raises` | `test_project.py` |
| 6 | `csv.DictReader` / `DictWriter`, `.csv` check | `load_hotel_data`, `write_summary_csv` |
| 7 | Regular expressions | `parse_price` / `PRICE_PATTERN` |
| 8 | OOP: `class`, `@property`, `__str__` | `Hotel` |
| 9 | Type hints, `set`, comprehensions, `max`/`min` | throughout |

## Core behavior

1. **Load + clean** — read CSV, coerce rating/reviews, parse prices with regex (`₹10,532` → `10532.0`).
2. **Search** — fuzzy, case-insensitive city match (e.g. `Amsterdam` includes `Amsterdam Noord`).
3. **Filter** — price window, top-rated, cheapest (ignores zero prices), city averages.
4. **Export** — optional `--output` CSV via `DictWriter`.
5. **Interactive mode** — prompt for city/price and write results without editing code.

## Reliability

`pytest` covers loading, regex price parsing, missing-file errors, filters,
extremes, averages, CSV export, and CLI exit codes.

Optional analytics libraries (`pandas`, `numpy`) remain listed in
`requirements.txt` for a future scale-up path; the shipped analyzer uses only
the standard library plus `pytest`.

## Dataset

`HotelFinalDataset - HotelFinalDataset.xlsx.csv` — public Netherlands hotel
listings used for the CS50 final submission.
