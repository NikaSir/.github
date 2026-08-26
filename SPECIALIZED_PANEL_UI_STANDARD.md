# Home Assistant NikaS — Integration Dashboard UI Standard v1.2

> **SUPERSEDED:** use `NIKAS_SPECIALIZED_PANEL_UI_STANDARD.md` v1.6. Any explicit Back, old zoom/pan, Header, Bottom Tab Bar or brand rule below is historical.

Status: **mandatory project-wide UI contract**  
Revision: **2026-08-22**  
Primary acceptance viewport: **iPhone Pro Max · portrait · one-handed operation**

Specialized integration-owned panels are mobile applications inside Home Assistant, not ordinary Lovelace dashboards. Domain content stays device-specific, but application shell and navigation behavior are shared.

## 1. Application model

### Single-device application

```text
Header → Content → Bottom Tab Bar
```

### Multi-device application

```text
Header → Device Selector → Content of selected device → Bottom Tab Bar
```

The levels have fixed meanings:

- **Header Back** — where to exit the specialized application.
- **Device Selector** — which peer physical device is selected.
- **Bottom Tab Bar** — which main section/aspect of the selected device is open.

These navigation levels must never be conflated.

## 2. Header

Every main screen uses the same compact Header.

Canonical form:

```text
[← Назад]        Panel title        [Refresh / ⋮]
                  short subtitle
```

### 2.1 Back

- left side;
- icon `mdi:arrow-left`;
- approximately 44×44 pt touch target or larger;
- explicit Home Assistant navigation to declared `parent_path`;
- browser history is not the canonical application navigation contract;
- hold/double-tap never perform device actions.

### 2.2 Title

- title is geometrically centered relative to the **viewport**, not simply the free space between left/right controls;
- on the primary iPhone viewport it should fit on one line;
- short subtitle may show model/context/UI version;
- version is secondary metadata;
- do not repeat another large device/panel title immediately below the Header.

### 2.3 Header icon policy

Do **not** place a decorative integration/device/brand icon beside the Header title.

It shifts the visual center and competes with Back. Such icons remain valid in sidebar entries, launcher cards, status cards and navigation metadata, but not in the standard Header title area.

### 2.4 Right Header zone

- normally one global action such as Refresh;
- optional overflow `⋮` only when genuinely needed;
- left/right control zones should use comparable geometry to preserve visual balance and viewport-centered title alignment.

## 3. Canonical parent routes

| Specialized panel | parent_path |
| --- | --- |
| HO-SC-8W / Полив | `/dashboard-actions` |
| S8 OMNI | `/dashboard-actions` |
| Keenetic Hero 4G+ | `/dashboard-infrastructure/overview` |
| Stark SolarPower / UPS | `/dashboard-infrastructure/overview` |

Back always exits to the declared parent route regardless of whether the panel was opened from sidebar, a central dashboard, notification or deep link.

## 4. Bottom Tab Bar

When an application has 3–5 main sections, they are switched only through a **full-width fixed Bottom Tab Bar**.

Required:

- fixed to the lower viewport edge;
- occupies the full useful width of the mobile viewport;
- no external side/bottom gaps as in a floating/pill card;
- remains available during vertical scrolling;
- includes iOS bottom Safe Area;
- active tab is highlighted inside the shared bar;
- icon + short label;
- enough page-bottom clearance for the final content card to scroll completely above the bar;
- consistent height and touch-target geometry across specialized panels.

A floating Tab Bar with visible outer gaps is non-compliant.

### 4.1 Active tab

Preferred treatment:

- accent icon;
- accent text;
- light local active background;
- optional soft corner radius inside the common bar;
- no detached elevation/shadow;
- no vertical lift that visually removes the active tab from the bar.

### 4.2 Canonical tab sets

| Application | Bottom Tab Bar |
| --- | --- |
| HO-SC-8W | `Обзор · Зоны · Программы · Диагн.` |
| S8 OMNI | `Обзор · Уборка · Станция · Сервис · Диагн.` |
| Stark SolarPower | `Обзор · Диагностика · История` |
| Keenetic Hero 4G+ | `Обзор · WAN/LTE · Трафик · Диагн.` |

Keenetic may add `Failover` as a fifth tab only when it becomes an independent full workflow:

```text
Обзор · WAN/LTE · Failover · Трафик · Диагн.
```

Prefer 3–5 tabs. Additional functions belong inside Service, Diagnostics or drill-down screens rather than shrinking tab touch targets.

## 5. Multi-device context — Device Selector

When one integration-owned application manages multiple equal peer physical devices of the same type, device selection becomes a persistent UI level directly below the Header.

```text
HEADER
↓
DEVICE SELECTOR
↓
CONTENT OF SELECTED DEVICE
↓
BOTTOM TAB BAR
```

Required behavior:

- visible directly below Header on every main section;
- fixed device order that does not change when selection changes;
- selected device indicated only through active state;
- small status dot/badge for other devices is allowed;
- selected device persists across Bottom Tab Bar section changes;
- selector does not appear on one section and disappear on another;
- all primary content below the selector belongs only to the selected device;
- do not stack full cards/history views for every peer device on the same main screen.

### 5.1 Device Selector is not appropriate for

- irrigation zones of one HO-SC-8W controller;
- S8 OMNI robot + station when they form one system;
- Ethernet + LTE channels of one Keenetic router;
- any application with only one physical device.

## 6. Stark SolarPower — multi-device reference

Stark SolarPower is the reference implementation of persistent device context.

Canonical structure:

```text
[←]          Stark SolarPower          [Refresh]
                 UPS · UI vX.X.X
[ UPS Интернет ] [ UPS Котёл ]
----------------------------------------
CONTENT OF SELECTED UPS
----------------------------------------
Обзор | Диагностика | История
```

Rules:

- `UPS Интернет` / `UPS Котёл` always remain in the same order;
- selection persists across Overview / Diagnostics / History;
- selector may show compact green/yellow/red status dots for both UPS devices;
- Overview renders one full card for the selected UPS;
- Diagnostics renders only selected UPS data;
- History renders only selected UPS graphs/events;
- do not duplicate the second full UPS block below.

## 7. Screen hierarchy

### Single-device

```text
HEADER
↓
PRIMARY STATUS
↓
FREQUENT ACTIONS / KEY TELEMETRY
↓
DOMAIN CONTENT
↓
BOTTOM TAB BAR
```

### Multi-device

```text
HEADER
↓
DEVICE SELECTOR
↓
PRIMARY STATUS OF SELECTED DEVICE
↓
FREQUENT ACTIONS / KEY TELEMETRY
↓
DOMAIN CONTENT OF SELECTED DEVICE
↓
BOTTOM TAB BAR
```

Within a few seconds, the user should understand what is happening and whether the current system/device is normal.

## 8. Mobile-first acceptance

Primary acceptance viewport: **iPhone Pro Max, portrait**.

Required:

- no horizontal scrolling;
- no clipped primary labels;
- common actions and navigation reachable one-handed;
- compact Header;
- Device Selector must not unnecessarily push primary status below the first useful viewport;
- Bottom Tab Bar must not cover content;
- sufficient bottom clearance for the last card;
- iOS Safe Areas handled;
- readable light and dark themes;
- iPad/desktop are adaptations of the accepted mobile hierarchy, not the original design target.

## 9. Entity behavior and safety

- no raw Tuya DP writes from frontend/Lovelace;
- no direct RCI/SNMP write workaround bypassing the owning integration API;
- no fake entity IDs or unverified commands;
- `unknown` / `unavailable` are never normal states;
- control is exposed only through stable public APIs of the owning integration;
- long press on factual entity-backed UI should open standard Home Assistant more-info where applicable;
- Header, Device Selector and Bottom Tab Bar never perform unrelated domain actions.

## 10. Conceptual navigation metadata

Single-device example:

```yaml
panel:
  id: irrigation
  title: Полив
  path: /dashboard-irrigation
  icon: mdi:sprinkler
  owner: ha-ho-sc-8w
  expose_in_generated_ui: true
  preferred_view: overview
  header:
    title_alignment: viewport_center
    show_brand_icon: false
    back:
      icon: mdi:arrow-left
      parent_path: /dashboard-actions
  navigation:
    primary: full_width_fixed_bottom_tab_bar
    floating: false
```

Multi-device applications add:

```yaml
device_context:
  selector: persistent_below_header
  preserve_across_views: true
  reorder_selected: false
  content_scope: selected_device_only
```

## 11. Panel-specific requirements

### 11.1 Stark SolarPower / UPS

- remove decorative battery/brand icon from Header;
- geometrically center `Stark SolarPower`;
- secondary centered subtitle `UPS · UI v…`;
- Back left, Refresh right;
- persistent `UPS Интернет / UPS Котёл` Device Selector on all three sections;
- preserve selection across tabs;
- Overview / Diagnostics / History render selected UPS only;
- Bottom Tab Bar: `Обзор · Диагностика · История`.

### 11.2 S8 OMNI

- explicit Back replaces hamburger/Menu as the primary exit;
- geometrically center `S8 OMNI`;
- no decorative robot/integration icon beside Header title;
- full-width Bottom Tab Bar: `Обзор · Уборка · Станция · Сервис · Диагн.`;
- composite robot + station state remains hero information;
- no Device Selector while one S8 OMNI system is managed.

### 11.3 HO-SC-8W / Полив

- explicit Back;
- geometrically centered `Полив`;
- model/UI version in secondary subtitle;
- no decorative water/sprinkler icon in Header title area;
- water/sprinkler icon remains valid inside status/navigation content;
- Bottom Tab Bar: `Обзор · Зоны · Программы · Диагн.`;
- irrigation zones are channels, not peer devices, therefore no Device Selector.

### 11.4 Keenetic Hero 4G+

- build directly against this standard;
- Back left, centered title, optional Refresh/overflow right;
- no router icon beside Header title;
- full-width fixed Bottom Tab Bar;
- first screen prioritizes Internet / active WAN / Ethernet / LTE / recent failover;
- Ethernet/LTE are channels, not peer devices, therefore no Device Selector.

## 12. Acceptance checklist

A specialized panel is compliant only when all applicable conditions are met:

- Header present on every main screen;
- explicit Back targets declared parent route;
- title geometrically centered on iPhone Pro Max portrait;
- no decorative brand/device icon shifts Header title;
- right global action does not disturb centering;
- no duplicate large title immediately below Header;
- 3–5 main sections use full-width fixed Bottom Tab Bar;
- Tab Bar is docked, not floating;
- active tab is unambiguous and remains inside the common bar;
- final content scrolls fully above the Tab Bar;
- when multiple peer devices exist, Device Selector is persistent on all sections;
- device selection persists between sections;
- device order is stable;
- primary content is scoped to selected device only;
- `unknown` / `unavailable` remain visibly unreliable;
- navigation elements cannot accidentally execute unrelated device actions.

## 13. Project rule

Integration-owned dashboards are mobile applications inside Home Assistant: explicit Back at the top, viewport-centered title without a decorative Header icon, persistent Device Selector only when multiple peer physical devices require context, selected-device-only content, and a full-width fixed Bottom Tab Bar for internal navigation.
