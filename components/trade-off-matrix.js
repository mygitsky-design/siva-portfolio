/* ============================================================================
 * <trade-off-matrix> — reusable comparison / decision matrix
 * ----------------------------------------------------------------------------
 * Extracted verbatim from the hardcoded `.cv-mtx` table on the Program
 * Versioning case study. Renders an N-column comparison table with an optional
 * highlighted ("chosen") column and a final ✓/✗ decision row.
 *
 * Every style below is copied unchanged from that page's inline <style> block
 * (the `.cv-mtx*` rules + the ≤760px font-size rule). No new visual styles are
 * introduced. The `trade-off-matrix { display:contents }` rule only removes the
 * host element from the box tree so the rendered <table> lays out exactly where
 * the original <table> did.
 *
 * Config is supplied as a child <script type="application/json">:
 *
 *   <trade-off-matrix>
 *     <script type="application/json">
 *     {
 *       "rowLabelHeader": "",                 // first header cell (default "")
 *       "columns": ["Edit live", "Side-by-side", "Copy-based draft"],
 *       "selected": 2,                         // 0-based highlighted column, or null
 *       "rows": [
 *         { "label": "Participant safety", "cells": ["Low", "High", "High"] }
 *       ],
 *       "decision": {
 *         "label": "Decision",                 // default "Decision"
 *         "cells": [
 *           { "mark": "no", "text": "Not safe" },   // mark: "ok" | "no" | null
 *           { "mark": "no", "text": "Complex" },
 *           { "mark": "ok", "text": "Chosen" }
 *         ]
 *       }
 *     }
 *     </script>
 *   </trade-off-matrix>
 *
 * Cells are plain text (HTML-escaped). `columns` may be any length N; every
 * `rows[].cells` and `decision.cells` array must match that length.
 * ==========================================================================*/
(function () {
  "use strict";

  var STYLE_ID = "cv-mtx-styles";
  var CSS = [
    ".cv-mtx { width:100%; border-collapse:separate; border-spacing:0; font-size:var(--step--1); }",
    ".cv-mtx th, .cv-mtx td { padding:.55rem .6rem; text-align:center; border-bottom:1px solid var(--line); }",
    ".cv-mtx thead th { font-size:.72rem; font-weight:700; color:var(--ink); }",
    ".cv-mtx tbody th { text-align:left; font-weight:600; color:var(--ink-2); white-space:nowrap; }",
    ".cv-mtx td { color:var(--ink-2); }",
    ".cv-mtx tbody tr:last-child th, .cv-mtx tbody tr:last-child td { border-bottom:0; font-weight:700; }",
    ".cv-mtx__sel { background:var(--accent-soft); color:var(--accent-ink) !important; }",
    ".cv-mtx thead .cv-mtx__sel { border-radius:10px 10px 0 0; }",
    ".cv-mtx tbody tr:last-child .cv-mtx__sel { border-radius:0 0 10px 10px; }",
    ".cv-mtx .ok { color:#15803d; } .cv-mtx .no { color:#b42318; }",
    "trade-off-matrix { display:contents; }",
    "@media (max-width:760px){ .cv-mtx { font-size:.78rem; } }"
  ].join("\n");

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function selClass(i, selected) {
    return i === selected ? ' class="cv-mtx__sel"' : "";
  }

  function markSpan(mark) {
    if (mark === "ok") return '<span class="ok">✓</span> ';
    if (mark === "no") return '<span class="no">✗</span> ';
    return "";
  }

  function render(cfg) {
    var cols = cfg.columns || [];
    var selected = (cfg.selected == null) ? -1 : cfg.selected;
    var rows = cfg.rows || [];
    var decision = cfg.decision;

    var head = "<tr><th scope=\"col\">" + esc(cfg.rowLabelHeader || "") + "</th>";
    cols.forEach(function (c, i) {
      head += "<th scope=\"col\"" + selClass(i, selected) + ">" + esc(c) + "</th>";
    });
    head += "</tr>";

    var body = "";
    rows.forEach(function (row) {
      body += "<tr><th scope=\"row\">" + esc(row.label) + "</th>";
      (row.cells || []).forEach(function (v, i) {
        body += "<td" + selClass(i, selected) + ">" + esc(v) + "</td>";
      });
      body += "</tr>";
    });

    if (decision) {
      body += "<tr><th scope=\"row\">" + esc(decision.label || "Decision") + "</th>";
      (decision.cells || []).forEach(function (cell, i) {
        body += "<td" + selClass(i, selected) + ">" + markSpan(cell.mark) + esc(cell.text) + "</td>";
      });
      body += "</tr>";
    }

    return '<table class="cv-mtx"><thead>' + head + "</thead><tbody>" + body + "</tbody></table>";
  }

  var TradeOffMatrix = function () {
    return Reflect.construct(HTMLElement, [], TradeOffMatrix);
  };
  TradeOffMatrix.prototype = Object.create(HTMLElement.prototype);
  TradeOffMatrix.prototype.constructor = TradeOffMatrix;

  TradeOffMatrix.prototype.connectedCallback = function () {
    if (this._rendered) return;
    var script = this.querySelector('script[type="application/json"]');
    // If the element upgraded before its child config <script> was parsed
    // (e.g. the definition loaded in <head>), wait until the DOM is ready.
    if (!script) {
      if (document.readyState === "loading") {
        var self = this;
        document.addEventListener("DOMContentLoaded", function () {
          self.connectedCallback();
        }, { once: true });
      }
      return;
    }
    var cfg;
    try {
      cfg = JSON.parse(script.textContent);
    } catch (e) {
      console.error("<trade-off-matrix> invalid JSON config:", e);
      return;
    }
    this.insertAdjacentHTML("beforeend", render(cfg));
    this._rendered = true;
  };

  injectStyles();
  if (!customElements.get("trade-off-matrix")) {
    customElements.define("trade-off-matrix", TradeOffMatrix);
  }
})();
