# Austin Political Domain Portfolio

Inventory date: 2026-08-01. Source: Namecheap MCP `domains_list`, public DNS,
and read-only HTTPS checks.

All 18 domains are registered through August 2027, use WHOIS privacy, and delegate
DNS to Cloudflare. Namecheap is the registrar, but Cloudflare—not Namecheap—must
be used for DNS and redirect changes. No DNS, registration, or renewal setting was
changed during this inventory.

Deployment update: on 2026-08-01 the unified Worker was deployed to all 18 apex
domains and all 18 corresponding `www` hostnames. Pre-migration content and DNS
records are preserved under `domains/snapshots/2026-08-01/`. All public hostnames
were verified over HTTPS after activation.

## Independent public properties

| Domain | Role | Current state | Renewal action |
| --- | --- | --- | --- |
| `austintaxrateelection.com` | Canonical year-over-year Austin tax-rate and budget archive | Live on the unified Worker | Keep; enable auto-renew before 2027 renewal |
| `atxcitycouncil.com` | Distinct evidence-first council vote and fiscal-accountability tracker | Live on the unified Worker | Keep; enable auto-renew before 2027 renewal |
| `austincitycounciltaxincrease.com` | Distinct current-year tax-change explainer and homeowner calculator | Live on the unified Worker | Keep; enable auto-renew before 2027 renewal |

These properties use one repository, one Cloudflare Worker deployment, one static
asset collection, a shared design system, a shared source schema, and shared
analytics conventions. Hostname routing gives each property its own canonical URLs,
navigation, and editorial purpose without separate codebases or deployments.

## Descriptive aliases

| Domain | Destination | Treatment | Auto-renew now |
| --- | --- | --- | --- |
| `austincitycounciltax.com` | `austintaxrateelection.com/years/2026-27/` | Snapshotted, then permanently redirected | Off |
| `austintre.com` | `austintaxrateelection.com/guides/tax-rate-elections.html` | Live permanent redirect; short memorable alias | Off |
| `voteaustintaxrateelection.com` | `austintaxrateelection.com/years/2025/` | Live permanent redirect to the certified election archive | Off |

Keep all three through at least the 2027 renewal review. The first two have strong
evergreen descriptive value even though they are not independent sites.

## 2025 opposition campaign aliases

| Domain | Destination | Treatment | Auto-renew now |
| --- | --- | --- | --- |
| `defeataustintaxincrease.com` | `/prop-q-defeated.html` | Live permanent redirect to preserved opposition material | Off |
| `votenoaustin.com` | `/prop-q-defeated.html` | Live permanent redirect to preserved opposition material | Off |

The destination must be visibly labeled historical campaign material and link to
the neutral election result, adopted amended budget, and current-year archive.

## 2025 support/Love Austin campaign aliases

| Domain | Destination | Treatment | Auto-renew now |
| --- | --- | --- | --- |
| `loveaustincampaign.com` | `/years/2025/#campaign-record` | Live permanent redirect to the neutral provenance record | On |
| `loveaustinpropelection.com` | `/years/2025/#campaign-record` | Live permanent redirect to the neutral provenance record | On |
| `loveaustinpropq.com` | `/years/2025/#campaign-record` | Live permanent redirect to the neutral provenance record | On |
| `propqloveaustin.com` | `/years/2025/#campaign-record` | Live permanent redirect to the neutral provenance record | On |
| `voteloveaustin.com` | `/years/2025/#campaign-record` | Live permanent redirect to the neutral provenance record | On |
| `votenoloveaustin.com` | `/years/2025/#campaign-record` | Live permanent redirect to the neutral provenance record | On |
| `voteyesaustin.com` | `/years/2025/#campaign-record` | Snapshotted, then permanently redirected | Off |
| `voteyesaustintre.com` | `/years/2025/#campaign-record` | Snapshotted, then permanently redirected | Off |
| `voteyesloveaustin.com` | `/years/2025/#campaign-record` | Snapshotted, then permanently redirected | On |
| `voteyespropq.com` | `/years/2025/#campaign-record` | Live permanent redirect to the neutral provenance record | On |

Support and opposition archives must receive equal provenance treatment: original
date, sponsor/author when documented, archived copy, factual corrections in a
separate annotation, and no silent rewriting.

## Renewal and routing status

1. Completed: local snapshots captured for every retrievable live hostname.
2. Completed: conflicting apex and `www` web records captured to a rollback JSON;
   mail and unrelated records were left unchanged.
3. Completed: unified Worker and 36 Custom Domains deployed.
4. Completed: apex and `www` HTTPS, status, final URL, query preservation,
   analytics, sitemaps, robots files, and cross-property links verified.
5. Pending: monitor production errors and traffic for seven days.
6. Pending: enable auto-renew for the six independent/descriptive domains marked to keep.
   Namecheap MCP currently reports renewal state but has no tool to change it.
7. In May 2027, review traffic, backlinks, legal/preservation value, and renewal cost
   for every campaign alias. Do not let a domain expire merely because it is idle.

## Security cleanup

The untracked `domain-migrate/` directory contains registrar-transfer credentials in
a plaintext file with broad local read permissions. After confirming every transfer
is complete, move that credential file to secure storage or Trash, rotate any still
valid codes, and ensure the directory is ignored by the Projects registry repository.
Never commit or quote those credentials.

## Off-limits boundary

The `stevenbrown` project and any associated campaign domain are excluded from this
portfolio. Do not infer that a public mention of Steven Brown authorizes access to
his site, repository, account, or infrastructure.
