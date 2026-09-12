-- Travel Product & Supply Analytics — Content Quality Prioritization
-- Engine: DuckDB | Input: public Bangkok listing data processed locally
-- This portfolio copy contains queries only. No raw listings are published.

-- 1. Compare business proxies across content-quality tiers.
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
ORDER BY CASE content_tier
    WHEN 'Good' THEN 1
    WHEN 'Needs Improvement' THEN 2
    WHEN 'Critical' THEN 3
END;

-- 2. Find neighbourhoods where the quality backlog is concentrated.
WITH ranked AS (
    SELECT
        neighbourhood,
        COUNT(*) AS listings,
        ROUND(AVG(content_quality_score), 2) AS avg_score,
        ROUND(AVG(number_of_reviews), 2) AS avg_reviews,
        ROUND(100.0 * AVG(CASE WHEN content_tier = 'Critical' THEN 1 ELSE 0 END), 2)
            AS critical_pct
    FROM read_csv_auto('data/processed/listings_scored.csv')
    GROUP BY neighbourhood
)
SELECT *
FROM ranked
ORDER BY listings DESC
LIMIT 15;

-- 3. Prioritize high-value listings whose content is below the target threshold.
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

-- 4. Size each type of quality gap to plan the content-operations backlog.
SELECT
    ROUND(100.0 * AVG(gap_description), 2) AS pct_gap_description,
    ROUND(100.0 * AVG(gap_amenity), 2) AS pct_gap_amenity,
    ROUND(100.0 * AVG(gap_host_response), 2) AS pct_gap_host_response,
    ROUND(100.0 * AVG(gap_reviews), 2) AS pct_gap_reviews,
    SUM(CASE WHEN content_tier = 'Critical' THEN 1 ELSE 0 END) AS critical_listings,
    SUM(CASE WHEN content_tier = 'Needs Improvement' THEN 1 ELSE 0 END)
        AS needs_improvement_listings
FROM read_csv_auto('data/processed/listings_scored.csv');
