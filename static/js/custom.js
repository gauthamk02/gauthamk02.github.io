/**
 * Reference tooltips: show footnote content on hover over <sup>[1]</sup> citations.
 *
 * Citations in markdown use <sup>[N]</sup>, footnote definitions use [N] at
 * the start of a line under a ## Footnotes heading.
 */
(function () {
  'use strict';

  function getFootnotesMap(content) {
    var map = {};
    var paragraphs = content.querySelectorAll('p');
    paragraphs.forEach(function (el) {
      var raw = el.textContent && el.textContent.trim();
      var match = raw && raw.match(/^\s*\[(\d+)\]\s*/);
      if (!match) return;

      var num = match[1];
      var inner = el.innerHTML;
      var body = inner.replace(/^\s*\[\d+\]\s*/, '').trim();
      var next = el.nextElementSibling;
      if (next && next.tagName !== 'P') {
        while (next && next.tagName !== 'P') {
          body += next.outerHTML;
          next = next.nextElementSibling;
        }
      }
      map[num] = body;
    });
    return map;
  }

  function isMobileOrTouch() {
    return window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
  }

  function initFootnoteTooltips() {
    if (isMobileOrTouch()) return;

    var content = document.querySelector('#single .content') || document.querySelector('.content');
    if (!content) return;

    var footnoteMap = getFootnotesMap(content);
    if (Object.keys(footnoteMap).length === 0) return;

    // Match <sup>[N]</sup> citations — unambiguous, no need to split HTML
    var sups = content.querySelectorAll('sup');
    sups.forEach(function (sup) {
      var text = sup.textContent && sup.textContent.trim();
      var match = text && text.match(/^\[(\d+)\]$/);
      if (!match) return;

      var num = match[1];
      if (!footnoteMap[num]) return;

      var wrap = document.createElement('span');
      wrap.className = 'ref-tooltip-wrap';

      var trigger = document.createElement('span');
      trigger.className = 'ref-tooltip-trigger';
      trigger.setAttribute('tabindex', '0');
      trigger.innerHTML = '<sup>[' + num + ']</sup>';

      var box = document.createElement('span');
      box.className = 'ref-tooltip-box';
      box.innerHTML = footnoteMap[num];

      wrap.appendChild(trigger);
      wrap.appendChild(box);
      sup.replaceWith(wrap);
    });

    content.querySelectorAll('.ref-tooltip-wrap').forEach(function (wrap) {
      var trigger = wrap.querySelector('.ref-tooltip-trigger');
      var box = wrap.querySelector('.ref-tooltip-box');
      if (!trigger || !box) return;
      function show() {
        box.classList.add('tooltip-visible');
      }
      function hide() {
        box.classList.remove('tooltip-visible');
        if (document.activeElement === trigger) trigger.blur();
      }
      wrap.addEventListener('mouseenter', show);
      wrap.addEventListener('mouseleave', hide);
      trigger.addEventListener('focus', show);
      trigger.addEventListener('blur', hide);
    });

    function closeAllTooltips() {
      content.querySelectorAll('.ref-tooltip-box.tooltip-visible').forEach(function (box) {
        box.classList.remove('tooltip-visible');
        var trigger = box.previousElementSibling;
        if (trigger && trigger.classList.contains('ref-tooltip-trigger') && document.activeElement === trigger) {
          trigger.blur();
        }
      });
    }

    document.addEventListener('touchstart', function (e) {
      if (!e.target.closest || !e.target.closest('.ref-tooltip-wrap')) {
        closeAllTooltips();
      }
    }, { passive: true });

    document.addEventListener('scroll', closeAllTooltips, { passive: true });
  }

  function run() {
    initFootnoteTooltips();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(run, 0);
    });
  } else {
    setTimeout(run, 0);
  }
  window.addEventListener('load', function () {
    if (!document.querySelector('.ref-tooltip-wrap')) run();
  });
})();
