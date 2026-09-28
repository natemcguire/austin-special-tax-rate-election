# Storage cleanup — September 27, 2026

Completed the Austin folder migration. The wider Projects migration remains incomplete.

## Completed

- Preserved the complete former local `~/Projects/austin-tax-rate-election` collection, including hidden Git directories and assets, as a tar archive on the Mac mini external drive.
- Compared SHA-256 hashes of all **973 regular files** in the archive against their originals. Verified all original regular files were represented; verified archived symbolic links against originals.
- Archive: `/Volumes/MacMiniExtra/Projects/_local-migration-archive/2026-09-27-macbook/austin-tax-rate-election.tar` on the mini (434 MiB / 454,980,096 bytes).
- Archive SHA-256: `dea186a264d201db48f7d8f4ed5fa4fbba08bcd0bb1804a8938ddbd0535b5db8`.
- Verification record sits alongside the archive as `austin-tax-rate-election.verification.json`.
- Replaced the old MacBook directory with a symlink to `~/.mini/Projects/austin-special-tax-rate-election`. Removed the original only after archive verification. Recovered approximately **435 MiB on the MacBook**.
- Fixed `~/.local/bin/on-mini` to resolve the physical SMB mount before matching the current working directory. It now correctly maps `/Volumes/Projects/austin-special-tax-rate-election` to the mini project. Shell syntax and an actual remote directory check passed. Original script: `on-mini.before` alongside the archive.
- No website source or existing canonical repository state was changed by storage cleanup.

## Restoring the old collection

Run on the mini after external-drive shell access is available, choosing a fresh destination:

```sh
mkdir -p ~/Projects/_restored-austin-2025
cd ~/Projects/_restored-austin-2025
tar -xf ~/Projects/_local-migration-archive/2026-09-27-macbook/austin-tax-rate-election.tar
```

This produces an isolated `austin-tax-rate-election/` containing the old collection. Do not extract over the current unified project. The archive is also reachable from this MacBook at `~/.mini/Projects/_local-migration-archive/2026-09-27-macbook/`.

## Remaining project folders

The local Projects root contains **83 other visible directories without a same-named mini counterpart**, plus `_handoff-plans`, hidden configuration directories, and loose files. These are actual local data, not just extra symlinks. An initial size inventory found roughly 35 GiB, with the largest entries including GC-Project, purecalculators working copies, honeymoon-flim, and BookScans. This is an estimate; the inventory was stopped to avoid competing with active website work.

Complete top-level inventory: `_local-migration-archive/2026-09-27-macbook/remaining-local-project-entries.json` on the mini. Names and counterpart presence are recorded without exposing file contents. These unrelated live projects were not compressed into unusable tar-backed shortcuts or overwritten. Their expanded migration and worktree reconciliation remain outstanding.

## Mini disk findings and blockers

- Mini `~/Projects` already points to `/Volumes/MacMiniExtra/Projects`. The external APFS container has approximately **1.2 TiB available**.
- Mini internal disk had approximately **12–13 GiB available** during inspection, with its Data volume about 94% full.
- SSH can inspect the external project directory itself but listing its contents and running Git there fail with macOS **Operation not permitted**. SMB access works. This macOS external-volume access restriction blocks direct mini-side copy/move/build operations; fixing `on-mini` directory mapping does not fix this separate access restriction.
- An expanded SMB copy of the Austin collection was extremely slow because of per-file operations. A single tar stream completed successfully. Broad expanded migration needs functioning mini-side external-drive access or a planned SMB transfer window.
- The 14 GiB `~/Library/Developer/CoreSimulator.recipeas-local-test-*` directory is **active**, despite its historical-looking name: `CoreSimulator` points to it and simulator processes hold it open. It was not moved.
- Other large internal folders include Claude application support (~10 GiB), Codex generated images (~7.7 GiB) and sessions (~3.6 GiB), Ollama (~7.6 GiB), and Sublime Text indexes (~3.4 GiB). Relevant apps/services are active; these were not removed or relocated underneath running processes.
- **No verified mini-internal disk recovery is claimed.** Safe relocation requires external-volume access plus coordinated shutdown or application-supported storage relocation for the active data. No uncertain user data was deleted.
