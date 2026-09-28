# Pre-migration snapshots

Captured on 2026-08-01 immediately before the unified Cloudflare Worker migration.
The `pre-migration/` directory contains local Wget mirrors of every HTTPS hostname
that returned a successful response during the inventory. Wget converted local
links so the mirrors remain browsable offline. Hosts that lacked DNS or usable TLS
had no retrievable content to preserve.

The capture was limited to the 18 Austin tax/council/campaign domains in the domain
portfolio. Excluded people, projects, domains, and infrastructure were not queried
or copied as part of the snapshot operation.
