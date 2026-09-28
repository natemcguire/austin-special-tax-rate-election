(function () {
  'use strict';

  if (window.__austinTaxArchiveAnalyticsLoaded) return;
  window.__austinTaxArchiveAnalyticsLoaded = true;

  var measurementId = 'G-D19QV3FBGY';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  var googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(googleTag);

  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  function track(eventName, parameters) {
    window.gtag('event', eventName, parameters || {});
  }

  function normalizedText(element) {
    return (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100);
  }

  function safeUrl(anchor) {
    try {
      var url = new URL(anchor.href, window.location.href);
      return url.protocol === 'http:' || url.protocol === 'https:'
        ? url.origin + url.pathname
        : url.protocol;
    } catch (error) {
      return '';
    }
  }

  function shareMethod(element) {
    var className = element.className || '';
    var href = element.getAttribute && (element.getAttribute('href') || '');

    if (/share-x|twitter/.test(className) || /twitter\.com|x\.com/.test(href)) return 'x';
    if (/facebook/.test(className) || /facebook\.com/.test(href)) return 'facebook';
    if (/email/.test(className) || href.indexOf('mailto:') === 0) return 'email';
    if (/share-copy/.test(className) || element.id === 'shareBtn') return 'copy_link';
    return 'other';
  }

  function currentArchiveItem() {
    var signMatch = window.location.pathname.match(/\/sign(\d+)\.html$/);
    if (signMatch) return 'sign_' + signMatch[1];
    return window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1);
  }

  document.addEventListener('click', function (event) {
    var element = event.target.closest('a, button');
    if (!element) return;

    var anchor = element.closest('a');
    var className = element.className || '';
    var isShare = /share-btn/.test(className) || element.id === 'shareBtn';

    if (isShare) {
      track('share', {
        method: shareMethod(element),
        content_type: 'tax_election_archive',
        item_id: currentArchiveItem()
      });
    }

    if (!anchor) return;

    var rawHref = anchor.getAttribute('href') || '';
    var destination;
    try {
      destination = new URL(anchor.href, window.location.href);
    } catch (error) {
      return;
    }

    var signMatch = destination.pathname.match(/\/sign(\d+)\.html$/);
    if (signMatch) {
      track('select_content', {
        content_type: 'campaign_sign',
        item_id: 'sign_' + signMatch[1]
      });
    }

    var isDownload = anchor.hasAttribute('download') ||
      /\.(?:csv|docx?|jpe?g|pdf|png|pptx?|svg|xlsx?|zip)$/i.test(destination.pathname);
    if (isDownload) {
      var fileName = anchor.getAttribute('download') || destination.pathname.split('/').pop();
      var extensionMatch = fileName.match(/\.([^.]+)$/);
      track('file_download', {
        file_name: fileName,
        file_extension: extensionMatch ? extensionMatch[1].toLowerCase() : '',
        link_url: safeUrl(anchor),
        content_type: /sign/i.test(fileName) ? 'campaign_sign' : 'archive_asset'
      });
    }

    if (rawHref.indexOf('mailto:') === 0 && !isShare) {
      track('contact', {
        method: 'email',
        link_text: normalizedText(anchor)
      });
      return;
    }

    if (
      destination.origin === window.location.origin &&
      destination.pathname !== window.location.pathname &&
      !signMatch
    ) {
      track('internal_navigation', {
        destination_path: destination.pathname,
        link_text: normalizedText(anchor)
      });
    }
  });
})();
