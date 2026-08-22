# Home Assistant NikaS — Specialized Panel UI Standard

Status: **mandatory project-wide UI contract**

Primary acceptance viewport: **iPhone Pro Max · portrait · one-handed operation**

Specialized integration panels are designed as mobile applications inside Home Assistant, not as ordinary Lovelace dashboards.

## 1. Common application shell

Every specialized panel has three persistent layers:

1. **Header** — exits the specialized application and hosts at most 1–2 truly global panel actions.
2. **Content** — device-specific status, controls, telemetry, graphs, diagnostics and workflows.
3. **Bottom Tab Bar** — switches only between the main sections of the current specialized application.

Canonical shape:

```text
┌─────────────────────────────────┐
│ ←  Panel title              ⟳ ⋮ │
├─────────────────────────────────┤
│                                 │
│        CURRENT SCREEN           │
│                                 │
│        STATUS                   │
│        CONTROLS                 │
│        TELEMETRY                │
│                                 │
│        vertical scroll          │
│                                 │
├─────────────────────────────────┤
│  Overview │ Section │ ... │ Diag│
└─────────────────────────────────┘
             iOS Safe Area
```

## 2. Header

Each primary screen uses the same compact Header.

Required:

- left: `mdi:arrow-left` and preferably text `Назад` when space allows;
- center/main area: panel/system title;
- optional secondary device identity text;
- right: at most 1–2 truly global actions such as Refresh or `⋮`.

### Back contract

Back uses an **explicit Home Assistant navigation target** declared by the panel as `parent_path`.

Browser-history semantics are not an application navigation contract.

Canonical parent routes:

| Specialized panel | parent_path |
| --- | --- |
| HO-SC-8W Irrigation | `/dashboard-actions` |
| S8 OMNI | `/dashboard-actions` |
| Keenetic Hero 4G+ | `/dashboard-infrastructure/overview` |
| Stark SolarPower UPS | `/dashboard-infrastructure/overview` |

The Back touch target should be approximately 44×44 pt or larger.

Header hold/double-tap must not execute device actions.

## 3. Main sections — Bottom Tab Bar only

Primary-section navigation belongs at the bottom of the viewport.

Top-tab patterns such as:

```text
Overview | Zones | Programs | Diagnostics
```

must not be used as the primary navigation pattern.

### Docked geometry

The canonical Tab Bar is the **full-width docked bar** variant.

It must:

- occupy the full useful width of the viewport;
- be fixed to the lower viewport edge;
- remain available while the page scrolls vertically;
- include iOS bottom Safe Area;
- not float as a detached card over content;
- not disappear during normal vertical scrolling;
- use large touch targets suitable for one-handed operation;
- use icon + short label;
- leave enough page-bottom padding so the final content card can scroll completely above the bar;
- use consistent height and geometry across all NikaS specialized panels.

Floating navigation bars/cards over page content are not compliant.

## 4. Active tab

The active section is indicated **inside the common Tab Bar**, not as a visually detached floating card.

Preferred treatment:

- accent icon color;
- accent text color;
- light local background;
- optional soft local corner radius;
- no detached elevation/shadow;
- no vertical translation that visually lifts the active tab out of the bar.

## 5. Navigation levels

Meanings are fixed across all specialized panels:

- **Header Back** → exit the specialized application to its declared parent route.
- **Bottom Tab Bar** → switch between main sections of the current specialized application.

Internal section changes never change the meaning of Back.

## 6. First-screen rule

Immediately after the Header, the user should see the domain state, not another navigation layer.

Priority:

```text
HEADER
↓
MAIN CURRENT STATE
↓
PRIMARY ACTIONS / TELEMETRY
↓
CONTENT
↓
BOTTOM TAB BAR
```

The first screen should answer: **what is happening now, and is everything normal?**

## 7. Avoid duplicate titles

The Header tells the user where they are.

The first hero/status card tells the user what is happening.

Avoid repeating a large panel/device title directly below the Header.

UI/integration versions belong in Diagnostics or compact secondary metadata.

## 8. Mobile-first acceptance

Primary acceptance device: **iPhone Pro Max in portrait orientation**.

Required:

- no horizontal scrolling;
- no clipped labels;
- primary interactions reachable one-handed;
- natural vertical scrolling;
- adequate spacing between critical controls;
- Header remains compact;
- Bottom Tab Bar does not cover content;
- last content card can fully scroll above the Bottom Tab Bar;
- iOS top and bottom Safe Areas are handled explicitly.

Tablet and desktop are secondary adaptations after mobile acceptance.

## 9. Shared identity, domain-specific content

The panels are not visually identical applications.

Shared across the ecosystem:

- Header geometry and Back placement;
- touch-target geometry;
- full-width docked Bottom Tab Bar;
- active-tab indication;
- Safe Area handling;
- navigation semantics;
- `unknown` / `unavailable` handling;
- long-press behavior.

Device-specific identity and workflows remain specialized.

## 10. Recommended Tab Bar contents

### HO-SC-8W Irrigation

```text
Обзор · Зоны · Программы · Диагн.
```

### S8 OMNI

```text
Обзор · Уборка · Станция · Сервис · Диагн.
```

### Stark SolarPower

```text
Обзор · Диагностика · История
```

### Keenetic Hero 4G+

```text
Обзор · WAN/LTE · Трафик · Диагн.
```

Optional when Failover becomes a complete workflow:

```text
Обзор · WAN/LTE · Failover · Трафик · Диагн.
```

Prefer 3–5 primary sections. Additional functions belong in Service, Diagnostics or drill-down screens rather than shrinking the Tab Bar below comfortable touch sizes.

## 11. Long press

For factual Home Assistant entity-backed UI:

```text
Long press → standard Home Assistant more-info
```

Header and Bottom Tab Bar are navigation elements and never trigger entity-specific actions.

## 12. Safety

Navigation refactoring must never weaken integration safety boundaries.

Prohibited:

- raw Tuya DP writes from frontend/Lovelace;
- direct RCI/SNMP write workarounds;
- bypassing integration APIs;
- synthesizing unverified controls;
- treating `unknown` / `unavailable` as normal/off;
- fake entities/actions;
- converting decorative Header elements into device-control shortcuts.

All writes must go through stable, tested APIs published by the owning integration.

## 13. Acceptance criterion

A specialized panel is compliant only when:

> A compact Header with explicit Back is always available at the top, while all primary sections are switched through a full-width fixed Bottom Tab Bar that is part of the application shell, does not float over content, respects iOS Safe Area, and remains available during vertical scrolling.

This is the common navigation contract for integration-owned panels in the Home Assistant NikaS ecosystem.
