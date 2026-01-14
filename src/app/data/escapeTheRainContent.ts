export const escapeTheRainContent = {
  overview: `**Escape the Rain** is a web application designed to solve user need: 

*"It's raining where I am, where are the closest places that are dry and I can go outside?"*

The product takes user's location and **identifies the nearest destinations that are forecast to remain dry in the immediate future**. This is achieved by combining location search with near-term weather forecasts, filtering and ranking nearby towns and cities to surface a small, actionable set of options.

Rather than presenting probabilities, long-range forecasts, or raw weather data, Escape the Rain makes **binary, defensible decisions**: dry or not dry, near or far. The system orchestrates multiple external APIs, applies deterministic rules, and handles edge cases so that the user can make a fast, confident decision with minimal cognitive effort.

Escape the Rain is not a general-purpose weather app. It is a focused example of building and designing products that help users answer a specific question, using data as an input rather than the output.

User provides location (Browser Geolocation API or manual search) → geocoding returns lat/lon (Open-Meteo Geocoding API, with fallback) → system fetches 12-hour weather for origin (Open-Meteo Forecast API) → spatial search queries nearby candidates (10/25/50km) via Geoapify, Nominatim, OpenTripMap) → near-term weather evaluation filters candidates (Open-Meteo bulk forecasts) → results ranked by distance → top 5 locations returned → POI enrichment (Geoapify Places API) → client renders cards and map (Mapbox GL JS).`,

  skills: `Product & system design · scope definition & trade-offs · deterministic decision logic · full-stack web development (Next.js, TypeScript, React) · UI/UX design · external API orchestration · multi-source data integration · uncertain data handling · error handling & fallbacks · rate-limit–aware system design · client/server separation · observability & debugging · data quality controls · hosting & deployment · vibe coding`,

  prd: `# 1. Overview

Location-based recommendation system identifying nearby dry destinations when user's location is raining. Combines real-time weather forecasts with spatial search to surface nearest locations where it's not raining within set time period. 


# 2. User need & core decision

- **Primary need:** Find nearest destinations that remain dry for trip duration.
- **Core decision:** "Which nearby destinations will be dry when I arrive and remain dry for next N hours?" (N = \`strictHours\`, default: 4)
- **System decides:** Binary dry/wet classification, distance ranking, weather confidence, POI availability.
- **System does not decide:** Driving routes, user preferences, indoor alternatives, multi-day planning, historical data.


# 3. Functional requirements

**Location input:**
- Geolocation: Browser API returns lat/lon directly
- Manual search: \`/api/geocode\` → Open-Meteo (primary), Nominatim (fallback)
- Filters: UK settlements only (PPL, PPLA, PPLC feature codes)
- Returns: Up to 20 results, deduplicated

**Recommendation generation:**
- Endpoint: \`GET /api/recommendations?lat={lat}&lon={lon}&source={geolocation|manual}&strictHours={4}&searchDistance={auto|10|25|50|100}\`
- Default mode: Parallel fetch 10km/25km/50km, merge prioritising closer
- Manual mode if enabled on client/for testing: Single radius (default 50km, extends to 100km if <10 results)
- Extended search: If <5 dry results, extends incrementally (10→25→50→100km)
- Filters: Exclude ≤1km from origin; exclude name matches if <5km
- Returns: Top 5 sorted by distance

**Weather evaluation:**
- Source: Open-Meteo Forecast API
- Bulk: Up to 50 locations per request (batched if >50)
- Window: 24h hourly granularity
- Threshold: >0.1mm = excluded
- Logic: \`isRainingNow = precipitation[0] > 0.1\`, \`willRainSoon = max(precipitation[0:strictHours]) > 0.1\`
- Strict: \`isDryToday = !isRainingNow && !willRainSoon\`
- Summary: "Dry all day" | "Dry for next X hours" | "Raining now" | "Dry now, rain expected in X hours"

**Spatial search:**
- Primary: Geoapify (populated_place, administrative)
- Fallback 1: Nominatim (search + reverse geocoding grid)
- Fallback 2: OpenTripMap (bbox → radius)
- Fallback 3: Hardcoded UK cities (99 locations)
- Filtering: Exclude administrative districts, counties, high-level admin areas
- Priority: Settlements (cities/towns/villages) over attractions
- Deduplication: By name (keep closest)

**POI enrichment (deferred):**
- Endpoint: \`POST /api/poi\` (async after initial results)
- Source: Geoapify (commercial, entertainment, catering, natural, tourism, sport, leisure)
- Radius: 3km from destination
- Scoring: \`1 / baseline_frequency\` (rarer = higher priority)
- Baselines: Pre-calculated from 99 UK sample (shops: 96%, markets: 1%)
- Returns: Top POI types by over-indexing score → count → alphabetical


# 4. Decision logic & rules

**Rain Classification:**
- Threshold: \`precipitation > 0.1mm\` (mm/hour)
- Current: \`precipitation[0] > 0.1\` → \`isRainingNow\`
- Forecast: \`max(precipitation[0:strictHours]) > 0.1\` → \`willRainSoon\`
- Strict: Exclude if \`isRainingNow || willRainSoon\`

**strictHours:**
- Default: 4h
- Range: 1-12h via query param
- Applied: Candidate destinations only (not user location, always 12h)
- Logic: \`max(precipitation.slice(0, strictHours)) > 0.1\` → exclude

**Dry Criteria:**
- Dry: \`!isRainingNow && !willRainSoon\`
- Edge: Rain forecast after strictHours but within 24h → included, surfaced as 'Dry for next X hours'.
- Edge: All 24h rain → excluded

**Ranking:**
- Primary: Distance ascending (Haversine)
- Secondary: Weather confidence (not explicitly sorted)
- Limit: Top 5

**Extension Logic:**
- Trigger: <5 dry results AND \`useAutoSearch = true\`
- Tiers: 10km→25km, 25km→50km, 50km→100km (check extended range only)
- Deduplication: Merge with existing, filter by name+distance
- Weather: Extended candidates checked individually (not bulk)

## Data quality considerations

- POI over-indexing baselines are derived from a 99-location UK sample to identify which POI types are genuinely notable rather than ubiquitous.
- Hardcoded exclusion lists are used to filter out counties, districts, and other non-settlement administrative areas that would otherwise pollute spatial search results.
- Spatial search explicitly prioritises settlement types (city, town, village, hamlet) to ensure recommendations map to practical, visitable destinations.


# 5. System architecture 

**Client:** Location capture, API orchestration (\`/geocode\` → \`/recommendations\` → \`/poi\`), state management, UI rendering, async POI enrichment.

**Server:** Geocoding (query normalization, API selection, UK filtering), spatial search (multi-API orchestration, fallbacks, deduplication), weather evaluation (bulk calls, threshold evaluation), ranking (distance, filtering, top-N), POI enrichment (Geoapify queries, overindexing), error handling.

**External:** Open-Meteo (weather, ~10k/day free), Geoapify (places + POI, requires key), Nominatim (places fallback, 1 req/sec), OpenTripMap (places fallback, requires key).

**Complexity:** Server-side multi-API fallbacks, bulk weather, administrative filtering. Client-side async POI, state transitions. Separation: API keys server-side only.


# 6. Tech stack 

The product is implemented as a **full-stack Next.js application**, with client and server logic co-located in a single codebase.

**Primary language**
- TypeScript (used across client, server, and API routes)

**Framework & runtime**
- Next.js (App Router) running on Node.js
- React for client-side UI rendering
- Server-side API routes used for all external API orchestration

**Styling**
- Tailwind CSS (utility-first, compiled at build time)

**Rendering model**
- Client-side rendering for interactive UI components
- Dynamic server-side execution for all API routes
- No static generation for weather- or location-dependent logic

**Testing**
- Vitest for unit and integration testing

**Architecture pattern**
- Full-stack monorepo (client + server within a single Next.js app)
- Server-side API routes handle:
  - weather API calls
  - spatial search
  - multi-API fallback orchestration
- Client-side React components manage:
  - user interaction
  - UI state transitions
  - asynchronous POI enrichment

This stack was chosen to support **fast iteration**, **secure server-side API access**, and **low-latency orchestration of multiple third-party services**.


# 7. APIs & data sources

**Endpoints:**
- \`/api/geocode\`: Open-Meteo (primary), Nominatim (fallback)
- \`/api/recommendations\`: Orchestrates places + weather
- \`/api/poi\`: Geoapify (POI only)

**Third-party APIs:**
1. **Open-Meteo Forecast:** \`hourly=precipitation,weathercode\`, bulk up to 100 locations, ~10k/day free
2. **Geoapify Places:** \`categories=populated_place,administrative\`, \`filter=circle\`, requires key
3. **Nominatim:** \`q={settlementType}\`, \`countrycodes=gb\`, 1 req/sec, 8s timeout
4. **OpenTripMap:** \`bbox\` → \`radius\`, requires key, fallback to hardcoded list

**Priority:** Places: Geoapify → Nominatim → OpenTripMap → Hardcoded. Geocoding: Open-Meteo → Nominatim. Weather: Open-Meteo only.

**Bulk vs individual:** Weather: Bulk (50/batch) with individual fallback. Places: Individual. POI: Individual (parallelized).


# 8. Constraints & performance considerations

**Rate Limits:** Open-Meteo ~10k/day, Nominatim 1/sec, Geoapify/OpenTripMap vary by plan.

**Timeouts:** Nominatim 8s, others browser default.

**Geographic:** UK only (\`country_codes=gb\`), coverage depends on Open-Meteo availability.

**Optimisations:** Parallel 10km/25km/50km searches, bulk weather (50/location), deferred POI (saves 8-10s), candidate limiting (top 50-100), deduplication by name.

**Why POI Async:** Geoapify queries ~1-2s/destination, 5×2s = 10s added latency. Trade-off: Initial cards without "things to do" tags.

## Observability

- All external API calls log source usage and fallback paths to support debugging and reliability analysis.
- Search-level metadata is recorded per request, including:
  - search radius used
  - number of candidate places evaluated
  - number of dry locations returned
- Centralised error logging captures:
  - external API failures
  - rate-limit events
  - timeout and network errors

---

# 9. Error handling & edge cases

**Failure Modes:**
1. No dry destinations: Empty array, empty state message
2. API timeout (Nominatim): 8s timeout → fallback, no user error
3. Invalid location: 400 error, "Location not found"
4. Weather API failure: Individual failures excluded, bulk → individual fallback, no partial results
5. Rate limit: 429/403 → mark failed, skip future calls, "Service unavailable" if all fail
6. All raining: All filtered → empty results
7. POI failure: Empty POI arrays, cards without tags
8. User location dry: Still searches (no early exit)

**Edge Cases:** Remote location (no POIs within 100km → hardcoded fallback), international (UK filter → empty), rapid weather changes (forecast may be outdated), duplicate names (deduplication by name+distance), administrative areas (filtered by name patterns).

# 10. Non-goals & explicit trade-offs

**Non-Goals:** Future planning, indoor alternatives, driving directions, real-time weather, user preferences, historical data, multi-day planning, route optimisation.

**Trade-offs:**
1. Distance vs weather confidence: Prioritise distance
2. API calls vs speed: Sequential = slower but simpler (2-5s latency)
3. POI richness vs load time: Deferred saves 8-10s, initial cards without tags
4. Search radius vs coverage: Auto starts 10km, may miss closer
5. Strict vs relaxed: Strict excludes rain in next 4h, may exclude dry-by-arrival
6. Bulk vs individual: Bulk faster but may fail → individual fallback`
};
