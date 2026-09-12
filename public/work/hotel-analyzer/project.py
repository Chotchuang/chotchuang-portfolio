import csv
from typing import List, Dict, Optional


def load_hotel_data(filepath: str = "HotelFinalDataset - HotelFinalDataset.xlsx.csv") -> List[Dict]:
    """Load hotel data from a CSV file and normalize numeric fields."""
    hotels = []
    try:
        with open(filepath, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                price_str = row.get("Price", "").replace("₹", "").replace(",", "").strip()
                try:
                    price = float(price_str) if price_str else 0.0
                except ValueError:
                    price = 0.0

                rating = float(row.get("Rating", "0")) if row.get("Rating") else 0.0
                reviews_count = (
                    int(row.get("ReviewsCount", "0"))
                    if row.get("ReviewsCount", "").isdigit()
                    else 0
                )

                hotels.append(
                    {
                        "Name": row.get("Name", ""),
                        "Place": row.get("Place", ""),
                        "Type": row.get("Type", ""),
                        "Price": price,
                        "ReviewsCount": reviews_count,
                        "Rating": rating,
                        "City": row.get("City", ""),
                        "State": row.get("State", ""),
                    }
                )
        return hotels
    except FileNotFoundError:
        raise FileNotFoundError(f"File not found: {filepath}")
    except Exception as error:
        raise ValueError(f"An error occurred while loading data: {error}")


def get_hotels_by_city(hotels: List[Dict], city: str) -> List[Dict]:
    """Return hotels whose city value contains the case-insensitive search term."""
    return [hotel for hotel in hotels if city.lower() in hotel["City"].lower()]


def filter_hotels_by_price(
    hotels: List[Dict], min_price: float = 0, max_price: float = float("inf")
) -> List[Dict]:
    """Return hotels inside an inclusive price range."""
    return [hotel for hotel in hotels if min_price <= hotel["Price"] <= max_price]


def get_top_rated_hotel_in_city(hotels: List[Dict], city: str) -> Optional[Dict]:
    """Return the highest-rated hotel in a matching city, if one exists."""
    city_hotels = get_hotels_by_city(hotels, city)
    if not city_hotels:
        return None
    return max(city_hotels, key=lambda hotel: hotel["Rating"])


def get_cheapest_hotel_in_city(hotels: List[Dict], city: str) -> Optional[Dict]:
    """Return the cheapest non-zero-price hotel in a matching city, if one exists."""
    city_hotels = get_hotels_by_city(hotels, city)
    if not city_hotels:
        return None
    valid_prices = [hotel for hotel in city_hotels if hotel["Price"] > 0.0]
    if not valid_prices:
        return None
    return min(valid_prices, key=lambda hotel: hotel["Price"])


def get_average_rating_and_price_by_city(hotels: List[Dict]) -> Dict[str, Dict[str, float]]:
    """Calculate average rating and price for each exact city value."""
    city_stats = {}
    for hotel in hotels:
        city = hotel["City"]
        if city not in city_stats:
            city_stats[city] = {"total_rating": 0, "total_price": 0, "count": 0}
        city_stats[city]["total_rating"] += hotel["Rating"]
        city_stats[city]["total_price"] += hotel["Price"]
        city_stats[city]["count"] += 1

    result = {}
    for city, stats in city_stats.items():
        count = stats["count"]
        result[city] = {
            "avg_rating": round(stats["total_rating"] / count if count else 0, 2),
            "avg_price": round(stats["total_price"] / count if count else 0, 2),
        }
    return result


def main():
    """Demonstrate the project's core search and analysis functions."""
    try:
        hotels = load_hotel_data()
        print("Data loaded successfully!")

        amsterdam_hotels = get_hotels_by_city(hotels, "Amsterdam")
        print(f"Found {len(amsterdam_hotels)} hotels in Amsterdam (including sub-areas)")

        mid_range = filter_hotels_by_price(amsterdam_hotels, 5000, 15000)
        print(f"Mid-range hotels (5k–15k): {len(mid_range)} properties")

        top_delft = get_top_rated_hotel_in_city(hotels, "Delft")
        if top_delft:
            print(f"Top-rated hotel in Delft: {top_delft['Name']} (Rating: {top_delft['Rating']})")

        avg_data = get_average_rating_and_price_by_city(hotels)
        print(f"Averages for Amsterdam City Center: {avg_data.get('Amsterdam City Center')}")

        high_rated_amsterdam = [hotel for hotel in amsterdam_hotels if hotel["Rating"] >= 9.0]
        print(f"High-rated Amsterdam hotels (rating ≥ 9.0): {len(high_rated_amsterdam)} properties")

        type_and_state_filter = [
            hotel
            for hotel in hotels
            if hotel["Type"].lower() == "hotel" and hotel["State"].lower() == "noord-holland"
        ]
        print(f"Hotel type in Noord-Holland: {len(type_and_state_filter)} properties")

        utrecht_hotels = get_hotels_by_city(hotels, "Utrecht")
        top_reviews_utrecht = max(utrecht_hotels, key=lambda hotel: hotel["ReviewsCount"]) if utrecht_hotels else None
        if top_reviews_utrecht:
            print(f"Most-reviewed hotel in Utrecht: {top_reviews_utrecht['Name']} (Reviews: {top_reviews_utrecht['ReviewsCount']})")

        cheapest_rotterdam = get_cheapest_hotel_in_city(hotels, "Rotterdam")
        if cheapest_rotterdam:
            print(f"Cheapest hotel in Rotterdam: {cheapest_rotterdam['Name']} (Price: ₹{cheapest_rotterdam['Price']:,.2f})")

        unique_types = sorted({hotel["Type"] for hotel in hotels if hotel["Type"]})
        print(f"Unique hotel types: {len(unique_types)}")
    except Exception as error:
        print(f"An error occurred: {error}")


if __name__ == "__main__":
    main()
