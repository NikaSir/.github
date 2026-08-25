# NikaS Integration Panel Template v1.1

Status: **mandatory for all specialized integration-owned panels**  
Primary target: **iPhone Pro Max · portrait · one-handed use**  
Revision: **2026-08-25**

## 1. Purpose and scope

This template defines the shared application shell and visual primitives for all specialized Home Assistant panels in the NikaS ecosystem, including Stark SolarPower, HO-SC-8W, S8 OMNI, Keenetic Hero 4G+, VLESS Gateway and future integration-owned panels.

The user must experience these panels as subsystems of one application, not as unrelated custom frontends.

A developer of a new specialized panel chooses domain content, device context, tabs, telemetry, actions and diagrams. The shell itself is not redesigned per integration.

## 2. Canonical panel structure

Every primary view follows this order:

```text
┌─────────────────────────────────────────────┐
│ ☰              PANEL TITLE            ↻ / ⋮ │
│                subtitle · UI vX.Y.Z         │
├─────────────────────────────────────────────┤
│   DeviceContextSelector (optional)          │
│                                             │
│   HeroStatus                                │
│                                             │
│   ViewContent                               │
│                                             │
├─────────────────────────────────────────────┤
│ Tab 1       Tab 2       ...       Diagnostics│
└─────────────────────────────────────────────┘
```

Order is stable across integrations.

## 3. Header

The Header uses a symmetric grid:

```text
52px | minmax(0, 1fr) | 52px
```

On narrow mobile layouts it may use:

```text
48px | minmax(0, 1fr) | 48px
```

### Left slot

The left slot always contains the Home Assistant main-system menu control:

```text
☰
```

Requirements:

- minimum touch target: 44 × 44 px;
- icon: `mdi:menu` or the native Home Assistant menu glyph;
- activation dispatches `new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true })`;
- it is never Back, browser history, an integration drawer or a device action;
- parent or drill-down navigation, when required, is placed inside the work area;
- the menu button remains at native scale and below the effective top safe area;
- hold and double tap do not execute device actions.

### Center slot

The title is geometrically centered relative to the viewport.

First line: human-readable subsystem name.

Second line:

```text
<type / model> · UI vX.Y.Z
```

Examples:

```text
Stark SolarPower
UPS · UI v0.3.3
```

```text
Полив
HO-SC-8W · UI v0.4.4
```

```text
Keenetic Hero 4G+
Network Control Center · UI v0.3.0
```

Do not repeat the same large title immediately below the Header.

### Right slot

The right slot has the same geometry as the left slot.

At most one primary global action is shown:

- Refresh (`mdi:refresh`) when a real integration-owned refresh action exists;
- More (`mdi:dots-vertical`) when a global panel menu is justified;
- otherwise an empty symmetric slot is retained.

Header controls never execute domain device actions unless the action is explicitly defined as a panel-global action.

## 4. Device context selector

Use a DeviceContextSelector only when one panel represents multiple peer physical devices.

It appears directly below the Header and above the HeroStatus.

Requirements:

- device order is stable;
- selection changes panel content, not button order;
- selection persists while moving between main tabs;
- active device uses primary border/surface/text;
- a small semantic status dot may be shown: green normal, yellow attention, red error, gray unreliable/no data;
- the selector is not a primary navigation tab.

Do not use it for channels/zones of one controller.

## 5. HeroStatus

The first content card answers:

> **What is happening with the system right now?**

HeroStatus contains:

1. one large factual status;
2. one short explanation;
3. optionally one compact badge.

Examples:

```text
✓ Нормально
UPS работает от сети
```

```text
✓ Полив не идёт
Контроллер готов
```

```text
● Онлайн
Интернет доступен
```

```text
! Состояние неизвестно
Нет достоверной телеметрии
```

Technical diagnostic detail does not belong in the Hero.

## 6. Semantic colors

Color is semantic, not decorative.

| Meaning | Color role |
| --- | --- |
| normal / available / working | green |
| selected / informational / active | primary / blue |
| warning / attention | orange |
| error / unavailable | red |
| unknown / unreliable / no data | gray |

Do not assign colors merely to distinguish subsystems.

## 7. Shared card geometry

Primary cards use the same baseline geometry:

```text
border-radius: 20–24px
padding: 16–20px
vertical/card gap: 12–16px
border: 1px divider-color
shadow: none or minimal
```

Hierarchy comes from typography, spacing, state and grouping rather than heavy shadow effects.

## 8. MetricCard

Key numeric metrics use a consistent form:

```text
Input
224,6 V
```

```text
Load
13 %
```

Rules:

- metric label uses secondary text;
- value uses primary semi-bold/bold text;
- unit is always shown when the metric has one;
- locale-appropriate formatting is preferred.

Do not show unitless values when a physical unit exists.

## 9. Shared content primitives

Specialized panels build ViewContent from the same visual primitives:

### StatusCard

```text
Name                         Normal
secondary text
```

### MetricCard

```text
Metric
123 unit
```

### StateRow

```text
Icon   Name                    Value >
```

### ActionCard

```text
Icon   Action
       short explanation
```

### AlertCard

```text
! Problem
  short explanation
```

### Diagram

Use a diagram only when topology or data flow materially improves understanding.

## 10. Primary content width

Mobile uses the full available width with system side gutters.

Desktop/tablet uses a centered working area:

```text
max-width: 1200–1280px
margin: 0 auto
```

Do not stretch useful content across very wide desktop canvases.

## 11. BottomTabBar

BottomTabBar is the primary internal navigation mechanism.

It is always:

- fixed;
- edge-attached to the viewport bottom;
- full-width;
- iOS Safe Area aware;
- non-floating;
- available during vertical scroll;
- backed by enough content bottom clearance that the last card can scroll fully above it.

Floating pill navigation is prohibited.

## 12. Tab count and labels

Target 3–5 main tabs; maximum 5.

Each tab has:

- an icon;
- a short label;
- a minimum 44 px touch target.

Preferred vocabulary:

```text
Обзор
Управление
WAN/LTE
Станция
Сервис
История
Настройки
Диагностика
```

`Диагн.` is allowed only where the full word physically does not fit the mobile tab bar.

The first tab is always `Обзор`. When technical telemetry exists, the final main tab is `Диагностика` or the justified narrow form `Диагн.`.

## 13. Active tab

The active tab is highlighted inside the shared BottomTabBar by:

- primary icon;
- primary label;
- light primary surface inside its own cell.

It must not appear as a separate floating card.

## 14. Overview contract

Overview answers, as early as possible:

- is the subsystem working;
- what is happening now;
- what are the key operating metrics;
- is there a problem requiring attention.

Technical diagnostics remain out of Overview unless they directly affect operational truth.

## 15. Diagnostics contract

Diagnostics contains integration health, transport, caches, freshness, raw/technical state, unsupported or laboratory details, and verification screens.

It must not overload Overview.

`unknown` / `unavailable` are never mapped to healthy/off/zero. Use explicit unreliable wording such as `Нет данных`, `Состояние неизвестно`, or `Нет достоверной телеметрии`.

## 16. Loading state

Loading keeps the application shell visible:

```text
Header
↓
Skeleton / Loading state
↓
BottomTabBar
```

A blank white page is not an acceptable loading state.

## 17. Long press

Where a visual control is backed by a factual Home Assistant entity:

```text
hold → standard Home Assistant more-info
```

Header, DeviceContextSelector and BottomTabBar are navigation/shell controls and do not trigger entity-specific actions.

## 18. Refresh

If the integration provides a genuine forced refresh, expose one refresh action in the Header.

Do not duplicate Refresh inside content without a domain-specific reason.

## 19. Mobile-first and responsive behavior

Primary acceptance viewport:

```text
iPhone Pro Max · portrait
```

Mobile uses one primary column. Tablet/desktop may use two columns or a domain-specific composition, but the information hierarchy stays the same.

Desktop is an adaptation of the mobile application, not a separately designed dashboard.

## 20. Home Assistant sidebar

The Home Assistant sidebar is outside the specialized-panel shell. The panel uses the remaining viewport and does not visually imitate or recreate the sidebar.

## 21. Production frontend rule

The separate `SPECIALIZED_PANEL_FRONTEND_RELEASE_STANDARD.md` is mandatory.

The production rule is:

> **Specialized Panel = self-contained production frontend bundle.**

The shared template/reference implementation is a development-time reference or vendored source. It must never become a shared runtime dependency between integrations.

Each integration ships its own autonomous production bundle.

## 22. Logical implementation template

Every implementation should map to these concepts:

```text
PanelShell
│
├── AppHeader
│   ├── HomeAssistantMenuButton (`hass-toggle-menu`)
│   ├── Title
│   ├── Subtitle / UI version
│   └── HeaderAction
│
├── DeviceContextSelector (optional)
│
├── HeroStatus
│
├── ViewContent
│   ├── StatusCard
│   ├── MetricCard
│   ├── StateRow
│   ├── ActionCard
│   ├── AlertCard
│   └── Diagram
│
└── BottomTabBar
```

Developers reuse this shell and primitives rather than designing new shell geometry.

## 23. Existing-panel alignment

### Stark SolarPower

Preserve UPS selector, Hero and `Сеть → UPS → Нагрузка` subject model. Align Header geometry and full-width BottomTabBar.

### HO-SC-8W

Preserve compact operational status, next watering and zone workflow. Standardize the Home Assistant `☰` menu control, symmetric Header slots and shared BottomTabBar style.

### S8 OMNI

Preserve composite robot/station status and major cleaning actions. Align Header, status badges and BottomTabBar to the shared shell.

### Keenetic Hero 4G+

Preserve WAN diagram and Ethernet/LTE subject model. Align Header, Hero, card radii/spacing and BottomTabBar.

### VLESS Gateway

Adopt the template from the first public specialized-panel release.

## 24. Developer-owned variability

A specialized-panel developer chooses only:

1. panel title and subtitle/model;
2. optional parent/drill-down navigation placed inside the work area;
3. whether a DeviceContextSelector is needed;
4. HeroStatus semantics;
5. ViewContent for each tab;
6. tab set within the 3–5 rule;
7. domain-specific diagrams and actions.

Header geometry, `hass-toggle-menu` behavior, shared typography, card geometry, state semantics, BottomTabBar behavior, zoom lifecycle, loading shell, long-press convention and production-bundle rules are common project infrastructure.

## 25. Zoom behavior

Every specialized panel contains exactly one zoomable work viewport.

- only work content scales;
- Header, Home Assistant menu button, DeviceContextSelector and BottomTabBar remain at native scale;
- the normal mobile interaction is two-finger focal-point pinch with pan/scroll when enlarged;
- permanent on-screen `− / % / +` controls are not used;
- a pinch ending at 97–103% snaps to exactly 100%;
- a two-finger double tap resets scale and work-area scroll to 100%;
- reset/snap briefly shows the native-scale confirmation `Масштаб 100%`;
- scale persists locally per panel/client and per peer device where applicable;
- rerender reconciliation is idempotent: never re-wrap an existing zoom viewport or duplicate gesture handlers.

## 26. Acceptance effect

When moving through:

```text
UPS → Полив → S8 OMNI → Keenetic → VLESS
```

users should perceive one NikaS application ecosystem with different subsystems, not a collection of unrelated custom frontend applications.
