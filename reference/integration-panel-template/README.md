# NikaS Integration Panel Reference Implementation

This directory is a **development-time reference**, not a shared runtime library.

The canonical contract is `NIKAS_INTEGRATION_PANEL_TEMPLATE.md`.

## How to use it

1. Copy/vendor `panel-shell.js` into the integration frontend source tree.
2. Rename the custom element and configure title, subtitle/model, `parentPath` and tabs.
3. Replace `renderOverview()` and other view methods with domain-specific content.
4. Keep the common Header, BottomTabBar, semantic-state and primitive geometry unless the project standard itself changes.
5. Bundle all integration frontend source into the integration's own autonomous production artifact.

Production must never import this file from `NikaSir/.github` or another repository at runtime.

Correct architecture:

```text
NikaS reference implementation
        ↓ copy/vendor at development time
integration frontend source
        ↓ build/bundle
integration-panel.js
        ↓ module_url
Home Assistant
```

Incorrect architecture:

```text
integration-panel.js
        ↓ runtime import
NikaSir/.github/reference/.../panel-shell.js
```

Each integration remains independently deployable and compliant with `SPECIALIZED_PANEL_FRONTEND_RELEASE_STANDARD.md`.

## Provided primitives

The reference contains:

- `PanelShell` lifecycle and Home Assistant panel setters;
- symmetric icon-only `AppHeader`;
- explicit parent navigation;
- optional `DeviceContextSelector` helper;
- `HeroStatus` helper;
- `StatusCard`, `MetricCard`, `StateRow`, `ActionCard`, `AlertCard` helpers;
- fixed full-width iOS-safe `BottomTabBar`;
- shell-preserving Loading state;
- standard more-info dispatch helper;
- semantic color tokens and baseline responsive CSS.

It intentionally contains no device protocol code, entity lookup assumptions or write actions.
