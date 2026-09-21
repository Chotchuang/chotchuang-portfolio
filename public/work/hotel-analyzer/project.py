"""
Hotel Analyzer for the Netherlands — CS50 Python final project.

Teaching file: short English notes explain what each piece does.
Skills shown: Weeks 0–9 (functions, loops, exceptions, libraries,
pytest, file I/O, regex, OOP).
"""

# --- imports ---
# Bring in ready-made tools so we do not rewrite them ourselves.
from __future__ import annotations  # allow modern type hints like list[str]

import argparse  # read flags from the command line (Week 4 / sys.argv style)
import csv  # read and write CSV tables (Week 6)
import random  # pick one random hotel (Week 4)
import re  # regular expressions for messy prices (Week 7)
import sys  # print errors to stderr; exit codes
from pathlib import Path  # safer file paths than plain strings
from typing import Dict, Iterable, List, Optional  # type hints (Week 9)


# --- constants ---
# Fixed values used in more than one place.
DEFAULT_DATASET = "HotelFinalDataset - HotelFinalDataset.xlsx.csv"
# Regex: keep only digits and dots; drop ₹, commas, spaces, letters.
PRICE_PATTERN = re.compile(r"[^\d.]+")
# Allowed file endings for input/output.
CSV_EXTENSIONS = {".csv"}


# =============================================================================
# Hotel — one cleaned listing (Week 8 OOP)
# =============================================================================
class Hotel:
    """
    What: one hotel row after cleaning.
    Why: store fields in one object instead of a loose dict.
    Result: readable attributes + a nice print line.
    """

    def __init__(
        self,
        name: str,
        place: str,
        property_type: str,
        price: float,
        reviews_count: int,
        rating: float,
        city: str,
        state: str,
    ) -> None:
        # --- arguments ---
        # name           hotel title
        # place          area / address text from the CSV
        # property_type  e.g. Hotel, Apartment, Holiday Home
        # price          cleaned number (float)
        # reviews_count  how many reviews (int)
        # rating         score (float)
        # city           city label from the CSV
        # state          province / state label
        # Underscore prefix = "internal"; use @property to read safely.
        self._name = name
        self._place = place
        self._property_type = property_type
        self._price = price
        self._reviews_count = reviews_count
        self._rating = rating
        self._city = city
        self._state = state

    # --- properties ---
    # @property lets you write hotel.name instead of hotel._name
    @property
    def name(self) -> str:
        # Returns: hotel title string
        return self._name

    @property
    def place(self) -> str:
        # Returns: place / neighborhood text
        return self._place

    @property
    def property_type(self) -> str:
        # Returns: type label (Hotel, Apartment, ...)
        return self._property_type

    @property
    def price(self) -> float:
        # Returns: numeric price
        return self._price

    @property
    def reviews_count(self) -> int:
        # Returns: review count
        return self._reviews_count

    @property
    def rating(self) -> float:
        # Returns: rating score
        return self._rating

    @property
    def city(self) -> str:
        # Returns: city label
        return self._city

    @property
    def state(self) -> str:
        # Returns: state / province label
        return self._state

    def to_dict(self) -> Dict[str, object]:
        """
        What: turn this Hotel into a plain dict.
        Why: csv.DictWriter needs dictionaries, not class objects.
        Returns: dict with CSV column names as keys.
        """
        return {
            "Name": self.name,
            "Place": self.place,
            "Type": self.property_type,
            "Price": self.price,
            "ReviewsCount": self.reviews_count,
            "Rating": self.rating,
            "City": self.city,
            "State": self.state,
        }

    def __str__(self) -> str:
        """
        What: text shown when you print(hotel).
        Returns: one short human-readable line.
        """
        return (
            f"{self.name} | {self.city} | "
            f"₹{self.price:,.2f} | rating {self.rating:.1f} | "
            f"{self.reviews_count} reviews"
        )


# =============================================================================
# Cleaning helpers
# =============================================================================
def parse_price(raw: str) -> float:
    """
    What: clean a messy price string into a float.
    Example: "₹10,532" -> 10532.0
    --- arguments ---
    raw: price text from the CSV (may include symbols)
    Returns: float price, or 0.0 if empty / not a number
    """
    # Remove everything that is not a digit or a dot.
    cleaned = PRICE_PATTERN.sub("", (raw or "").strip())
    # Empty after cleaning -> treat as zero.
    if not cleaned:
        return 0.0
    try:
        # Convert text to float.
        return float(cleaned)
    except ValueError:
        # Still not a number -> zero (safe default).
        return 0.0


def validate_csv_path(filepath: str) -> Path:
    """
    What: check that the path is an existing .csv file.
    --- arguments ---
    filepath: path string from the user or CLI
    Returns: Path object if OK
    Raises: ValueError (wrong extension) or FileNotFoundError (missing file)
    """
    path = Path(filepath)
    # Week 6 idea: check the file extension before opening.
    if path.suffix.lower() not in CSV_EXTENSIONS:
        raise ValueError(f"Expected a .csv file, got: {filepath}")
    # is_file() is True only if the file exists on disk.
    if not path.is_file():
        raise FileNotFoundError(f"File not found: {filepath}")
    return path


def load_hotel_data(filepath: str = DEFAULT_DATASET) -> List[Hotel]:
    """
    What: read the CSV and build a list of Hotel objects.
    --- arguments ---
    filepath: CSV path (default = project dataset)
    Returns: list[Hotel] — one object per data row
    Raises: FileNotFoundError / ValueError on bad paths or I/O problems
    """
    # Step 1: validate path and extension.
    path = validate_csv_path(filepath)
    # Step 2: start with an empty list; we append as we read.
    hotels: List[Hotel] = []

    try:
        # with open... closes the file automatically (Week 6).
        with path.open(mode="r", encoding="utf-8", newline="") as file:
            # DictReader: each row becomes a dict keyed by header names.
            reader = csv.DictReader(file)
            for row in reader:
                # .get(key, default) avoids KeyError if a column is missing.
                rating_raw = (row.get("Rating") or "").strip()
                reviews_raw = (row.get("ReviewsCount") or "").strip()
                try:
                    # Blank rating -> 0.0; bad text also falls back to 0.0.
                    rating = float(rating_raw) if rating_raw else 0.0
                except ValueError:
                    rating = 0.0
                # Only treat pure digits as an int count.
                reviews_count = int(reviews_raw) if reviews_raw.isdigit() else 0

                # Build one Hotel and store it.
                hotels.append(
                    Hotel(
                        name=row.get("Name", ""),
                        place=row.get("Place", ""),
                        property_type=row.get("Type", ""),
                        price=parse_price(row.get("Price", "")),
                        reviews_count=reviews_count,
                        rating=rating,
                        city=row.get("City", ""),
                        state=row.get("State", ""),
                    )
                )
    except FileNotFoundError:
        # Let the caller handle "file missing".
        raise
    except OSError as exc:
        # Other disk errors -> wrap as ValueError with a clear message.
        raise ValueError(f"An error occurred while loading data: {exc}") from exc

    # Result: full cleaned list ready for search/filter.
    return hotels


# =============================================================================
# Search / filter / aggregate
# =============================================================================
def get_hotels_by_city(hotels: List[Hotel], city: str) -> List[Hotel]:
    """
    What: fuzzy city search (case-insensitive substring).
    Example: "Amsterdam" also matches "Amsterdam Noord".
    --- arguments ---
    hotels: full list from load_hotel_data
    city: search text from user or CLI
    Returns: list of matching Hotel objects (may be empty)
    """
    # Normalize: trim spaces and lowercase for fair comparison.
    needle = city.strip().lower()
    if not needle:
        return []
    # List comprehension: keep hotels where needle appears inside city name.
    return [hotel for hotel in hotels if needle in hotel.city.lower()]


def filter_hotels_by_price(
    hotels: List[Hotel],
    min_price: float = 0.0,
    max_price: float = float("inf"),
) -> List[Hotel]:
    """
    What: keep hotels inside a price window.
    --- arguments ---
    hotels: list to filter (often already city-filtered)
    min_price: lowest allowed price (default 0)
    max_price: highest allowed price (default = no upper limit)
    Returns: hotels with min_price <= price <= max_price
    """
    return [hotel for hotel in hotels if min_price <= hotel.price <= max_price]


def get_top_rated_hotel_in_city(hotels: List[Hotel], city: str) -> Optional[Hotel]:
    """
    What: find the highest-rated hotel in a city.
    --- arguments ---
    hotels: full dataset
    city: city search text
    Returns: one Hotel, or None if the city has no rows
    """
    city_hotels = get_hotels_by_city(hotels, city)
    if not city_hotels:
        return None
    # max(..., key=) compares by rating, not by object identity.
    return max(city_hotels, key=lambda hotel: hotel.rating)


def get_cheapest_hotel_in_city(hotels: List[Hotel], city: str) -> Optional[Hotel]:
    """
    What: find the cheapest hotel with a real (non-zero) price.
    --- arguments ---
    hotels: full dataset
    city: city search text
    Returns: one Hotel, or None if none qualify
    """
    city_hotels = get_hotels_by_city(hotels, city)
    if not city_hotels:
        return None
    # Drop free / missing prices so "cheapest" is meaningful.
    valid_prices = [hotel for hotel in city_hotels if hotel.price > 0.0]
    if not valid_prices:
        return None
    return min(valid_prices, key=lambda hotel: hotel.price)


def get_average_rating_and_price_by_city(
    hotels: List[Hotel],
) -> Dict[str, Dict[str, float]]:
    """
    What: average rating and price for each exact city label.
    --- arguments ---
    hotels: full dataset
    Returns: {city: {"avg_rating": float, "avg_price": float}, ...}
    """
    # First pass: sum totals and counts per city.
    city_stats: Dict[str, Dict[str, float]] = {}
    for hotel in hotels:
        city = hotel.city
        if city not in city_stats:
            city_stats[city] = {"total_rating": 0.0, "total_price": 0.0, "count": 0.0}
        city_stats[city]["total_rating"] += hotel.rating
        city_stats[city]["total_price"] += hotel.price
        city_stats[city]["count"] += 1.0

    # Second pass: dict comprehension builds the final averages.
    return {
        city: {
            "avg_rating": round(stats["total_rating"] / stats["count"], 2)
            if stats["count"]
            else 0.0,
            "avg_price": round(stats["total_price"] / stats["count"], 2)
            if stats["count"]
            else 0.0,
        }
        for city, stats in city_stats.items()
    }


def unique_property_types(hotels: List[Hotel]) -> List[str]:
    """
    What: list every distinct property type, sorted A–Z.
    --- arguments ---
    hotels: full dataset
    Returns: sorted list of unique type strings
    """
    # set(...) removes duplicates; sorted(...) orders them.
    return sorted({hotel.property_type for hotel in hotels if hotel.property_type})


def pick_random_hotel(hotels: List[Hotel]) -> Optional[Hotel]:
    """
    What: pick one random hotel (Week 4 random).
    --- arguments ---
    hotels: any non-empty list (or empty)
    Returns: one Hotel, or None if the list is empty
    """
    if not hotels:
        return None
    return random.choice(hotels)


def write_summary_csv(hotels: Iterable[Hotel], output_path: str) -> Path:
    """
    What: save hotels to a new CSV file (Week 6 DictWriter).
    --- arguments ---
    hotels: hotels to write (list or other iterable)
    output_path: destination path; must end with .csv
    Returns: Path of the file written
    Raises: ValueError if the extension is not .csv
    """
    path = Path(output_path)
    if path.suffix.lower() not in CSV_EXTENSIONS:
        raise ValueError(f"Output must be a .csv file, got: {output_path}")

    # Column order for the header row.
    fieldnames = [
        "Name",
        "Place",
        "Type",
        "Price",
        "ReviewsCount",
        "Rating",
        "City",
        "State",
    ]
    # Convert each Hotel to a dict before writing.
    rows = [hotel.to_dict() for hotel in hotels]
    # mode="w" creates/overwrites the file.
    with path.open(mode="w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()  # first row = column names
        writer.writerows(rows)  # data rows
    return path


# =============================================================================
# Interactive prompts (Weeks 0–3)
# =============================================================================
def prompt_nonempty(prompt: str) -> str:
    """
    What: ask until the user types something non-blank.
    --- arguments ---
    prompt: text shown before input()
    Returns: stripped non-empty string
    """
    while True:  # loop forever until return
        value = input(prompt).strip()  # Week 0 input + Week 1 normalize
        if value:
            return value
        print("Please enter a non-empty value.")


def prompt_float(prompt: str, default: Optional[float] = None) -> float:
    """
    What: ask until the user types a valid number.
    --- arguments ---
    prompt: text shown before input()
    default: if set, blank Enter returns this value
    Returns: float
    """
    while True:
        raw = input(prompt).strip()
        # Blank + default allowed -> use default.
        if not raw and default is not None:
            return default
        try:
            return float(raw)
        except ValueError:
            # Not a number -> show hint and continue the loop.
            print("Please enter a number (for example 5000).")
            continue


# =============================================================================
# Demo + interactive + CLI
# =============================================================================
def run_demo(hotels: List[Hotel]) -> None:
    """
    What: fixed 9-step demo printed to the terminal.
    --- arguments ---
    hotels: full cleaned dataset
    Returns: None (prints only)
    """
    print("Data loaded successfully!")

    # [1] Fuzzy city search.
    amsterdam_hotels = get_hotels_by_city(hotels, "Amsterdam")
    print(f"[1/9] Found {len(amsterdam_hotels)} hotels in Amsterdam (including sub-areas)")

    # [2] Price window on that city subset.
    mid_range = filter_hotels_by_price(amsterdam_hotels, 5000, 15000)
    print(f"[2/9] Mid-range hotels (5k-15k): {len(mid_range)} properties")

    # [3] Top rating in Delft.
    top_delft = get_top_rated_hotel_in_city(hotels, "Delft")
    if top_delft:
        print(f"[3/9] Top-rated hotel in Delft: {top_delft}")
    else:
        print("[3/9] No hotels found in Delft.")

    # [4] City averages (exact city key).
    avg_data = get_average_rating_and_price_by_city(hotels)
    amsterdam_center = avg_data.get("Amsterdam City Center")
    print(f"[4/9] Averages for Amsterdam City Center: {amsterdam_center}")

    # [5] List comprehension for high ratings.
    high_rated_amsterdam = [h for h in amsterdam_hotels if h.rating >= 9.0]
    print(
        f"[5/9] High-rated Amsterdam hotels (rating >= 9.0): "
        f"{len(high_rated_amsterdam)} properties"
    )

    # [6] Combine two conditions (type + state).
    type_and_state_filter = [
        h
        for h in hotels
        if h.property_type.lower() == "hotel" and h.state.lower() == "noord-holland"
    ]
    print(f"[6/9] 'Hotel' type in Noord-Holland: {len(type_and_state_filter)} properties")

    # [7] Most reviews in Utrecht (max + key).
    utrecht_hotels = get_hotels_by_city(hotels, "Utrecht")
    top_reviews_utrecht = (
        max(utrecht_hotels, key=lambda hotel: hotel.reviews_count) if utrecht_hotels else None
    )
    if top_reviews_utrecht:
        print(f"[7/9] Most-reviewed hotel in Utrecht: {top_reviews_utrecht}")
    else:
        print("[7/9] No hotels found in Utrecht.")

    # [8] Cheapest valid price in Rotterdam.
    cheapest_rotterdam = get_cheapest_hotel_in_city(hotels, "Rotterdam")
    if cheapest_rotterdam:
        print(f"[8/9] Cheapest hotel in Rotterdam: {cheapest_rotterdam}")
    else:
        print("[8/9] No hotels with valid prices found in Rotterdam.")

    # [9] Unique types via set.
    types = unique_property_types(hotels)
    print(f"[9/9] Unique property types: {len(types)}")
    if types:
        preview = ", ".join(types[:5])
        print(f"    (First 5 types: {preview}...)")

    # Bonus: random sample.
    sample = pick_random_hotel(amsterdam_hotels)
    if sample:
        print(f"Bonus random Amsterdam pick: {sample}")


def run_interactive(hotels: List[Hotel]) -> None:
    """
    What: menu loop driven by input() (while / break / continue / elif).
    --- arguments ---
    hotels: full cleaned dataset
    Returns: None (prints and maybe writes a CSV)
    """
    print("Interactive Hotel Analyzer. Type q to quit.")
    while True:
        # Show choices each round.
        print("\nChoose an action:")
        print("  1) Search by city")
        print("  2) Filter by price in a city")
        print("  3) Top-rated in a city")
        print("  4) Cheapest in a city")
        print("  5) Write current city results to CSV")
        print("  q) Quit")
        choice = input("> ").strip().lower()

        # break leaves the while loop.
        if choice in {"q", "quit"}:
            print("Goodbye.")
            break
        # continue jumps back to the top of the while loop.
        if choice not in {"1", "2", "3", "4", "5"}:
            print("Unknown option; try again.")
            continue

        city = prompt_nonempty("City (fuzzy match, e.g. Amsterdam): ")
        city_hotels = get_hotels_by_city(hotels, city)
        if not city_hotels:
            print(f"No hotels matched city '{city}'.")
            continue

        # elif chain: exactly one branch runs.
        if choice == "1":
            # enumerate gives (1, hotel), (2, hotel), ...
            for index, hotel in enumerate(city_hotels[:10], start=1):
                print(f"  {index}. {hotel}")
            if len(city_hotels) > 10:
                print(f"  ... and {len(city_hotels) - 10} more")
        elif choice == "2":
            min_price = prompt_float("Minimum price [0]: ", default=0.0)
            max_price = prompt_float("Maximum price [inf]: ", default=float("inf"))
            if min_price > max_price:
                print("Minimum cannot exceed maximum; try again.")
                continue
            filtered = filter_hotels_by_price(city_hotels, min_price, max_price)
            print(f"Matched {len(filtered)} hotels.")
            for index, hotel in enumerate(filtered[:10], start=1):
                print(f"  {index}. {hotel}")
        elif choice == "3":
            top = get_top_rated_hotel_in_city(hotels, city)
            print(top if top else "No top-rated hotel found.")
        elif choice == "4":
            cheap = get_cheapest_hotel_in_city(hotels, city)
            print(cheap if cheap else "No valid-price hotel found.")
        elif choice == "5":
            output = prompt_nonempty("Output CSV path: ")
            try:
                path = write_summary_csv(city_hotels, output)
            except ValueError as exc:
                print(f"Could not write file: {exc}")
                continue
            else:
                # else on try runs only when no exception happened.
                print(f"Wrote {len(city_hotels)} rows to {path}")


def build_parser() -> argparse.ArgumentParser:
    """
    What: define CLI flags for this program.
    Returns: ArgumentParser ready for .parse_args(...)
    """
    parser = argparse.ArgumentParser(
        description="Analyze Netherlands hotel listings from a CSV dataset.",
    )
    # Optional positional: dataset path.
    parser.add_argument(
        "dataset",
        nargs="?",
        default=DEFAULT_DATASET,
        help=f"Input CSV path (default: {DEFAULT_DATASET})",
    )
    # Named flags.
    parser.add_argument("--city", help="Fuzzy city filter for a focused report")
    parser.add_argument("--min-price", type=float, default=0.0, help="Minimum price")
    parser.add_argument(
        "--max-price",
        type=float,
        default=float("inf"),
        help="Maximum price",
    )
    parser.add_argument(
        "--output",
        help="Optional CSV path for filtered results (DictWriter)",
    )
    parser.add_argument(
        "--interactive",
        action="store_true",
        help="Prompt for city/price choices instead of the fixed demo",
    )
    parser.add_argument(
        "--seed",
        type=int,
        help="Optional random seed for reproducible sample picks",
    )
    return parser


def main(argv: Optional[List[str]] = None) -> int:
    """
    What: program entry — parse CLI, load data, run one mode.
    --- arguments ---
    argv: optional list of CLI strings (for tests); None = use real sys.argv
    Returns: exit code 0 = success, 1 = error
    """
    # Parse flags into an args object.
    args = build_parser().parse_args(argv)

    # Same seed -> same random.choice result (useful in demos/tests).
    if args.seed is not None:
        random.seed(args.seed)

    try:
        hotels = load_hotel_data(args.dataset)
    except (FileNotFoundError, ValueError) as exc:
        # Write errors to stderr (not mixed with normal output).
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    else:
        print(f"Loaded {len(hotels)} hotels from {args.dataset}")

    # Mode A: interactive menu.
    if args.interactive:
        run_interactive(hotels)
        return 0

    # Mode B: focused city report from flags.
    if args.city:
        city_hotels = get_hotels_by_city(hotels, args.city)
        filtered = filter_hotels_by_price(city_hotels, args.min_price, args.max_price)
        print(f"City '{args.city.strip()}' → {len(filtered)} hotels in price window")
        for index, hotel in enumerate(filtered[:15], start=1):
            print(f"  {index}. {hotel}")
        if args.output:
            try:
                path = write_summary_csv(filtered, args.output)
            except ValueError as exc:
                print(f"Error: {exc}", file=sys.stderr)
                return 1
            else:
                print(f"Wrote {len(filtered)} rows to {path}")
        return 0

    # Mode C: default demo walkthrough.
    run_demo(hotels)
    if args.output:
        amsterdam = get_hotels_by_city(hotels, "Amsterdam")
        try:
            path = write_summary_csv(amsterdam, args.output)
        except ValueError as exc:
            print(f"Error: {exc}", file=sys.stderr)
            return 1
        else:
            print(f"Wrote {len(amsterdam)} Amsterdam rows to {path}")
    return 0


# --- script entry ---
# Only runs when you execute: python project.py
# (Not when another file does: import project)
if __name__ == "__main__":
    raise SystemExit(main())
