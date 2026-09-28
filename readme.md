# Austin Tax Rate Archive

## Purpose

This project is a **citizen-run archive** of Austin's city budgets, property tax rates, and tax-rate elections, written by a resident who thinks City Hall spends too much and should have to prove otherwise before raising taxes. It takes a side (less taxes) and shows every source so readers can check the work. It began with the 2025 Proposition Q election and now follows what the City proposes and adopts each fiscal year.

The goal is to help residents understand:

- **What rate was proposed and what rate was finally adopted**
- **Whether a proposal is below, at, or above the voter-approval rate**
- **How the median-homestead tax example changes from year to year**
- **Which programs and services were added, reduced, transferred, or restored**
- **How final results compare with the public case made the year before**

---

## Guiding Principles

This project is built on the belief that **an informed public** is essential for good governance.  
Our guiding values are:

1. **Transparency** – Make budget and spending trends understandable to everyone, not just policy insiders.
2. **Clarity** – Present facts and charts in a mobile-friendly format so they are accessible on any device.
3. **Honesty** – We take a side and say so. Every number links to the primary document, and we quote the other side accurately before we answer it.
4. **Civic Engagement** – Encourage voter participation by explaining when, where, and how to vote.

---

## One Codebase, Multiple Domains

- `src/router.js` selects a site by hostname and handles descriptive/campaign-domain redirects.
- `public/` is the single Cloudflare Workers static-asset collection.
- `public/geography/united-states/texas/austin/archive/` serves the canonical
  tax-election archive at `austintaxrateelection.com`.
- `public/geography/united-states/texas/austin/council/` serves `atxcitycouncil.com`.
- `public/geography/united-states/texas/austin/tax-increase/` serves
  `austincitycounciltaxincrease.com`.
- `research/geography/united-states/virginia/fairfax/` is a separate unpublished
  geographic track for a future, dedicated Fairfax domain.
- `public/shared/` contains the design system and GA4 module used by new pages;
  the archive's local `analytics.js` keeps tracking consistent on legacy pages.

Cloudflare Workers Static Assets provides a single deployment. Multiple Custom
Domains invoke the same Worker; host routing preserves distinct canonical URLs and
editorial identities without separate deploys or duplicated codebases.

## Local Development

```bash
npm install
npm run check
npm run dev
```

Local multi-site preview paths are `/__site/council/` and
`/__site/tax-increase/`; the archive remains at `/`.

## Production

The unified Worker is deployed to all 18 portfolio domains at both apex and `www`.
Three domains serve independent properties; the remaining domains issue permanent
redirects to the relevant archive record. Each independent property publishes its
own `sitemap.xml` and `robots.txt`, and links to the other two properties.

## Annual Update Checklist

1. Add the City Manager's proposed budget, proposed tax rate, voter-approval rate, and taxpayer-impact statement.
2. Label every current-year figure as **proposed** until Council adoption is complete.
3. After adoption, replace proposals with the final rate, budget, and median-homestead example.
4. Record whether an election was required and, if so, add the certified result and final amended budget.
5. Link primary City documents for every tax-rate and dollar figure; use local reporting only for context.

---

## Data Sources

- City of Austin proposed, approved, and amended budget books
- City of Austin taxpayer-impact statements and tax-rate calculations
- Austin City Council ordinances, ballot language, and election records
- Travis County certified election results
- Local reporting for context, linked alongside primary records

---

## License

This project is intended for **public use and education**.  
You may reuse or adapt the content, provided sources are credited and data accuracy is maintained.

---

The homepage should be updated after each proposal, adoption, election, or post-election budget amendment. Campaign-era pages stay preserved and clearly labeled instead of being rewritten as current guidance.
