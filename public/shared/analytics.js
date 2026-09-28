(function () {
  'use strict';
  if (window.__austinCivicAnalyticsLoaded) return;
  window.__austinCivicAnalyticsLoaded = true;

  var measurementId = 'G-D19QV3FBGY';
  var siteId = document.documentElement.dataset.site || window.location.hostname;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(script);
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { site_id: siteId });

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;
    var destination;
    try { destination = new URL(link.href, window.location.href); } catch (error) { return; }
    window.gtag('event', destination.hostname === window.location.hostname ? 'internal_navigation' : 'outbound_click', {
      site_id: siteId,
      link_url: destination.origin + destination.pathname,
      link_text: (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100)
    });
  });
})();
