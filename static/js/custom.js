/**
 * Reference tooltips: show footnote content on hover over [1], [2], etc.
 */
(function () {
  'use strict';

  function getFootnotesSection() {
    var el = document.getElementById('footnotes');
    if (el) return el;
    var content = document.querySelector('#single .content') || document.querySelector('.content');
    if (!content) return null;
    var headings = content.querySelectorAll('h2');
    for (var i = 0; i < headings.length; i++) {
      if (/footnotes/i.test(headings[i].textContent || '')) return headings[i];
    }
    return null;
  }

  function getFootnotesMap(footnotesSection) {
    if (!footnotesSection) return {};

    var map = {};
    var el = footnotesSection.nextElementSibling;
    while (el) {
      var raw = el.textContent && el.textContent.trim();
      var match = raw && raw.match(/^\s*\[(\d+)\]\s*/);
      if (match) {
        var num = match[1];
        var inner = el.innerHTML;
        var content = inner.replace(/^\s*\[\d+\]\s*/, '').trim();
        var next = el.nextElementSibling;
        if (next && next.tagName !== 'P') {
          var last = el;
          while (next && next.tagName !== 'P') {
            content += next.outerHTML;
            last = next;
            next = next.nextElementSibling;
          }
          map[num] = content;
          el = last.nextElementSibling;
          continue;
        }
        map[num] = content;
      }
      el = el.nextElementSibling;
    }
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

    var footnotesSection = getFootnotesSection();
    var footnoteMap = getFootnotesMap(footnotesSection);
    if (Object.keys(footnoteMap).length === 0) return;

    var fullHtml = content.innerHTML;
    var footnotesStart = fullHtml.indexOf('id="footnotes"');
    if (footnotesStart === -1) {
      var h2Start = fullHtml.indexOf('<h2');
      while (h2Start !== -1) {
        var endTag = fullHtml.indexOf('>', h2Start);
        var block = fullHtml.substring(h2Start, endTag + 1);
        if (/footnotes/i.test(block)) {
          footnotesStart = h2Start;
          break;
        }
        h2Start = fullHtml.indexOf('<h2', endTag);
      }
    } else {
      footnotesStart = fullHtml.lastIndexOf('<', footnotesStart);
    }
    if (footnotesStart === -1) return;

    var beforeFootnotes = fullHtml.substring(0, footnotesStart);
    var afterFootnotes = fullHtml.substring(footnotesStart);

    var replaced = beforeFootnotes.replace(/\[(\d+)\]/g, function (match, num) {
      if (!footnoteMap[num]) return match;
      var body = footnoteMap[num];
      return '<span class="ref-tooltip-wrap"><span class="ref-tooltip-trigger" tabindex="0">[' + num + ']</span><span class="ref-tooltip-box">' + body + '</span></span>';
    });

    content.innerHTML = replaced + afterFootnotes;

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
