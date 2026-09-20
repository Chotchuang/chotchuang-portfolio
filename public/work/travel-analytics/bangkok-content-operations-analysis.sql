-- Bangkok Content Operations analytical queries (DuckDB)
-- Database: output/content_ops.duckdb

-- 1) Portfolio health by district
SELECT
  district,
  properties,
  ROUND(avg_quality_score, 1) AS avg_quality_score,
  below_target,
  ROUND(100 * below_target_rate, 1) AS below_target_pct,
  median_price_thb
FROM district_quality
WHERE properties >= 20
ORDER BY below_target_rate DESC, properties DESC;

-- 2) Data-quality issue Pareto
SELECT
  issue_type,
  severity,
  issue_count,
  affected_properties,
  ROUND(priority_impact_proxy, 1) AS priority_impact_proxy,
  ROUND(100.0 * issue_count / SUM(issue_count) OVER (), 1) AS issue_share_pct,
  ROUND(100.0 * SUM(issue_count) OVER (
    ORDER BY issue_count DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) / SUM(issue_count) OVER (), 1) AS cumulative_issue_pct
FROM issue_summary
ORDER BY issue_count DESC;

-- 3) Entity-matching review queue
SELECT
  listing_id,
  listing_name,
  osm_id,
  osm_name,
  ROUND(name_similarity, 3) AS name_similarity,
  ROUND(distance_m, 0) AS distance_m,
  ROUND(match_confidence, 3) AS match_confidence,
  match_status
FROM entity_matches
ORDER BY match_status, match_confidence DESC;

-- 4) Weekly operations scorecard (workflow fields are simulated)
SELECT
  week_end,
  issues_created,
  issues_resolved,
  open_backlog,
  critical_open,
  ROUND(100 * sla_attainment, 1) AS sla_attainment_pct,
  ROUND(100 * automation_rate, 1) AS automation_rate_pct
FROM kpi_weekly
ORDER BY week_end;

-- 5) Open priority queue with running priority-proxy concentration
SELECT
  priority_rank,
  issue_id,
  listing_id,
  issue_type,
  severity,
  district,
  ROUND(priority_impact_proxy, 2) AS priority_proxy,
  ROUND(100 * SUM(priority_impact_proxy) OVER (
    ORDER BY priority_rank ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) / SUM(priority_impact_proxy) OVER (), 1) AS cumulative_priority_proxy_pct,
  owner,
  status,
  sla_due_date,
  age_days,
  is_overdue,
  suggested_action,
  proposed_resolution_path,
  is_simulated
FROM operations_tickets
WHERE status = 'Open'
ORDER BY priority_rank
LIMIT 250;

-- 6) Readiness/review relationship for hypothesis generation only.
-- Reviews are an observed demand proxy; this query does not establish causality.
SELECT
  quality_tier,
  COUNT(*) AS properties,
  ROUND(AVG(content_quality_score), 1) AS avg_quality_score,
  ROUND(MEDIAN(number_of_reviews_num), 1) AS median_reviews,
  ROUND(MEDIAN(reviews_per_month_num), 2) AS median_reviews_per_month,
  ROUND(MEDIAN(price_num), 0) AS median_price_thb
FROM properties
GROUP BY quality_tier
ORDER BY avg_quality_score;
