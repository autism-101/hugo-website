(function () {
  const GA_MEASUREMENT_ID = "G-713X8P7W8K";
  const CONSENT_KEY = "autism101_cookie_consent";
  const CONSENT_GRANTED = "granted";
  const CONSENT_DENIED = "denied";

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  // Default to denied before any analytics code runs.
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  function hasGrantedConsent() {
    return localStorage.getItem(CONSENT_KEY) === CONSENT_GRANTED;
  }

  function hasDeniedConsent() {
    return localStorage.getItem(CONSENT_KEY) === CONSENT_DENIED;
  }

  function loadGoogleAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }

  function injectStyles() {
    if (document.getElementById("cookie-consent-styles")) return;

    const style = document.createElement("style");
    style.id = "cookie-consent-styles";
    style.textContent = `
      .cookie-consent-banner {
        position: fixed;
        left: 1rem;
        right: 1rem;
        bottom: 1rem;
        z-index: 9999;
        max-width: 760px;
        margin: 0 auto;
        padding: 1rem;
        border-radius: 0.75rem;
        background: #1C2227;
        color: #ffffff;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
        font-size: 0.95rem;
        line-height: 1.5;
      }

      .cookie-consent-banner a {
        color: #ffffff;
        text-decoration: underline;
      }

      .cookie-consent-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.75rem;
      }

      .cookie-consent-button {
        border: 0;
        border-radius: 999px;
        padding: 0.55rem 1rem;
        cursor: pointer;
        font-weight: 700;
      }

      .cookie-consent-accept {
        background: #ffffff;
        color: #0d9e9d;
      }

      .cookie-consent-decline {
        background: transparent;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.7);
      }
    `;
    document.head.appendChild(style);
  }

  function showBanner() {
    if (hasGrantedConsent() || hasDeniedConsent()) return;
    if (document.getElementById("cookie-consent-banner")) return;

    injectStyles();

    const banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.className = "cookie-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie notice");

    banner.innerHTML = `
      <div>
        This website uses cookies and Google Analytics to understand how visitors use the site and improve the experience.
        <a href="/privacy-policy/">Learn more</a>.
      </div>
      <div class="cookie-consent-actions">
        <button type="button" class="cookie-consent-button cookie-consent-accept">
          I Understand
        </button>
        <button type="button" class="cookie-consent-button cookie-consent-decline">
          No Thanks
        </button>
      </div>
    `;

    banner
      .querySelector(".cookie-consent-accept")
      .addEventListener("click", function () {
        localStorage.setItem(CONSENT_KEY, CONSENT_GRANTED);
        loadGoogleAnalytics();
        banner.remove();
      });

    banner
      .querySelector(".cookie-consent-decline")
      .addEventListener("click", function () {
        localStorage.setItem(CONSENT_KEY, CONSENT_DENIED);
        banner.remove();
      });

    document.body.appendChild(banner);
  }

  if (hasGrantedConsent()) {
    loadGoogleAnalytics();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showBanner);
  } else {
    showBanner();
  }
})();
