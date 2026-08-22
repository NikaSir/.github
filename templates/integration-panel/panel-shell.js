// NikaS Integration Panel Template v1.0 — reference implementation.
//
// IMPORTANT:
// - This file is SOURCE REFERENCE, not a shared runtime dependency.
// - Copy/vendor it into an integration or consume it at build time.
// - The integration's Home Assistant module_url must still point to one
//   self-contained production bundle.

export const NIKAS_PANEL_TEMPLATE_VERSION = "1.0";

export const NIKAS_PANEL_TOKENS = Object.freeze({
  headerSide: 52,
  headerSideNarrow: 48,
  touchTarget: 44,
  cardRadius: 22,
  cardPadding: 18,
  cardGap: 14,
  desktopMaxWidth: 1240,
  tabMinHeight: 58,
});

export const NIKAS_STATUS_TONES = Object.freeze({
  normal: "normal",
  active: "active",
  warning: "warning",
  error: "error",
  unknown: "unknown",
});

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderAppHeader({
  title,
  subtitle,
  backLabel = "Назад",
  rightAction = null,
}) {
  return `
    <header class="nika-app-header">
      <button class="nika-header-button" type="button" data-shell-action="back" aria-label="${escapeHtml(backLabel)}">
        <ha-icon icon="mdi:arrow-left"></ha-icon>
      </button>
      <div class="nika-app-title">
        <strong>${escapeHtml(title)}</strong>
        ${subtitle ? `<span>${escapeHtml(subtitle)}</span>` : ""}
      </div>
      ${rightAction ? `
        <button class="nika-header-button" type="button" data-shell-action="${escapeHtml(rightAction.action)}" aria-label="${escapeHtml(rightAction.label)}">
          <ha-icon icon="${escapeHtml(rightAction.icon)}"></ha-icon>
        </button>` : `<span class="nika-header-spacer" aria-hidden="true"></span>`}
    </header>`;
}

export function renderDeviceSelector({ devices, selectedId }) {
  if (!Array.isArray(devices) || devices.length < 2) return "";
  return `
    <section class="nika-device-selector" aria-label="Выбор устройства">
      ${devices.map((device) => `
        <button type="button" data-device-id="${escapeHtml(device.id)}" class="nika-device-chip ${device.id === selectedId ? "active" : ""}">
          <span class="nika-status-dot ${escapeHtml(device.tone || "unknown")}"></span>
          <span>${escapeHtml(device.label)}</span>
        </button>`).join("")}
    </section>`;
}

export function renderHeroStatus({ status, detail, tone = "unknown", badge = null }) {
  return `
    <section class="nika-card nika-hero ${escapeHtml(tone)}">
      <div class="nika-hero-copy">
        <span class="nika-eyebrow">СОСТОЯНИЕ</span>
        <h1>${escapeHtml(status)}</h1>
        ${detail ? `<p>${escapeHtml(detail)}</p>` : ""}
      </div>
      ${badge ? `<span class="nika-badge ${escapeHtml(badge.tone || tone)}">${escapeHtml(badge.label)}</span>` : ""}
    </section>`;
}

export function renderStatusCard({ title, value, detail = "", icon = null, tone = "unknown", moreKey = null }) {
  return `
    <section class="nika-card nika-status-card ${escapeHtml(tone)}" ${moreKey ? `data-more="${escapeHtml(moreKey)}"` : ""}>
      ${icon ? `<div class="nika-icon-box"><ha-icon icon="${escapeHtml(icon)}"></ha-icon></div>` : ""}
      <div class="nika-card-copy">
        <span>${escapeHtml(title)}</span>
        <strong>${escapeHtml(value)}</strong>
        ${detail ? `<small>${escapeHtml(detail)}</small>` : ""}
      </div>
    </section>`;
}

export function renderMetricCard({ label, value, unit = "", icon = null, moreKey = null }) {
  const formatted = value === null || value === undefined || value === "" ? "—" : `${value}${unit ? ` ${unit}` : ""}`;
  return `
    <section class="nika-card nika-metric-card" ${moreKey ? `data-more="${escapeHtml(moreKey)}"` : ""}>
      ${icon ? `<ha-icon icon="${escapeHtml(icon)}"></ha-icon>` : ""}
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(formatted)}</strong>
    </section>`;
}

export function renderStateRow({ label, value, icon = null, moreKey = null, chevron = false }) {
  return `
    <div class="nika-state-row" ${moreKey ? `data-more="${escapeHtml(moreKey)}"` : ""}>
      ${icon ? `<ha-icon icon="${escapeHtml(icon)}"></ha-icon>` : ""}
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      ${chevron ? `<ha-icon icon="mdi:chevron-right"></ha-icon>` : ""}
    </div>`;
}

export function renderActionCard({ action, title, detail = "", icon, disabled = false }) {
  return `
    <button class="nika-action-card" type="button" data-domain-action="${escapeHtml(action)}" ${disabled ? "disabled" : ""}>
      <span class="nika-icon-box"><ha-icon icon="${escapeHtml(icon)}"></ha-icon></span>
      <span class="nika-action-copy">
        <strong>${escapeHtml(title)}</strong>
        ${detail ? `<small>${escapeHtml(detail)}</small>` : ""}
      </span>
    </button>`;
}

export function renderAlertCard({ title, detail, tone = "warning", icon = "mdi:alert-circle-outline" }) {
  return `
    <section class="nika-alert ${escapeHtml(tone)}">
      <ha-icon icon="${escapeHtml(icon)}"></ha-icon>
      <div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></div>
    </section>`;
}

export function renderBottomTabBar({ tabs, active }) {
  return `
    <nav class="nika-bottom-tabs" aria-label="Разделы панели">
      ${tabs.map((tab) => `
        <button type="button" data-view="${escapeHtml(tab.id)}" class="${tab.id === active ? "active" : ""}" ${tab.id === active ? 'aria-current="page"' : ""}>
          <ha-icon icon="${escapeHtml(tab.icon)}"></ha-icon>
          <span>${escapeHtml(tab.label)}</span>
        </button>`).join("")}
    </nav>`;
}

export const NIKAS_PANEL_SHELL_STYLES = `
  :host {
    --nika-card-radius: 22px;
    --nika-card-padding: 18px;
    --nika-gap: 14px;
    display: block;
    min-height: 100vh;
    color: var(--primary-text-color);
    background: var(--primary-background-color);
  }

  * { box-sizing: border-box; }

  .nika-shell {
    min-height: 100vh;
    padding-bottom: calc(84px + env(safe-area-inset-bottom));
  }

  .nika-app-header {
    position: sticky;
    top: 0;
    z-index: 60;
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr) 52px;
    align-items: center;
    min-height: calc(72px + env(safe-area-inset-top));
    padding: env(safe-area-inset-top) 14px 8px;
    border-bottom: 1px solid var(--divider-color);
    background: color-mix(in srgb, var(--primary-background-color) 94%, transparent);
    backdrop-filter: blur(18px) saturate(135%);
    -webkit-backdrop-filter: blur(18px) saturate(135%);
  }

  .nika-header-button,
  .nika-header-spacer {
    width: 52px;
    height: 52px;
  }

  .nika-header-button {
    display: grid;
    place-items: center;
    border: 0;
    border-radius: 16px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--ha-card-box-shadow, 0 3px 14px rgba(0,0,0,.08));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .nika-header-button ha-icon { --mdc-icon-size: 28px; }

  .nika-app-title {
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .nika-app-title strong {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 20px;
    line-height: 1.05;
  }

  .nika-app-title span {
    margin-top: 3px;
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 600;
  }

  .nika-content {
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 14px max(14px, env(safe-area-inset-right)) 22px max(14px, env(safe-area-inset-left));
    display: flex;
    flex-direction: column;
    gap: var(--nika-gap);
  }

  .nika-card {
    border: 1px solid var(--divider-color);
    border-radius: var(--nika-card-radius);
    padding: var(--nika-card-padding);
    background: var(--card-background-color);
  }

  .nika-eyebrow {
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .14em;
  }

  .nika-hero {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-start;
  }

  .nika-hero h1 {
    margin: 8px 0 4px;
    font-size: clamp(30px, 8vw, 46px);
    line-height: .98;
  }

  .nika-hero p {
    margin: 10px 0 0;
    color: var(--secondary-text-color);
    font-size: 16px;
  }

  .nika-badge {
    flex: 0 0 auto;
    border-radius: 999px;
    padding: 8px 12px;
    font-weight: 700;
    background: var(--secondary-background-color);
  }

  .nika-badge.normal,
  .nika-status-dot.normal { color: var(--success-color, #2e9e45); }
  .nika-badge.warning,
  .nika-status-dot.warning { color: var(--warning-color, #d98200); }
  .nika-badge.error,
  .nika-status-dot.error { color: var(--error-color); }
  .nika-badge.active,
  .nika-status-dot.active { color: var(--primary-color); }
  .nika-badge.unknown,
  .nika-status-dot.unknown { color: var(--secondary-text-color); }

  .nika-device-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 8px;
  }

  .nika-device-chip {
    min-height: 44px;
    border: 1px solid var(--divider-color);
    border-radius: 14px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font: inherit;
    font-weight: 700;
  }

  .nika-device-chip.active {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 9%, var(--card-background-color));
    color: var(--primary-color);
  }

  .nika-status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 7px;
    border-radius: 50%;
    background: currentColor;
  }

  .nika-status-card,
  .nika-metric-card {
    min-width: 0;
  }

  .nika-status-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 12px;
  }

  .nika-icon-box {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    background: var(--secondary-background-color);
    color: var(--primary-color);
  }

  .nika-card-copy,
  .nika-action-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .nika-card-copy span,
  .nika-card-copy small,
  .nika-action-copy small,
  .nika-metric-card span {
    color: var(--secondary-text-color);
  }

  .nika-card-copy strong { font-size: 18px; }

  .nika-metric-card {
    display: grid;
    grid-template-columns: auto minmax(0,1fr);
    gap: 5px 10px;
    align-items: center;
  }

  .nika-metric-card ha-icon {
    grid-row: 1 / span 2;
    color: var(--primary-color);
  }

  .nika-metric-card strong { font-size: 22px; }

  .nika-state-row {
    min-height: 58px;
    display: grid;
    grid-template-columns: auto minmax(0,1fr) auto auto;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--divider-color);
  }

  .nika-state-row:last-child { border-bottom: 0; }

  .nika-action-card {
    min-height: 68px;
    border: 1px solid var(--divider-color);
    border-radius: 18px;
    padding: 10px 12px;
    display: grid;
    grid-template-columns: auto minmax(0,1fr);
    align-items: center;
    gap: 12px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    text-align: left;
    font: inherit;
  }

  .nika-alert {
    display: grid;
    grid-template-columns: auto minmax(0,1fr);
    gap: 10px;
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
  }

  .nika-alert div { display: flex; flex-direction: column; gap: 2px; }
  .nika-alert span { color: var(--secondary-text-color); }
  .nika-alert.warning ha-icon { color: var(--warning-color, #d98200); }
  .nika-alert.error ha-icon { color: var(--error-color); }
  .nika-alert.unknown ha-icon { color: var(--secondary-text-color); }

  .nika-bottom-tabs {
    position: fixed;
    z-index: 70;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    padding: 7px max(7px, env(safe-area-inset-right)) calc(7px + env(safe-area-inset-bottom)) max(7px, env(safe-area-inset-left));
    border-top: 1px solid var(--divider-color);
    background: color-mix(in srgb, var(--card-background-color) 97%, transparent);
    backdrop-filter: blur(18px) saturate(135%);
    -webkit-backdrop-filter: blur(18px) saturate(135%);
  }

  .nika-bottom-tabs button {
    min-height: 58px;
    border: 0;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background: transparent;
    color: var(--secondary-text-color);
    font: inherit;
    font-size: 12px;
  }

  .nika-bottom-tabs button.active {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    color: var(--primary-color);
  }

  .nika-bottom-tabs ha-icon { --mdc-icon-size: 25px; }

  @media (max-width: 360px) {
    .nika-app-header { grid-template-columns: 48px minmax(0,1fr) 48px; }
    .nika-header-button,
    .nika-header-spacer { width: 48px; height: 48px; }
  }

  @media (min-width: 760px) {
    .nika-content { padding-inline: 24px; }
  }
`;

// Optional base class. Integration-specific panels may extend it, or they may use
// the renderer helpers independently. Navigation and domain actions are explicit
// hooks so this shared reference never invents Home Assistant service semantics.
export class NikaSIntegrationPanelShell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.activeView = "overview";
  }

  get shellConfig() {
    throw new Error("shellConfig must be implemented by the integration panel");
  }

  renderView(_view) {
    return renderAlertCard({
      title: "View not implemented",
      detail: "Integration panel must implement renderView(view).",
      tone: "unknown",
    });
  }

  onBack() {}
  onRefresh() {}
  onViewChange(_view) {}
  onDeviceChange(_deviceId) {}

  renderShell({ deviceSelector = "", content = "" } = {}) {
    const config = this.shellConfig;
    const rightAction = config.refresh
      ? { action: "refresh", icon: "mdi:refresh", label: "Обновить" }
      : config.menu
        ? { action: "menu", icon: "mdi:dots-vertical", label: "Меню" }
        : null;

    this.shadowRoot.innerHTML = `
      <style>${NIKAS_PANEL_SHELL_STYLES}</style>
      <div class="nika-shell">
        ${renderAppHeader({ title: config.title, subtitle: config.subtitle, rightAction })}
        <main class="nika-content">
          ${deviceSelector}
          ${content || this.renderView(this.activeView)}
        </main>
        ${renderBottomTabBar({ tabs: config.tabs, active: this.activeView })}
      </div>`;

    this.bindShellEvents();
  }

  bindShellEvents() {
    this.shadowRoot.querySelector('[data-shell-action="back"]')?.addEventListener("click", () => this.onBack());
    this.shadowRoot.querySelector('[data-shell-action="refresh"]')?.addEventListener("click", () => this.onRefresh());

    this.shadowRoot.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => {
        const view = button.dataset.view;
        if (!view || view === this.activeView) return;
        this.activeView = view;
        this.onViewChange(view);
      });
    });

    this.shadowRoot.querySelectorAll("[data-device-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const deviceId = button.dataset.deviceId;
        if (deviceId) this.onDeviceChange(deviceId);
      });
    });
  }
}
