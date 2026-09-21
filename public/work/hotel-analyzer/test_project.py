"""
Tests for Hotel Analyzer — teaching notes in English.

Each test checks one behavior. pytest.raises checks expected errors.
Run:  python -m pytest -q
"""

import csv
from pathlib import Path

import pytest

# Import the functions/classes we want to test.
from project import (
    Hotel,
    filter_hotels_by_price,
    get_average_rating_and_price_by_city,
    get_cheapest_hotel_in_city,
    get_hotels_by_city,
    get_top_rated_hotel_in_city,
    load_hotel_data,
    main,
    parse_price,
    pick_random_hotel,
    unique_property_types,
    validate_csv_path,
    write_summary_csv,
)


@pytest.fixture
def sample_hotels():
    """
    What: load the real CSV once and reuse it in several tests.
    Returns: list[Hotel]
    """
    return load_hotel_data()


def test_parse_price_with_regex():
    """
    What: price cleaning with regex.
    Checks: symbols removed; empty/bad text -> 0.0
    """
    assert parse_price("₹10,532") == 10532.0
    assert parse_price(" €1.5 ") == 1.5
    assert parse_price("") == 0.0
    assert parse_price("abc") == 0.0


def test_validate_csv_path_rejects_wrong_extension(tmp_path: Path):
    """
    What: only .csv paths are allowed.
    --- arguments ---
    tmp_path: pytest temp folder (safe sandbox for test files)
    Checks: ValueError when extension is wrong
    """
    bad = tmp_path / "hotels.txt"
    bad.write_text("x", encoding="utf-8")
    # pytest.raises: the next block MUST raise this error.
    with pytest.raises(ValueError, match=r"\.csv"):
        validate_csv_path(str(bad))


def test_load_hotel_data_missing_file_raises():
    """
    What: missing file must fail clearly.
    Checks: FileNotFoundError
    """
    with pytest.raises(FileNotFoundError):
        load_hotel_data("definitely-missing-hotels.csv")


def test_load_hotel_data():
    """
    What: happy-path load.
    Checks: non-empty list of Hotel with correct types
    """
    hotels = load_hotel_data()
    assert isinstance(hotels, list)
    assert len(hotels) > 0
    assert isinstance(hotels[0], Hotel)
    assert isinstance(hotels[0].price, float)
    assert isinstance(hotels[0].rating, float)
    assert isinstance(hotels[0].reviews_count, int)
    # __str__ should produce a readable line.
    assert " | " in str(hotels[0])


def test_get_hotels_by_city(sample_hotels):
    """
    What: fuzzy city match.
    --- arguments ---
    sample_hotels: fixture list from the real CSV
    Checks: every hit contains "amsterdam"; unknown city -> []
    """
    matches = get_hotels_by_city(sample_hotels, "Amsterdam")
    assert isinstance(matches, list)
    for hotel in matches:
        assert "amsterdam" in hotel.city.lower()

    empty = get_hotels_by_city(sample_hotels, "Atlantis")
    assert len(empty) == 0

    blank = get_hotels_by_city(sample_hotels, "   ")
    assert blank == []


def test_filter_hotels_by_price(sample_hotels):
    """
    What: price window filter.
    Checks: every kept price is inside [min, max]; impossible range -> []
    """
    min_p, max_p = 10000, 20000
    filtered = filter_hotels_by_price(sample_hotels, min_p, max_p)
    assert all(min_p <= hotel.price <= max_p for hotel in filtered)

    empty = filter_hotels_by_price(sample_hotels, 500000, 600000)
    assert len(empty) == 0


def test_get_top_rated_hotel_in_city(sample_hotels):
    """
    What: top rating in a known city (Bemelen).
    Checks: rating == 10.0; unknown city -> None
    """
    result = get_top_rated_hotel_in_city(sample_hotels, "Bemelen")
    assert result is not None
    assert result.rating == 10.0
    assert "bemelen" in result.city.lower()

    assert get_top_rated_hotel_in_city(sample_hotels, "Mordor") is None


def test_get_cheapest_hotel_in_city(sample_hotels):
    """
    What: cheapest valid price in Maastricht.
    Checks: price > 0 and equals the true minimum; unknown -> None
    """
    result = get_cheapest_hotel_in_city(sample_hotels, "Maastricht")
    assert result is not None
    assert result.price > 0.0
    assert "maastricht" in result.city.lower()

    maastricht = get_hotels_by_city(sample_hotels, "Maastricht")
    valid = [hotel.price for hotel in maastricht if hotel.price > 0.0]
    assert result.price == min(valid)

    assert get_cheapest_hotel_in_city(sample_hotels, "Narnia") is None


def test_get_average_rating_and_price_by_city(sample_hotels):
    """
    What: per-city averages.
    Checks: known cities exist and avg fields are floats
    """
    averages = get_average_rating_and_price_by_city(sample_hotels)
    assert isinstance(averages, dict)

    city_a = "Amsterdam City Center"
    city_b = "Den Bosch"
    assert city_a in averages
    assert "avg_rating" in averages[city_a]
    assert "avg_price" in averages[city_a]
    assert isinstance(averages[city_a]["avg_rating"], float)
    assert city_b in averages


def test_unique_property_types_and_random(sample_hotels):
    """
    What: unique types + random pick.
    Checks: no duplicates in types; empty list -> None random
    """
    types = unique_property_types(sample_hotels)
    assert isinstance(types, list)
    assert len(types) == len(set(types))

    amsterdam = get_hotels_by_city(sample_hotels, "Amsterdam")
    pick = pick_random_hotel(amsterdam)
    assert pick is not None
    assert pick_random_hotel([]) is None


def test_write_summary_csv(tmp_path: Path, sample_hotels):
    """
    What: DictWriter export.
    Checks: file exists, row count matches, .txt path raises ValueError
    """
    subset = get_hotels_by_city(sample_hotels, "Delft")[:5]
    output = tmp_path / "delft-sample.csv"
    path = write_summary_csv(subset, str(output))
    assert path.exists()

    with path.open(encoding="utf-8", newline="") as file:
        rows = list(csv.DictReader(file))
    assert len(rows) == len(subset)
    assert {"Name", "Price", "City"} <= set(rows[0].keys())

    with pytest.raises(ValueError, match=r"\.csv"):
        write_summary_csv(subset, str(tmp_path / "out.txt"))


def test_main_city_filter_returns_zero(sample_hotels, capsys, tmp_path: Path):
    """
    What: CLI city + price + output path.
    --- arguments ---
    capsys: pytest helper to capture print output
    Checks: exit code 0 and output CSV created
    """
    output = tmp_path / "amsterdam.csv"
    code = main(
        [
            "--city",
            "Amsterdam",
            "--min-price",
            "5000",
            "--max-price",
            "15000",
            "--output",
            str(output),
            "--seed",
            "1",
        ]
    )
    assert code == 0
    captured = capsys.readouterr()
    assert "Amsterdam" in captured.out
    assert output.exists()


def test_main_missing_dataset_returns_one():
    """
    What: CLI with a missing file.
    Checks: exit code 1 (failure)
    """
    code = main(["missing-file.csv"])
    assert code == 1
