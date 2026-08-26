# NikaS Specialized Panel UI Standard v1.5

**Status:** REQUIRED  
**Canonical source:** `NikaSir/ha-contract-generated-ui`  
**Scope:** every NikaS integration-owned specialized Home Assistant panel  
**Reference:** Stark SolarPower / UPS on iPhone Pro Max portrait  

This organization-level copy mirrors the canonical standard. It supersedes prior Header/Back, zoom, scroll and Bottom Tab Bar rules.

## Shell

`Header → optional peer Device Selector → exactly one Work Viewport → Bottom Tab Bar`.

Only Work Viewport content scales. Header, selector, navigation and safe-area surfaces remain fixed at native scale. Nested zoom wrappers and permanent scale controls are prohibited.

## Header

- `52px / 1fr / 52px` symmetric grid (`48px / 1fr / 48px` on narrow phones).
- `62px` minimum, `60px` phone target plus the effective top safe area.
- Primary title: `21px / 800`; secondary/version: `12px / ~560` in secondary text color.
- Left: only `mdi:menu`, dispatching composed/bubbling `hass-toggle-menu`.
- Right: at most one panel-global action; refresh uses `mdi:refresh`.
- Both controls are matching plaques: `44×44px`, radius `16px`, one-pixel divider border, card background, subtle UPS-style shadow, `25px` `ha-icon`.
- Menu color is primary text; refresh color is theme primary. Transparent refresh is prohibited.
- Permanent Back, integration menu, device action and decorative brand icon are prohibited in the left rail.

## Scroll, zoom and pan

At exactly 100%: native vertical scroll, no horizontal scroll, no one-finger transform pan, `x=0`, `y=0`, immediate card/more-info interaction.

Above 100%: one-finger transform pan is allowed only on axes where scaled content overflows. Translation is clamped to factual content edges and may never expose empty field.

Pinch is two-finger focal zoom over `75–200%`. `97–103%` snaps to 100%/origin. Two-finger double tap resets and shows `Масштаб 100%`. Scale persists locally per panel/device. Resize, reflow, tab and peer changes re-clamp; tab change returns the work area to the top.

## Bottom Tab Bar

- Fixed, full-width, edge-attached, outside Work Viewport and safe-area aware.
- Card background, top divider and subtle upward shadow.
- Equal-width 3–5 destinations; minimum tab height `52px`, radius `13–14px`.
- MDI through `ha-icon`; canonical icon size `28px`.
- One-line labels: approximately `12px / 700`.
- Active icon/label use theme primary with approximately 11% primary background and no second shadow.

## Brand and repository identity

- Every integration repository ships a recognizable packaged `brand/icon.png`; it is the mandatory minimum HACS brand asset.
- Add `logo.png`, `dark_icon.png` and `dark_logo.png` when theme legibility requires them.
- README and installed integration use the same recognizable identity.
- Brand art belongs in repository/HACS/HA identity surfaces, not beside the centered Header title.

## Required audit

Each repository maintains an explicit compliance record covering Header geometry and colors, 100% native scrolling, enlarged axis bounds, tab/reset behavior, Bottom Tab Bar, safe areas, one-viewport topology, interaction guards, packaged brand assets and automated checks. Gaps are documented as gaps until runtime is corrected.

