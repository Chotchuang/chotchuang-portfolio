import unittest

from project import (
    filter_hotels_by_price,
    get_average_rating_and_price_by_city,
    get_cheapest_hotel_in_city,
    get_hotels_by_city,
    get_top_rated_hotel_in_city,
)


class HotelAnalyzerTests(unittest.TestCase):
    def setUp(self):
        self.hotels = [
            {"Name": "Canal View", "City": "Amsterdam City Center", "Price": 12000.0, "Rating": 8.8, "ReviewsCount": 50, "Type": "Hotel", "State": "Noord-Holland"},
            {"Name": "North Stay", "City": "Amsterdam Noord", "Price": 9000.0, "Rating": 9.2, "ReviewsCount": 20, "Type": "Hotel", "State": "Noord-Holland"},
            {"Name": "Budget Rotterdam", "City": "Rotterdam", "Price": 6500.0, "Rating": 8.1, "ReviewsCount": 30, "Type": "Hotel", "State": "Zuid-Holland"},
            {"Name": "No Price", "City": "Rotterdam", "Price": 0.0, "Rating": 7.5, "ReviewsCount": 10, "Type": "Hostel", "State": "Zuid-Holland"},
        ]

    def test_city_search_matches_subareas(self):
        result = get_hotels_by_city(self.hotels, "amsterdam")
        self.assertEqual(len(result), 2)

    def test_price_filter_is_inclusive(self):
        result = filter_hotels_by_price(self.hotels, 9000, 12000)
        self.assertEqual({hotel["Name"] for hotel in result}, {"Canal View", "North Stay"})

    def test_top_rated_hotel_returns_none_for_missing_city(self):
        self.assertEqual(get_top_rated_hotel_in_city(self.hotels, "Amsterdam")["Name"], "North Stay")
        self.assertIsNone(get_top_rated_hotel_in_city(self.hotels, "Atlantis"))

    def test_cheapest_hotel_excludes_zero_prices(self):
        self.assertEqual(get_cheapest_hotel_in_city(self.hotels, "Rotterdam")["Name"], "Budget Rotterdam")

    def test_city_averages_are_grouped_by_exact_city_name(self):
        averages = get_average_rating_and_price_by_city(self.hotels)
        self.assertEqual(averages["Amsterdam City Center"], {"avg_rating": 8.8, "avg_price": 12000.0})


if __name__ == "__main__":
    unittest.main()
