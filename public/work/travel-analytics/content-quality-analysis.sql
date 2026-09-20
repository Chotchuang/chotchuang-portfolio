-- Content Quality Audit — Phase 3 SQL (DuckDB)
-- Run against: data/processed/listings_scored.csv

-- Query 1: Average performance by content tier
SELECT
    content_tier,
    COUNT(*) AS listings,
    ROUND(AVG(content_quality_score), 2) AS avg_score,
    ROUND(AVG(number_of_reviews), 2) AS avg_reviews,
    ROUND(AVG(review_scores_rating), 2) AS avg_rating,
    ROUND(AVG(occupancy_days), 2) AS avg_occupancy_days,
    ROUND(AVG(price), 0) AS avg_price_thb
FROM read_csv_auto('data/processed/listings_scored.csv')
GROUP BY content_tier
ORDER BY
    CASE content_tier
        WHEN 'Good' THEN 1
        WHEN 'Needs Improvement' THEN 2
        WHEN 'Critical' THEN 3
    END;

-- Query 2: Top 10 listings by content score
SELECT
    id,
    name,
    neighbourhood,
    content_quality_score,
    content_tier,
    number_of_reviews,
    price
FROM read_csv_auto('data/processed/listings_scored.csv')
ORDER BY content_quality_score DESC, number_of_reviews DESC
LIMIT 10;

-- Query 3: Bottom 10 listings needing urgent action
SELECT
    id,
    name,
    neighbourhood,
    content_quality_score,
    content_tier,
    number_of_reviews,
    description_word_count,
    amenity_count
FROM read_csv_auto('data/processed/listings_scored.csv')
WHERE content_tier = 'Critical'
ORDER BY content_quality_score ASC, price DESC
LIMIT 10;

-- Query 4: Content score by neighbourhood (top 15 by listing count)
WITH base AS (
    SELECT * FROM read_csv_auto('data/processed/listings_scored.csv')
),
ranked AS (
    SELECT
        neighbourhood,
        COUNT(*) AS listings,
        ROUND(AVG(content_quality_score), 2) AS avg_score,
        ROUND(AVG(number_of_reviews), 2) AS avg_reviews,
        ROUND(100.0 * AVG(CASE WHEN content_tier = 'Critical' THEN 1 ELSE 0 END), 2) AS critical_pct
    FROM base
    GROUP BY neighbourhood
)
SELECT *
FROM ranked
ORDER BY listings DESC
LIMIT 15;

-- Query 5: High-potential low-content — premium price but weak content
SELECT
    id,
    name,
    neighbourhood,
    content_quality_score,
    content_tier,
    price,
    number_of_reviews
FROM read_csv_auto('data/processed/listings_scored.csv')
WHERE content_quality_score < 70
  AND price >= (
      SELECT PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY price)
      FROM read_csv_auto('data/processed/listings_scored.csv')
  )
ORDER BY price DESC, content_quality_score ASC
LIMIT 20;

-- Query 6: Component gap prevalence (ops backlog sizing)
SELECT
    ROUND(100.0 * AVG(gap_description), 2) AS pct_gap_description,
    ROUND(100.0 * AVG(gap_amenity), 2) AS pct_gap_amenity,
    ROUND(100.0 * AVG(gap_host_response), 2) AS pct_gap_host_response,
    ROUND(100.0 * AVG(gap_reviews), 2) AS pct_gap_reviews,
    SUM(CASE WHEN content_tier = 'Critical' THEN 1 ELSE 0 END) AS critical_listings,
    SUM(CASE WHEN content_tier = 'Needs Improvement' THEN 1 ELSE 0 END) AS needs_improvement_listings
FROM read_csv_auto('data/processed/listings_scored.csv');
