// Runs inside the generated POA document. Measures each block and
// repacks pages so font size, spacing, margins, and footer size reflow
// from page 1 through the last page.

export function poaPaginateScript(footerMid: string, footerLast: string): string {
  return `
<script>
(function () {
  var FOOTER_MID = ${JSON.stringify(footerMid)};
  var FOOTER_LAST = ${JSON.stringify(footerLast)};
  var original = null;

  function capacityFor(pageClass) {
    var probe = document.createElement('div');
    probe.className = 'page' + (pageClass ? ' ' + pageClass : '');
    probe.style.cssText = 'position:fixed;left:0;top:0;visibility:hidden;pointer-events:none;z-index:-1;';
    probe.innerHTML = '<div class="page-content"></div>' + FOOTER_MID.replace(/__PAGE__/g, '1');
    document.body.appendChild(probe);
    var content = probe.querySelector('.page-content');
    var cs = window.getComputedStyle(content);
    var cap = content.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    probe.parentNode.removeChild(probe);
    return Math.max(120, Math.floor(cap) - 8);
  }

  function splitToFit(block, capacity, depth) {
    if (depth > 12) return [block];
    if (block.offsetHeight <= capacity) return [block];

    var section = block.querySelector('.numbered-section, .article-pair');
    if (!section) return [block];
    var en = section.querySelector('.block:not(.rtl) p:last-child');
    var ar = section.querySelector('.block.rtl p:last-child');
    if (!en || !ar || en.children.length || ar.children.length) return [block];

    var enWords = en.textContent.trim().split(/\\s+/).filter(Boolean);
    var arWords = ar.textContent.trim().split(/\\s+/).filter(Boolean);
    if (enWords.length < 10 || arWords.length < 4) return [block];

    var enOrig = en.textContent;
    var arOrig = ar.textContent;
    var lo = 6;
    var hi = enWords.length - 4;
    var best = -1;

    while (lo <= hi) {
      var mid = (lo + hi) >> 1;
      var arMid = Math.max(1, Math.min(arWords.length - 1, Math.round(arWords.length * mid / enWords.length)));
      en.textContent = enWords.slice(0, mid).join(' ');
      ar.textContent = arWords.slice(0, arMid).join(' ');
      if (block.offsetHeight <= capacity) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    if (best < 6) {
      en.textContent = enOrig;
      ar.textContent = arOrig;
      return [block];
    }

    var arBest = Math.max(1, Math.min(arWords.length - 1, Math.round(arWords.length * best / enWords.length)));
    en.textContent = enWords.slice(0, best).join(' ');
    ar.textContent = arWords.slice(0, arBest).join(' ');

    var rest = block.cloneNode(true);
    var restSection = rest.querySelector('.numbered-section, .article-pair');
    var restEn = restSection.querySelector('.block:not(.rtl) p:last-child');
    var restAr = restSection.querySelector('.block.rtl p:last-child');
    restEn.textContent = enWords.slice(best).join(' ');
    restAr.textContent = arWords.slice(arBest).join(' ');
    var enParas = restSection.querySelectorAll('.block:not(.rtl) p');
    var arParas = restSection.querySelectorAll('.block.rtl p');
    if (enParas.length > 1) enParas[0].parentNode.removeChild(enParas[0]);
    if (arParas.length > 1) arParas[0].parentNode.removeChild(arParas[0]);
    block.parentNode.appendChild(rest);
    return [block].concat(splitToFit(rest, capacity, depth + 1));
  }

  function paginate() {
    var measure = document.getElementById('flow-measure');
    var doc = document.getElementById('poa-doc');
    if (!measure || !doc) return;
    var measureContent = measure.querySelector('.page-content');
    if (!measureContent) return;

    measure.style.display = '';
    if (original == null) original = measureContent.innerHTML;
    doc.innerHTML = '';
    measureContent.innerHTML = original;

    var cap1 = capacityFor('page-1');
    var capN = capacityFor('');
    var queue = Array.prototype.slice.call(measureContent.children).filter(function (node) {
      return node.classList && node.classList.contains('flow-block');
    });
    var pages = [];
    var current = [];
    var used = 0;

    while (queue.length) {
      var block = queue.shift();
      var cap = pages.length === 0 ? cap1 : capN;
      var h = block.offsetHeight;
      if (current.length && used + h > cap) {
        pages.push(current);
        current = [];
        used = 0;
        cap = capN;
      }
      if (!current.length && h > cap) {
        var parts = splitToFit(block, cap, 0);
        if (parts.length > 1) {
          block = parts[0];
          h = block.offsetHeight;
          for (var i = parts.length - 1; i >= 1; i--) queue.unshift(parts[i]);
        }
      }
      current.push(block);
      used += h;
    }
    if (current.length) pages.push(current);

    pages.forEach(function (pageBlocks, index) {
      var isLast = index === pages.length - 1;
      var page = document.createElement('div');
      page.className = 'page' + (index === 0 ? ' page-1' : '');
      var content = document.createElement('div');
      content.className = 'page-content';
      pageBlocks.forEach(function (b) { content.appendChild(b); });
      page.appendChild(content);
      var footer = (isLast ? FOOTER_LAST : FOOTER_MID).replace(/__PAGE__/g, String(index + 1));
      page.insertAdjacentHTML('beforeend', footer);
      doc.appendChild(page);
    });

    pullSignaturesOntoPreviousPage(doc);
    measure.style.display = 'none';
  }

  function contentCapacity(content) {
    var cs = window.getComputedStyle(content);
    return content.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  }

  function usedHeight(content) {
    var used = 0;
    var child = content.firstElementChild;
    while (child) {
      used += child.offsetHeight;
      child = child.nextElementSibling;
    }
    return used;
  }

  function isSignatureBlock(block) {
    return !!(block && block.querySelector && block.querySelector('.signature-block, .signature-flow'));
  }

  function signatureFits(block, available) {
    return available > 0 && block.offsetHeight <= available;
  }

  function writeFooter(page, pageNumber, isLast) {
    var existing = page.querySelector('.page-footer');
    if (existing) existing.parentNode.removeChild(existing);
    var html = (isLast ? FOOTER_LAST : FOOTER_MID).replace(/__PAGE__/g, String(pageNumber));
    page.insertAdjacentHTML('beforeend', html);
  }

  // Never leave a page holding only signatures: carry the last clause(s) from the
  // previous page over so clause content and all signatures share the last page.
  function keepClauseWithSignatures(doc) {
    var pageEls = Array.prototype.slice.call(doc.querySelectorAll('.page')).filter(function (page) {
      var c = page.querySelector('.page-content');
      return c && c.children.length;
    });
    if (pageEls.length < 2) return;
    var lastContent = pageEls[pageEls.length - 1].querySelector('.page-content');
    var prevContent = pageEls[pageEls.length - 2].querySelector('.page-content');
    var onlySigs = Array.prototype.every.call(lastContent.children, isSignatureBlock);
    if (!onlySigs) return;
    var cap = contentCapacity(lastContent);
    var moved = 0;
    while (moved < 3 && prevContent.lastElementChild && !isSignatureBlock(prevContent.lastElementChild)) {
      var block = prevContent.lastElementChild;
      if (moved > 0 && usedHeight(lastContent) + block.offsetHeight > cap) break;
      lastContent.insertBefore(block, lastContent.firstElementChild);
      moved++;
      if (usedHeight(lastContent) <= cap) break;
    }
  }

  function pullSignaturesOntoPreviousPage(doc) {
    var pageEls = Array.prototype.slice.call(doc.querySelectorAll('.page'));
    for (var i = 1; i < pageEls.length; i++) {
      var prevContent = pageEls[i - 1].querySelector('.page-content');
      var currContent = pageEls[i].querySelector('.page-content');
      if (!prevContent || !currContent) continue;
      var cap = contentCapacity(prevContent);
      while (isSignatureBlock(currContent.firstElementChild)) {
        var block = currContent.firstElementChild;
        var free = cap - usedHeight(prevContent);
        if (!signatureFits(block, free)) break;
        prevContent.appendChild(block);
      }
    }

    keepClauseWithSignatures(doc);

    var kept = Array.prototype.slice.call(doc.querySelectorAll('.page')).filter(function (page) {
      var content = page.querySelector('.page-content');
      return content && content.children.length;
    });
    Array.prototype.slice.call(doc.querySelectorAll('.page')).forEach(function (page) {
      if (kept.indexOf(page) === -1) page.parentNode.removeChild(page);
    });
    kept.forEach(function (page, index) {
      page.className = 'page' + (index === 0 ? ' page-1' : '');
      writeFooter(page, index + 1, index === kept.length - 1);
    });
  }

  function schedule() {
    paginate();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        requestAnimationFrame(function () { requestAnimationFrame(paginate); });
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule);
  else schedule();
})();
</script>`
}
