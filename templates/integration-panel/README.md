# NikaS Integration Panel Template — reference implementation

This directory contains the shared **source reference** for integration-owned Home Assistant panels.

It is not a cross-repository runtime library.

## Mandatory rule

Each integration must ship its own **self-contained production frontend bundle**. The reference implementation may be copied, vendored or consumed at build time, but Home Assistant must never load it remotely as a shared runtime dependency.

Correct:

```text
.github reference source
        ↓ copy/vendor/build-time use
integration source
        ↓ build
custom_components/<domain>/frontend/<panel>.js
        ↓ module_url
Home Assistant
```

Incorrect:

```text
integration panel
      ↓ runtime import
https://.../.github/templates/integration-panel/panel-shell.js
```

## Included reference

`panel-shell.js` contains:

- `PanelShell` reference base class;
- symmetric `AppHeader`;
- optional `DeviceContextSelector`;
- `HeroStatus`;
- `StatusCard`;
- `MetricCard`;
- `StateRow`;
- `ActionCard`;
- `AlertCard`;
- full-width fixed `BottomTabBar`;
- mobile-first layout and iOS Safe Area tokens;
- semantic status tones.

The file intentionally does not implement device-specific Home Assistant service calls. The owning integration binds:

- explicit Back navigation;
- Refresh;
- device selection;
- root-tab switching;
- entity more-info;
- domain actions.

This prevents the template from inventing or bypassing an integration's public API.

## Typical integration use

A project may copy the reference into `src/ui/` and customize only domain-specific content:

```text
src/ui/
├── panel-shell.js        # copied/adapted from reference
├── overview.js
├── diagnostics.js
├── domain-actions.js
└── panel.js
```

Then bundle the project to a single production file:

```text
custom_components/<domain>/frontend/<domain>-panel.js
```

Recommended registration:

```python
PANEL_MODULE = f"/my_integration/frontend/my-integration-panel.js?v={DASHBOARD_VERSION}"
```

## Required integration configuration

Each specialized panel defines:

- `title`;
- `subtitle` including `UI vX.Y.Z`;
- `parent_path`;
- optional Refresh availability;
- optional peer-device selector;
- 3–5 root tabs;
- Hero status semantics;
- view content;
- public Home Assistant entity/service mappings.

Everything else should follow `NIKAS_INTEGRATION_PANEL_TEMPLATE.md` and `SPECIALIZED_PANEL_UI_STANDARD.md`.

## Release acceptance

Before production release verify:

- iPhone Pro Max portrait;
- local cold-cache load;
- Home Assistant Cloud / Nabu Casa cold-cache load;
- full Home Assistant restart;
- repeated panel open/close;
- parent-panel entry and explicit Back;
- fixed full-width Bottom Tab Bar;
- no blank loading screen;
- no `unknown` / `unavailable` normalization to OK/0;
- one autonomous production bundle;
- no historical frontend runtime imports.
