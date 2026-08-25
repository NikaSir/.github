/*
 * NikaS Integration Panel Template v1.1 — reference implementation.
 *
 * DEVELOPMENT-TIME REFERENCE ONLY.
 * Copy/vendor into an integration source tree and bundle into that integration's
 * own self-contained production frontend. Do not import this file at runtime
 * from another repository.
 */

export class NikaSPanelShell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._panel = null;
    this._view = this.defaultView();
    this._selectedDevice = null;
  }

  set hass(value) {
    this._hass = value;
    this.render();
  }

  set panel(value) {
    this._panel = value;
    this.render();
  }

  set narrow(value) {
    this.toggleAttribute("narrow", Boolean(value));
  }

  connectedCallback() {
    this.render();
  }

  // ----- Integration-specific configuration ---------------------------------

  panelTitle() {
    return "Panel";
  }

  panelSubtitle() {
    return "Model · UI v0.0.0";
  }

  parentPath() {
    return this._panel?.config?.parent_path || "/";
  }

  tabs() {
    return [
      ["overview", "mdi:home-outline", "Обзор"],
      ["diagnostics", "mdi:stethoscope", "Диагностика"],
    ];
  }

  defaultView() {
    return "overview";
  }

  headerAction() {
    // Return null or an object such as:
    // { icon: "mdi:refresh", label: "Обновить", action: () => this.refresh() }
    return null;
  }

  devices() {
    // Optional multi-device selector:
    // [{ id: "ups1", label: "UPS Интернет", state: "normal" }]
    return [];
  }

  renderOverview() {
    return this.heroStatus({
      state: "unknown",
      title: "Состояние неизвестно",
      subtitle: "Интеграция должна переопределить renderOverview()",
    });
  }

  renderView(view) {
    if (view === "overview") return this.renderOverview();
    return `<section class="contentCard"><h2>${this.escape(view)}</h2></section>`;
  }

  // ----- Shared shell behavior ----------------------------------------------

  explicitNavigate(path) {
    const from = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.history.pushState({ from }, "", path);
    window.dispatchEvent(
      new CustomEvent("location-changed", {
        bubbles: true,
        composed: true,
        detail: { replace: false },
      }),
    );
  }

  toggleHomeAssistantMenu() {
    this.dispatchEvent(
      new CustomEvent("hass-toggle-menu", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  moreInfo(entityId) {
    if (!entityId || !this._hass?.states?.[entityId]) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  escape(value) {
    return String(value ?? "—").replace(
      /[&<>\"]/g,
      (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char],
    );
  }

  semanticState(state) {
    const allowed = new Set(["normal", "info", "warning", "error", "unknown"]);
    return allowed.has(state) ? state : "unknown";
  }

  appHeader() {
    const action = this.headerAction();
    return `
      <header class="appHeader">
        <button class="headerSlot headerMenu" data-ha-menu aria-label="Открыть меню Home Assistant">
          <ha-icon icon="mdi:menu"></ha-icon>
        </button>
        <div class="headerTitle">
          <strong>${this.escape(this.panelTitle())}</strong>
          <small>${this.escape(this.panelSubtitle())}</small>
        </div>
        ${action ? `
          <button class="headerSlot headerAction" data-header-action aria-label="${this.escape(action.label || "Действие")}">
            <ha-icon icon="${this.escape(action.icon || "mdi:dots-vertical")}"></ha-icon>
          </button>
        ` : `<div class="headerSlot headerPlaceholder" aria-hidden="true"></div>`}
      </header>
    `;
  }

  deviceContextSelector() {
    const devices = this.devices();
    if (!devices.length) return "";
    if (!this._selectedDevice) this._selectedDevice = devices[0].id;
    return `
      <div class="deviceSelector" role="group" aria-label="Выбор устройства">
        ${devices.map((device) => `
          <button class="deviceChoice ${device.id === this._selectedDevice ? "active" : ""}" data-device="${this.escape(device.id)}">
            <span class="statusDot ${this.semanticState(device.state)}"></span>
            <span>${this.escape(device.label)}</span>
          </button>
        `).join("")}
      </div>
    `;
  }

  bottomTabBar() {
    const tabs = this.tabs().slice(0, 5);
    return `
      <nav class="bottomTabBar" aria-label="Разделы панели">
        <div class="bottomTabBarInner">
          ${tabs.map(([view, icon, label]) => `
            <button class="tabButton ${view === this._view ? "active" : ""}" data-view="${this.escape(view)}" aria-current="${view === this._view ? "page" : "false"}">
              <ha-icon icon="${this.escape(icon)}"></ha-icon>
              <span>${this.escape(label)}</span>
            </button>
          `).join("")}
        </div>
      </nav>
    `;
  }

  loadingView() {
    return `
      <section class="loadingCard" aria-live="polite">
        <div class="skeleton wide"></div>
        <div class="skeleton medium"></div>
        <div class="skeleton short"></div>
      </section>
    `;
  }

  // ----- Shared content primitives ------------------------------------------

  heroStatus({ state = "unknown", icon = "mdi:help-circle-outline", title, subtitle, badge = "" }) {
    const semantic = this.semanticState(state);
    return `
      <section class="heroStatus ${semantic}">
        <div class="heroIcon"><ha-icon icon="${this.escape(icon)}"></ha-icon></div>
        <div class="heroText">
          <h1>${this.escape(title)}</h1>
          <p>${this.escape(subtitle)}</p>
        </div>
        ${badge ? `<span class="heroBadge">${this.escape(badge)}</span>` : ""}
      </section>
    `;
  }

  statusCard({ title, value, subtitle = "", state = "info", entityId = "" }) {
    return `
      <button class="statusCard semantic-${this.semanticState(state)}" ${entityId ? `data-entity="${this.escape(entityId)}"` : ""}>
        <div><strong>${this.escape(title)}</strong>${subtitle ? `<small>${this.escape(subtitle)}</small>` : ""}</div>
        <b>${this.escape(value)}</b>
      </button>
    `;
  }

  metricCard({ label, value, unit = "", entityId = "" }) {
    return `
      <button class="metricCard" ${entityId ? `data-entity="${this.escape(entityId)}"` : ""}>
        <small>${this.escape(label)}</small>
        <strong>${this.escape(value)}${unit ? ` <span>${this.escape(unit)}</span>` : ""}</strong>
      </button>
    `;
  }

  stateRow({ icon, label, value, entityId = "" }) {
    return `
      <button class="stateRow" ${entityId ? `data-entity="${this.escape(entityId)}"` : ""}>
        <ha-icon icon="${this.escape(icon)}"></ha-icon>
        <span>${this.escape(label)}</span>
        <b>${this.escape(value)}</b>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
      </button>
    `;
  }

  actionCard({ icon, title, subtitle = "", actionId = "" }) {
    return `
      <button class="actionCard" ${actionId ? `data-action="${this.escape(actionId)}"` : ""}>
        <ha-icon icon="${this.escape(icon)}"></ha-icon>
        <span><b>${this.escape(title)}</b>${subtitle ? `<small>${this.escape(subtitle)}</small>` : ""}</span>
      </button>
    `;
  }

  alertCard({ state = "warning", title, subtitle }) {
    return `
      <section class="alertCard ${this.semanticState(state)}">
        <ha-icon icon="${state === "error" ? "mdi:alert-circle-outline" : "mdi:alert-outline"}"></ha-icon>
        <div><b>${this.escape(title)}</b><p>${this.escape(subtitle)}</p></div>
      </section>
    `;
  }

  // ----- Binding ------------------------------------------------------------

  bindShellActions() {
    this.shadowRoot.querySelector("[data-ha-menu]")?.addEventListener("click", () => this.toggleHomeAssistantMenu());

    const action = this.headerAction();
    if (action?.action) {
      this.shadowRoot.querySelector("[data-header-action]")?.addEventListener("click", () => action.action());
    }

    this.shadowRoot.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => {
        this._view = button.dataset.view || this.defaultView();
        this.render();
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    });

    this.shadowRoot.querySelectorAll("[data-device]").forEach((button) => {
      button.addEventListener("click", () => {
        this._selectedDevice = button.dataset.device;
        this.render();
      });
    });

    this.shadowRoot.querySelectorAll("[data-entity]").forEach((button) => {
      const entityId = button.dataset.entity;
      let timer = null;
      let held = false;
      const cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
      };
      button.addEventListener("pointerdown", () => {
        held = false;
        timer = setTimeout(() => {
          held = true;
          this.moreInfo(entityId);
        }, 550);
      });
      button.addEventListener("pointerup", cancel);
      button.addEventListener("pointercancel", cancel);
      button.addEventListener("pointerleave", cancel);
      button.addEventListener("click", (event) => {
        if (held) {
          event.preventDefault();
          held = false;
        }
      });
    });
  }

  render() {
    if (!this.shadowRoot) return;
    const body = this._hass ? this.renderView(this._view) : this.loadingView();
    this.shadowRoot.innerHTML = `
      <style>${this.styles()}</style>
      <div class="panelShell">
        ${this.appHeader()}
        <main class="panelContent zoomViewport" data-zoom-viewport>
          ${this.deviceContextSelector()}
          ${body}
        </main>
      </div>
      ${this.bottomTabBar()}
    `;
    this.bindShellActions();
  }

  styles() {
    return `
      :host{
        --nikas-primary:var(--primary-color,#039ac8);
        --nikas-bg:var(--primary-background-color,#f7f8fa);
        --nikas-card:var(--card-background-color,#fff);
        --nikas-text:var(--primary-text-color,#17191c);
        --nikas-muted:var(--secondary-text-color,#6d7176);
        --nikas-divider:color-mix(in srgb,var(--nikas-text) 12%,transparent);
        --nikas-normal:#2ba66a;
        --nikas-warning:#e58a00;
        --nikas-error:var(--error-color,#d84040);
        display:block;
        min-height:100vh;
        background:var(--nikas-bg);
        color:var(--nikas-text);
        font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",Roboto,sans-serif;
      }
      *{box-sizing:border-box}
      button{font:inherit;color:inherit;-webkit-tap-highlight-color:transparent}
      .panelShell{min-height:100vh;max-width:1280px;margin:0 auto;padding:0 16px calc(104px + env(safe-area-inset-bottom))}
      .appHeader{position:sticky;top:0;z-index:20;display:grid;grid-template-columns:52px minmax(0,1fr) 52px;align-items:center;min-height:58px;padding:calc(4px + env(safe-area-inset-top)) 0 4px;background:color-mix(in srgb,var(--nikas-bg) 96%,transparent);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
      .headerSlot{display:grid;place-items:center;width:52px;min-height:44px;border:0;background:transparent;color:var(--nikas-primary);cursor:pointer}.headerSlot ha-icon{--mdc-icon-size:25px}.headerPlaceholder{pointer-events:none}.headerTitle{text-align:center;min-width:0}.headerTitle strong{display:block;overflow:hidden;font-size:18px;line-height:1.08;text-overflow:ellipsis;white-space:nowrap}.headerTitle small{display:block;margin-top:2px;overflow:hidden;color:var(--nikas-muted);font-size:10px;text-overflow:ellipsis;white-space:nowrap}
      .panelContent{padding-top:8px}.deviceSelector{display:flex;gap:8px;overflow-x:auto;margin-bottom:12px;padding-bottom:2px}.deviceChoice{display:flex;align-items:center;gap:7px;min-height:44px;padding:0 13px;border:1px solid var(--nikas-divider);border-radius:15px;background:var(--nikas-card);white-space:nowrap}.deviceChoice.active{border-color:color-mix(in srgb,var(--nikas-primary) 55%,var(--nikas-divider));background:color-mix(in srgb,var(--nikas-primary) 9%,var(--nikas-card));color:var(--nikas-primary)}.statusDot{width:8px;height:8px;border-radius:50%;background:#9a9a9a}.statusDot.normal{background:var(--nikas-normal)}.statusDot.warning{background:var(--nikas-warning)}.statusDot.error{background:var(--nikas-error)}.statusDot.info{background:var(--nikas-primary)}
      .heroStatus,.statusCard,.metricCard,.stateRow,.actionCard,.alertCard,.contentCard,.loadingCard{border:1px solid var(--nikas-divider);border-radius:22px;background:var(--nikas-card)}
      .heroStatus{display:grid;grid-template-columns:52px minmax(0,1fr) auto;align-items:center;gap:14px;padding:18px}.heroIcon{display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:color-mix(in srgb,var(--nikas-primary) 12%,var(--nikas-card));color:var(--nikas-primary)}.heroIcon ha-icon{--mdc-icon-size:28px}.heroText h1{margin:0;font-size:25px;letter-spacing:-.035em}.heroText p{margin:3px 0 0;color:var(--nikas-muted);font-size:14px}.heroStatus.normal .heroIcon{background:color-mix(in srgb,var(--nikas-normal) 12%,var(--nikas-card));color:var(--nikas-normal)}.heroStatus.warning .heroIcon{background:color-mix(in srgb,var(--nikas-warning) 12%,var(--nikas-card));color:var(--nikas-warning)}.heroStatus.error .heroIcon{background:color-mix(in srgb,var(--nikas-error) 12%,var(--nikas-card));color:var(--nikas-error)}.heroStatus.unknown .heroIcon{color:var(--nikas-muted)}.heroBadge{padding:6px 9px;border-radius:99px;background:color-mix(in srgb,var(--nikas-primary) 9%,var(--nikas-card));font-size:11px}
      .statusCard{display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;min-height:66px;padding:12px 16px;text-align:left}.statusCard strong,.statusCard small{display:block}.statusCard small{margin-top:3px;color:var(--nikas-muted);font-size:11px}.statusCard>b{font-size:14px}.semantic-normal>b{color:var(--nikas-normal)}.semantic-warning>b{color:var(--nikas-warning)}.semantic-error>b{color:var(--nikas-error)}.semantic-unknown>b{color:var(--nikas-muted)}
      .metricCard{min-height:84px;padding:14px 16px;text-align:left}.metricCard small{display:block;color:var(--nikas-muted);font-size:12px}.metricCard strong{display:block;margin-top:5px;font-size:24px}.metricCard strong span{font-size:.66em;font-weight:650}
      .stateRow{display:grid;grid-template-columns:28px minmax(0,1fr) auto 20px;align-items:center;gap:10px;width:100%;min-height:58px;padding:0 14px;text-align:left}.stateRow>ha-icon{color:var(--nikas-primary);--mdc-icon-size:22px}.stateRow span{font-size:14px}.stateRow b{font-size:13px}.stateRow .chevron{color:var(--nikas-muted);--mdc-icon-size:20px}
      .actionCard{display:grid;grid-template-columns:38px minmax(0,1fr);align-items:center;gap:12px;width:100%;min-height:68px;padding:10px 14px;text-align:left}.actionCard>ha-icon{color:var(--nikas-primary);--mdc-icon-size:26px}.actionCard b,.actionCard small{display:block}.actionCard small{margin-top:3px;color:var(--nikas-muted);font-size:11px}
      .alertCard{display:grid;grid-template-columns:28px minmax(0,1fr);gap:10px;padding:14px}.alertCard>ha-icon{color:var(--nikas-warning)}.alertCard.error>ha-icon{color:var(--nikas-error)}.alertCard b{font-size:14px}.alertCard p{margin:3px 0 0;color:var(--nikas-muted);font-size:12px;line-height:1.4}
      .loadingCard{padding:20px}.skeleton{height:14px;margin:10px 0;border-radius:8px;background:color-mix(in srgb,var(--nikas-text) 7%,var(--nikas-card))}.skeleton.wide{width:82%}.skeleton.medium{width:61%}.skeleton.short{width:38%}
      .bottomTabBar{position:fixed;z-index:30;right:0;bottom:0;left:0;width:100%;padding:7px 10px calc(7px + env(safe-area-inset-bottom));border-top:1px solid var(--nikas-divider);background:color-mix(in srgb,var(--nikas-bg) 96%,transparent);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px)}.bottomTabBarInner{display:grid;grid-template-columns:repeat(var(--tab-count,4),minmax(0,1fr));gap:4px;max-width:1280px;margin:0 auto}.tabButton{display:grid;place-items:center;align-content:center;gap:3px;min-height:62px;border:0;border-radius:14px;background:transparent;color:var(--nikas-muted);font-size:11px;font-weight:750}.tabButton ha-icon{--mdc-icon-size:25px}.tabButton.active{background:color-mix(in srgb,var(--nikas-primary) 10%,transparent);color:var(--nikas-primary)}
      @media(max-width:420px){.panelShell{padding-right:10px;padding-left:10px}.appHeader{grid-template-columns:48px minmax(0,1fr) 48px}.headerSlot{width:48px}.headerTitle strong{font-size:17px}.headerTitle small{font-size:9px}.heroStatus{grid-template-columns:48px minmax(0,1fr) auto;padding:15px}.heroIcon{width:48px;height:48px}.heroText h1{font-size:22px}.heroText p{font-size:13px}.tabButton{min-height:60px;font-size:10.5px}.tabButton ha-icon{--mdc-icon-size:24px}}
      @media(min-width:720px){.panelShell{padding-right:24px;padding-left:24px}}
    `;
  }
}
