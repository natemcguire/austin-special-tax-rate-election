# Austin portfolio audit — September 27, 2026

Scope: all ten domain folders in the old `austin-tax-rate-election` directory, reconciled with the canonical unified Worker and its full eighteen-domain portfolio. Initial read-only audit, followed by the authorized factual update recorded below. No DNS, renewal, or deployment changes made by this audit task. The current production source is `austin-special-tax-rate-election`, not the historical nested repositories.

## Recommendation

Keep three distinct properties: election/annual archive, Council accountability, and tax calculator. Upgrade the two useful sibling sites; keep the fifteen aliases as historical/descriptive redirects. The biggest current problem is stale August 1 information, not an obsolete framework. The canonical portfolio was already consolidated on August 1, 2026, so the older local folders exaggerate how much needs rebuilding.

## Priority 1 — calculator accuracy

`austincitycounciltaxincrease.com` still uses proposed rate 0.579530 and proposed typical-home increase $173.87. Update all three pages together (`index.html`, `methodology.html`, `sources.html`), including inline JavaScript, metadata, static fallback results, examples and verification dates.

- Adopted FY 2026–27 rate: **$0.579948 per $100 taxable value**. Prior effective rate remains $0.524017. The official voter-approval rate equals the adopted rate; this is not a new Prop Q tax-rate election.
- At $400,000 City taxable value both years: prior $2,096.07, current $2,319.79, change **$223.72/year**, $18.64/month. At $100,000: $55.93/year increase. Preserve the old proposal as a dated comparison rather than silently overwriting the record.
- The City's adopted typical example is **+$113.76/year property tax**; rates/fees are +$172.08, combined +$285.84. Keep this modeled example distinct from a visitor's calculator inputs.
- Current calculation maps empty/invalid values to zero, and clamps negative values silently. Add explicit invalid/empty states; do not present a made-up zero-dollar levy while an input is incomplete. Retain City-taxable-value guidance and the two separate years.
- Add a short Prop I link explaining that the charter question itself does not set the rate used by this calculator.

Sources: [official City rates and prior-year table](https://www.austintexas.gov/budget-excellence/tax-rates); [August 12 adopted-budget announcement](https://www.austintexas.gov/communications/news/austin-city-council-approves-66-billion-budget-fiscal-year-2026-2027). Use the rate table's dollars-per-$100 units; the announcement contains an awkward “dollars ... cents” wording.

## Priority 1 — Council accountability

`atxcitycouncil.com` homepage, `votes.html`, and `budget-2026-27.html` still call August 12–14 a future adoption window and defer member-level records. Replace the current-state sections with adopted outcomes; preserve proposal history in a dated chronology.

- Budget adopted August 12: $6.6 billion citywide, $1.5 billion General Fund, with adopted rate above.
- **Budget vote: 9–2.** Watson and Duchen against; all nine other members for, including Siegel.
- **Tax-rate vote: 8–2, one off dais.** Watson and Duchen against; Siegel off dais; the other eight for. Never merge these two votes into one score.
- Add separate linked records for the efficiency-study contract, existing efficiency ordinance, and proposed charter amendment. Explain what Prop I changes compared with existing law. Retain the exact ordinance wording and distinguish contracts, legal requirements, recommendations, and delivered savings.
- Replace the public “publication checklist after adoption” with actual known outcomes and clearly bounded missing documents. The City announcement says the full approved book will be available October 1; do not pretend that all adopted-book detail has already been checked.
- Add operator/contact/correction information to `sources.html`. Remove the internal STORM-corpus implementation detail from the public editorial method; primary evidence and correction handling matter to readers.

Sources: [official adopted-budget member votes](https://www.austintexas.gov/budget-excellence/city-budget); [separate tax-rate member votes](https://www.austintexas.gov/budget-excellence/tax-rates); [August 12 agenda and executed tax ordinance](https://www.austintexas.gov/council/2026/20260812-reg).

## Priority 2 — design and independence

Both sibling sites use the same small shared stylesheet: blue gradient hero, rounded white statistic cards, pale gray background, generic system typography. It is serviceable and responsive in code, but does little to establish editorial identity.

Give the Council property a compact newspaper-style masthead, strong typographic hierarchy, restrained ink/paper colors, item-level vote tables and a prominent last-verified date. Lead with a specific decision and what changed, rather than abstract slogans. Give the calculator a quieter utility layout: inputs, annual/monthly output, adopted-rate badge, source and scope beside the result. Carry shared navigation and publication identity across all three sites without making three near-identical homepages.

Independence should be observable: disclose who operates the portfolio, link exact sources beside claims, separate opinion from records, publish corrections, and label historic advocacy consistently. Do not use candidate grades, undocumented savings claims, or campaign-style urgency to create sophistication. Preserve useful accessible features already present (explicit labels, semantic tables, live calculator output); add skip links, visible keyboard focus and numeric error messaging during the design pass. Browser/mobile visual verification remains necessary before shipping.

## Domain-by-domain disposition

| Domain | Current canonical role/destination | Action |
| --- | --- | --- |
| austintaxrateelection.com | Independent election and annual archive | Root task: Prop I front page, preserve 2025 archive and old URLs. |
| atxcitycouncil.com | Independent Council tracker | Update adopted records and oversight timeline; redesign next. |
| austincitycounciltaxincrease.com | Independent calculator | Correct adopted rate and all dependent examples first. |
| austincitycounciltax.com | `/years/2026-27/` | Keep alias; refresh destination's adopted-budget record. |
| austintre.com | `/guides/tax-rate-elections.html` | Keep evergreen alias; distinguish tax elections from charter elections. |
| voteaustintaxrateelection.com | `/years/2025/` | Keep historical destination; avoid redirecting old campaign traffic straight into 2026 guidance. |
| defeataustintaxincrease.com | `/prop-q-defeated.html` | Keep dated opposition archive and link neutral certified result. |
| votenoaustin.com | `/prop-q-defeated.html` | Same preservation treatment. |
| voteyesaustin.com | `/years/2025/#campaign-record` | Keep provenance destination and original snapshot. |
| voteyesaustintre.com | `/years/2025/#campaign-record` | Same preservation treatment. |
| loveaustincampaign.com | `/years/2025/#campaign-record` | Keep historical redirect. |
| loveaustinpropelection.com | `/years/2025/#campaign-record` | Keep historical redirect. |
| loveaustinpropq.com | `/years/2025/#campaign-record` | Keep historical redirect. |
| propqloveaustin.com | `/years/2025/#campaign-record` | Keep historical redirect. |
| voteloveaustin.com | `/years/2025/#campaign-record` | Keep historical redirect. |
| votenoloveaustin.com | `/years/2025/#campaign-record` | Keep historical redirect; provenance must identify actual position rather than inferring it from group placement. |
| voteyesloveaustin.com | `/years/2025/#campaign-record` | Keep historical redirect. |
| voteyespropq.com | `/years/2025/#campaign-record` | Keep historical redirect. |

All destinations above are on austintaxrateelection.com. The first ten rows account for every old local domain folder. The final eight were found in the canonical portfolio. Retain original assets/PDFs and snapshots; they are source material, not additional sites to deploy. Do not publish the old folder's top-level `index.html` as another current property.

## Verification and maintenance

- Inspected canonical router, shared CSS, all seven Council/calculator HTML pages, portfolio inventory and old folder inventory. Public web retrieval independently confirmed the stale Council homepage, vote page, budget page and calculator.
- Router defines 308 aliases and HTTPS/www normalization. Automated direct requests to all 36 apex/www endpoints returned 403 from this environment, including the three sites successfully readable through the web tool. This does **not** establish 36 broken domains; redirect/browser checks remain a deployment verification item.
- No claim of exhaustive browser visual QA, live interactive testing or current registrar-state verification. The August portfolio inventory's renewal status must be rechecked before any renewal decision. Do not assume its pending items remain pending today.
- Add a small event-based publishing routine: budget proposal, adopted rate, ballot order, election certification and amendments. One shared source record for rates/status would prevent calculator, council and archive from drifting independently. Keep the static architecture; this does not warrant a framework migration.
- Recheck all legacy deep links and query preservation before deployment. Existing alias logic intentionally discards request paths, so old campaign deep links resolve to a historical record, not the original document; add specific mappings only where meaningful backlinks require them.

Suggested order: correct calculator and Council records; ship primary Prop I explainer with archive intact; align sibling editorial design; verify aliases and legacy links; review renewal state ahead of 2027. All implementation must occur in the mini-backed canonical repository.

## Implementation follow-up — September 27

Corrected the served calculator, its methodology/source pages, the Council homepage/current budget/vote records, and the annual FY 2026–27 archive record to use adopted figures. Dated July proposal figures remain. Updated the two sibling sitemaps. The broader visual redesign, input-validation improvement and event-based maintenance suggestions remain recommendations.
