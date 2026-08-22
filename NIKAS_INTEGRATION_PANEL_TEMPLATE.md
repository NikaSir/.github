# NikaS Integration Panel Template v1.0

Status: **mandatory project-wide implementation template**  
Revision: **2026-08-22**  
Primary acceptance viewport: **iPhone Pro Max · portrait · one-handed operation**

This template complements `SPECIALIZED_PANEL_UI_STANDARD.md` and `SPECIALIZED_PANEL_FRONTEND_RELEASE_STANDARD.md`. If a panel-specific implementation conflicts with this template, the shared project standards win unless an explicit architecture decision says otherwise.

The purpose is to make Stark SolarPower, HO-SC-8W, S8 OMNI, Keenetic Hero 4G+, VLESS Gateway and future integration-owned panels feel like different subsystems of one NikaS application.

## 1. Canonical application structure

Every specialized panel uses the same shell order:

```text
┌─────────────────────────────────────────────┐
│ ←              PANEL TITLE           ↻ / ⋮ │
│                short subtitle              │
├─────────────────────────────────────────────┤
│ [ Device Context Selector, when required ] │
│                                             │
│              HERO STATUS                    │
│                                             │
│          CURRENT VIEW CONTENT               │
│                                             │
├─────────────────────────────────────────────┤
│ Tab 1      Tab 2      ...      Diagnostics │
└─────────────────────────────────────────────┘
```

The order does not vary between integrations.

## 2. App Header

Header uses a symmetric three-column grid:

```text
52px | minmax(0, 1fr) | 52px
```

On very narrow viewports the side columns may be reduced to 48px, but left and right must stay equal.

### Left zone

- icon only: `mdi:arrow-left`;
- no visible text `Назад`;
- touch target at least 44×44px;
- explicit navigation to the declared `parent_path`;
- never use browser history as the root navigation contract;
- hold/double-tap performs no device action.

### Center zone

First line: human-readable panel/subsystem title.

Second line:

```text
<type / model / context> · UI vX.Y.Z
```

Examples:

```text
Stark SolarPower
UPS · UI v0.3.3
```

```text
Полив
HO-SC-8W · UI v0.4.3
```

```text
S8 OMNI
Робот-пылесос · UI v0.5.3
```

```text
Keenetic Hero 4G+
Network Control Center · UI v0.3.0
```

Title is geometrically centered relative to the viewport. Do not add a decorative device/brand icon beside the Header title.

### Right zone

At most one primary global action:

- Refresh `mdi:refresh`, when a real public refresh API exists; or
- overflow `mdi:dots-vertical` when genuinely necessary.

Right-zone geometry mirrors the left zone.

## 3. Optional Device Context Selector

Use only when one integration panel manages several equal peer physical devices of the same type.

Example:

```text
[ ● UPS Интернет ] [ ● UPS Котёл ]
```

Rules:

- directly below Header;
- same device order on every root view;
- selected device changes only active state and content;
- selection persists across Bottom Tab Bar views;
- selected content only, not stacked full pages for every peer device;
- small semantic status dot is allowed:
  - green = normal;
  - yellow/orange = attention;
  - red = error/unavailable;
  - grey = unknown/no reliable data.

Do not use a Device Selector for irrigation zones, S8 robot+station, Ethernet/LTE channels of one router, or single-device panels.

## 4. Hero Status

The first content card answers:

> **What is happening with this system right now?**

Hero contains:

1. one large factual status;
2. one short explanatory line;
3. optionally one compact semantic badge.

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

Do not place a dense technical table in Hero.

## 5. Semantic color contract

Color is semantic, not decorative.

| Meaning | Visual tone |
| --- | --- |
| Normal / available / healthy | green |
| Information / selected / active | Home Assistant primary/accent |
| Attention / warning | orange |
| Error / unavailable | red |
| Unknown / no reliable data | grey |

Integration identity must not be expressed by arbitrary subsystem-specific colors that break this semantic contract.

## 6. Card geometry

Primary cards use shared geometry:

- radius: 20–24px;
- internal padding: 16–20px;
- vertical gap between cards: 12–16px;
- border: 1px `divider-color` or semantic equivalent;
- shadow: none or minimal.

Hierarchy must come from typography, spacing, state and grouping rather than heavy elevation.

## 7. Shared UI primitives

Every integration reuses the same conceptual primitives.

### StatusCard

```text
Title                         Normal
secondary description
```

### MetricCard

```text
Metric name
123 unit
```

Metric rules:

- label = secondary text;
- value = primary semibold/bold text;
- preserve unit when known;
- use localized decimal formatting where practical.

Correct:

```text
224,6 V
13 %
44 °C
```

Do not silently drop units.

### StateRow

```text
[icon]  Name                          Value >
```

### ActionCard

```text
[icon]  Action
        short explanation
```

### AlertCard

```text
! Problem title
  concise explanation
```

### Diagram

Use only when a diagram materially improves operational understanding.

## 8. Primary content width

Mobile:

```css
width: 100%;
```

with safe system side padding.

Desktop/tablet:

```css
max-width: 1200px; /* normally 1200–1280px */
margin-inline: auto;
```

Do not stretch operational content over an entire 1600–2000px viewport.

## 9. Bottom Tab Bar

Bottom Tab Bar is the only root-section navigation when the panel has 3–5 root views.

Required:

- fixed;
- edge-attached;
- full useful width;
- no floating outer side/bottom gaps;
- iOS Safe Area aware;
- enough page-bottom padding so the final card scrolls fully above it;
- icon + short label;
- touch target at least 44px;
- same height/geometry across integrations.

Active tab stays inside the shared bar:

- primary/accent icon;
- primary/accent label;
- light local active surface;
- optional soft local radius;
- no detached floating card or vertical lift.

Prefer 3–5 tabs. Maximum is 5 root tabs. Additional functions move to Service, Diagnostics or drill-down screens.

## 10. Canonical labels

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

`Диагн.` is allowed only when the full word physically does not fit the primary mobile viewport.

The first root tab is always `Обзор`.

When technical telemetry exists, the last root tab is `Диагностика` or `Диагн.`.

## 11. Root view versus drill-down

Root tab = operational state/workflow.

Child screen = detailed configuration or focused workflow.

Do not duplicate the full same settings form on Overview, root workflow tab and child settings page.

Example:

```text
S8 OMNI
├─ Обзор
├─ Уборка
│  └─ Настройки уборки
├─ Станция
├─ Сервис
└─ Диагностика
```

On a child screen, Header Back may return to the parent root view. Root Header Back still exits to the declared central parent panel.

## 12. Mobile-first and responsive behavior

Design and acceptance begin on iPhone Pro Max portrait.

Mandatory mobile behavior:

- one content column;
- no horizontal scroll;
- no clipped primary labels;
- one-handed navigation and common actions;
- Header stays compact;
- Bottom Tab Bar never covers final content;
- Safe Areas handled;
- light and dark themes remain readable.

Tablet/desktop may use two columns or specialized composition, but information hierarchy remains the same. Desktop is an adaptation, not a separate product design.

## 13. Home Assistant interaction contract

- factual entity-backed rows/cards: long press → native Home Assistant more-info where technically possible;
- Header, Device Selector and Bottom Tab Bar are navigation/context controls only;
- no raw Tuya DP writes from frontend;
- no direct RCI/SNMP write bypassing the owning integration API;
- no fake entities/actions;
- no unverified station/map/reset controls;
- `unknown` / `unavailable` are never rendered as normal/zero/OK.

For unreliable states use explicit language such as:

```text
Нет данных
Состояние неизвестно
Нет достоверной телеметрии
```

## 14. Loading shell

During initial loading the panel must still render the application shell:

```text
Header
↓
Skeleton / Loading state
↓
Bottom Tab Bar
```

A completely blank white screen during normal frontend bootstrap is not acceptable.

## 15. Production frontend contract

All panels also comply with `SPECIALIZED_PANEL_FRONTEND_RELEASE_STANDARD.md`:

> **Specialized Panel = self-contained production frontend bundle.**

`module_url` points to one autonomous production JavaScript bundle. Runtime chains through previous UI versions are prohibited. Shared reference code is copied/vendored into the integration source or bundled at build time; it is never loaded as a cross-repository runtime dependency.

## 16. Reference component model

Every panel logically uses:

```text
PanelShell
│
├── AppHeader
│   ├── BackButton
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

A developer does not redesign these primitives for each integration. They customize domain content only.

## 17. Integration-specific target structures

### Stark SolarPower

Preserve:

- UPS selector;
- strong Hero;
- useful `Сеть → UPS → Нагрузка` diagram.

Align:

- common symmetric Header;
- persistent Device Selector;
- full-width Bottom Tab Bar;
- common card geometry and active-tab treatment.

### HO-SC-8W

Preserve:

- irrigation status;
- zone list;
- cautious handling of unverified control semantics.

Align:

- icon-only Back;
- symmetric Header/right zone;
- common Bottom Tab Bar;
- common radii/spacing.

### S8 OMNI

Preserve:

- composite robot + station Hero;
- split Robot/Station semantics;
- large frequent actions;
- Cleaning settings drill-down.

Align:

- common Header geometry;
- common status badge treatment;
- common Bottom Tab Bar geometry.

### Keenetic Hero 4G+

Preserve:

- WAN diagram;
- Ethernet/LTE distinction;
- diagnostics.

Align:

- icon-only Back;
- symmetric Header;
- standard Hero hierarchy;
- common radii/spacing;
- common Bottom Tab Bar.

## 18. Acceptance checklist

A panel is template-compliant only when applicable conditions pass:

- Header is present on every root view;
- Back is icon-only and uses explicit declared parent route;
- title is viewport-centered;
- subtitle/UI version follows the shared pattern;
- right Header action uses matching geometry;
- optional Device Selector is persistent and ordered;
- Hero is the first real content state;
- semantic colors follow shared meaning;
- core cards use common radius/padding/gaps;
- metrics retain units;
- first root tab is Overview;
- root navigation uses full-width fixed Bottom Tab Bar;
- active tab remains inside the common bar;
- final content clears the Tab Bar;
- no root content duplicates a full child settings page;
- unknown/unavailable remains visibly unreliable;
- loading shows shell rather than a blank page;
- entity-backed content supports long-press more-info where practical;
- production frontend is one self-contained bundle.

## 19. Developer customization boundary

For a new panel the developer defines only:

1. title;
2. subtitle/model context;
3. optional peer-device selector;
4. Hero semantics;
5. root views and labels;
6. domain-specific content;
7. domain diagrams/actions;
8. declared parent route;
9. public integration entity/service mappings.

Header geometry, core tokens, semantic status colors, primitive geometry, Bottom Tab Bar, responsive rules and navigation behavior are shared template concerns and are not redesigned per integration.

## 20. Target user experience

When moving between:

```text
UPS → Полив → S8 OMNI → Keenetic → VLESS
```

the user should perceive one NikaS application ecosystem opening different subsystems, not unrelated frontend products.
