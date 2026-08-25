# Home Assistant NikaS — Specialized Panel Frontend Release Standard

Status: **mandatory for all new specialized-panel releases**  
Revision: **2026-08-22**

## 1. Scope

This rule applies to every integration-owned Home Assistant frontend panel in the NikaS ecosystem, including Stark SolarPower, Keenetic, HO-SC-8W, S8 OMNI, VLESS Gateway and future integrations. It covers panels registered through `panel_custom` or an equivalent Home Assistant mechanism.

## 2. Production bundle

A production specialized panel must be delivered as **one autonomous JavaScript bundle**.

The file registered by Home Assistant as `module_url` must itself contain all project-owned code required to register and run the panel.

Allowed runtime shape:

```text
Home Assistant
      ↓
integration-panel.js?v=X.Y.Z
      ↓
<integration-panel>
```

A production panel must not depend on a chain of its own previous frontend versions.

## 3. Historical-version imports are prohibited

The current production module must not import a previous panel version, for example:

```js
import "./panel-v031.js";
```

when the active production module is a later release.

Previous versions belong in Git history, tags, releases, or development source modules. Version history is the responsibility of source control, not the end user's browser runtime.

## 4. Source vs production artifact

Frontend source may be developed modularly, for example:

```text
src/
  shell.js
  header.js
  navigation.js
  diagnostics.js
  overview.js
  styles.js
```

Before release, that source must produce one self-contained production artifact, for example:

```text
dist/
  integration-panel.js
```

Development modularity must not become a cascade of project-owned HTTP imports when the panel opens.

## 5. Registration

`module_url` must point only to the final self-contained bundle.

Preferred form:

```text
/integration_panel/integration-panel.js?v=0.4.2
```

A versioned filename is also allowed, but stable filename plus query-string cache busting is preferred for simpler registration and maintenance.

## 6. Runtime dependency rule

For baseline panel loading:

> one registered panel module = one primary project-owned frontend load point.

Sequential loading of historical or patch JavaScript files is prohibited.

External dependencies are allowed only when technically necessary and must be reviewed separately as an architecture decision.

## 7. Reliability rationale

Every extra runtime import adds another failure point:

```text
HA → module A → module B → module C → module D
```

This is especially risky for Home Assistant Companion App, iOS WebView, Home Assistant Cloud / Nabu Casa, cold browser caches, post-update starts, post-restart starts, and slow or unstable links.

Production frontend must minimize dependency on resource ordering and timing.

## 8. Cache independence

Panel correctness must not depend on previous frontend files already being present in browser cache.

Mandatory test path:

```text
empty cache
→ fresh HA frontend start
→ open specialized panel
→ panel loads correctly
```

A warm-cache reopen alone is not sufficient acceptance evidence.

## 9. Release acceptance

A specialized frontend release is ready only after successful verification of:

1. local-network panel load;
2. Home Assistant Cloud / Nabu Casa panel load;
3. cold client start;
4. full Home Assistant restart followed by panel load;
5. repeated panel opens;
6. navigation into the panel from its parent dashboard;
7. permanent left Header button opens the native Home Assistant menu through `hass-toggle-menu`;
8. Header remains below notch/Dynamic Island with no duplicated safe-area band;
9. exactly one zoom viewport and one gesture-handler set remain after repeated rerenders;
10. two-finger focal-point pinch and pan/scroll work on touch clients;
11. two-finger double tap resets scale and work-area scroll to 100%;
12. a completed 97–103% pinch snaps to exactly 100%;
13. reset/snap briefly confirms `Масштаб 100%`;
14. no permanent on-screen `− / % / +` zoom toolbar is rendered;
15. no `Unable to load custom panel`;
16. no `Configuration error`;
17. no runtime dependency on files from previous UI versions.

## 10. Release/version requirements

Changing frontend bundle/loading architecture is a release-significant change. It must:

- receive a distinct UI version;
- be recorded in `CHANGELOG`;
- pass CI;
- be tested before production publication.

A hardening release may intentionally preserve the visual design while changing only packaging/loading mechanics.

## 11. Project architecture principle

For central dashboards — `Дом`, `Действия`, `Инфраструктура` — prefer native Lovelace components with minimal custom-frontend dependency.

For specialized integration-owned panels, `panel_custom` is allowed, but the contract is:

> **Specialized Panel = self-contained production frontend bundle.**

Custom panels are acceptable. Fragile chains of custom frontend modules are not.

## 12. Normative statement

Each specialized Home Assistant panel must ship as an autonomous, deterministic production frontend bundle. The file registered as `module_url` must not depend at runtime on previous frontend versions of that panel. Change history belongs in Git, not in a JavaScript import chain. The panel must load correctly from a cold start, locally and through Home Assistant Cloud, independently of browser-cache state.
