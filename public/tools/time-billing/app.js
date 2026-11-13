/* Cobro por tiempo — app local.
   Sin cuenta ni nube: todo vive en localStorage de este teléfono. */
(function () {
  'use strict';

  var KEY = 'cobroTiempo.v2';

  // ---------- estado ----------

  function seedState() {
    return {
      v: 1,
      setup: false,
      business: '',
      selectedRate: null,
      rates: [],
      sessions: [],
      days: []
    };
  }

  function loadState() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (err) { raw = null; }
    if (!raw) return seedState();
    try {
      var s = JSON.parse(raw);
      if (!s || s.v !== 1) return seedState();
      if (s.setup === undefined) s.setup = true;
      s.rates = Array.isArray(s.rates) ? s.rates : [];
      s.sessions = Array.isArray(s.sessions) ? s.sessions : [];
      s.days = Array.isArray(s.days) ? s.days : [];
      return s;
    } catch (err) {
      return seedState();
    }
  }

  var state = loadState();

  function saveState() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (err) { /* sigue en memoria */ }
  }

  // ---------- utilidades ----------

  function $(id) { return document.getElementById(id); }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function keyOf(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function todayKey() { return keyOf(new Date()); }

  function isToday(iso) {
    return !!iso && keyOf(new Date(iso)) === todayKey();
  }

  function money(n) {
    return '$' + Math.round(Number(n) || 0).toLocaleString('es-CO');
  }

  function clock(iso) {
    var d = new Date(iso);
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function duration(min) {
    var m = Math.max(0, Math.round(Number(min) || 0));
    if (m === 0) return '0m';
    var d = Math.floor(m / 1440);
    var h = Math.floor((m % 1440) / 60);
    var rest = m % 60;
    if (d > 0) return d + 'd ' + h + 'h';
    if (h > 0) return h + 'h ' + rest + 'm';
    return rest + 'm';
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function sessionById(id) {
    for (var i = 0; i < state.sessions.length; i++) {
      if (state.sessions[i].id === id) return state.sessions[i];
    }
    return null;
  }

  function rateById(id) {
    for (var i = 0; i < state.rates.length; i++) {
      if (state.rates[i].id === id) return state.rates[i];
    }
    return null;
  }

  function rateLabel(r) {
    if (r.mode === 'hour') {
      var extra = r.fraction && r.fraction !== 60 ? ' · ' + r.fraction + 'm' : '';
      return money(r.price) + '/hora' + extra;
    }
    if (r.mode === 'block') return money(r.price) + '/' + (r.block || 15) + ' min';
    return money(r.price) + '/día';
  }

  function metaLine(s, res) {
    return clock(s.start) + ' · ' + duration(res.minutes) + ' · ' + esc(s.rate.name);
  }

  function breakdown(rate, res) {
    if (res.charge === 0) {
      if (rate.grace > 0 && res.minutes <= rate.grace) {
        return 'Dentro de la tolerancia de ' + rate.grace + ' min';
      }
      return 'Sin cobro';
    }
    var unit = res.units === 1 ? res.unit.one : res.unit.many;
    var text = res.units + ' ' + unit + ' × ' + money(Tarifa.unitPrice(rate));
    if (res.capped) text += ' · tope ' + money(rate.cap);
    return text;
  }

  function dateLabel() {
    var text = new Date().toLocaleDateString('es-CO', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function prettyDate(isoKey) {
    var parts = isoKey.split('-');
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
  }

  var TEMPLATES = {
    vehicles: {
      sample: 'Carro $3.000/h · Moto $2.000/h · Día $15.000',
      rates: [
        { name: 'Carro', mode: 'hour', price: 3000 },
        { name: 'Moto', mode: 'hour', price: 2000 },
        { name: 'Día', mode: 'day', price: 15000 }
      ]
    },
    inflables: {
      sample: '15 min $5.000 · 20 min $7.000',
      rates: [
        { name: '15 min', mode: 'block', block: 15, price: 5000 },
        { name: '20 min', mode: 'block', block: 20, price: 7000 }
      ]
    },
    rental: {
      sample: 'Hora $2.000 · Día $10.000',
      rates: [
        { name: 'Hora', mode: 'hour', price: 2000 },
        { name: 'Día', mode: 'day', price: 10000 }
      ]
    },
    other: {
      sample: 'Una tarifa por hora',
      rates: [
        { name: 'Hora', mode: 'hour', price: 3000 }
      ]
    }
  };

  // ---------- totales ----------

  function dayTotals() {
    var t = { paid: 0, cash: 0, transfer: 0, owed: 0, open: 0 };
    state.sessions.forEach(function (s) {
      if (s.status === 'open') {
        t.open += 1;
        return;
      }
      if (s.status === 'owed') {
        t.owed += s.amount || 0;
        return;
      }
      if (s.status === 'paid' && isToday(s.paidAt || s.closedAt)) {
        t.paid += s.amount || 0;
        if (s.method === 'transfer') t.transfer += s.amount || 0;
        else t.cash += s.amount || 0;
      }
    });
    return t;
  }

  // ---------- pintar ----------

  var businessName = $('businessName');
  var todayTotal = $('todayTotal');
  var rateChips = $('rateChips');
  var plate = $('plate');
  var startBtn = $('startBtn');
  var openList = $('openList');
  var openCount = $('openCount');
  var emptyOpen = $('emptyOpen');
  var dayDate = $('dayDate');
  var statPaid = $('statPaid');
  var statCash = $('statCash');
  var statTransfer = $('statTransfer');
  var statOwed = $('statOwed');
  var statOpen = $('statOpen');
  var cashCount = $('cashCount');
  var cashDiff = $('cashDiff');
  var dayMsg = $('dayMsg');
  var closedList = $('closedList');
  var closedCount = $('closedCount');
  var emptyClosed = $('emptyClosed');
  var owedList = $('owedList');
  var owedCount = $('owedCount');
  var emptyOwed = $('emptyOwed');
  var daysHistory = $('daysHistory');
  var bizInput = $('bizInput');
  var rateList = $('rateList');
  var sheet = $('sheet');
  var viewCharge = $('view-charge');
  var viewDay = $('view-day');
  var viewSettings = $('view-settings');
  var setupDialog = $('setup');
  var setupName = $('setupName');
  var setupStart = $('setupStart');
  var setupSample = $('setupSample');
  var installBtn = $('installBtn');
  var installHint = $('installHint');

  var sheetSessionId = null;
  var settleMode = false;
  var payMethod = 'cash';
  var amountDirty = false;
  var setupTemplate = 'vehicles';
  var deferredPrompt = null;

  function renderChips() {
    if (!state.rates.length) {
      rateChips.innerHTML = '<p class="empty-inline">No hay tarifas. Añade una en Ajustes.</p>';
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
    rateChips.innerHTML = state.rates.map(function (r) {
      var on = r.id === state.selectedRate;
      return '<button type="button" class="chip" role="radio" aria-checked="' + (on ? 'true' : 'false') + '" data-rate="' + r.id + '">' +
        '<strong>' + esc(r.name) + '</strong><span>' + rateLabel(r) + '</span></button>';
    }).join('');
  }

  function renderOpen() {
    var open = state.sessions.filter(function (s) { return s.status === 'open'; })
      .sort(function (a, b) { return a.start.localeCompare(b.start); });
    openCount.textContent = String(open.length);
    emptyOpen.hidden = open.length > 0;
    var now = new Date().toISOString();
    openList.innerHTML = open.map(function (s) {
      var res = Tarifa.compute(s.rate, s.start, now);
      return '<li><button type="button" class="row" data-action="open" data-id="' + s.id + '">' +
        '<span class="row-main">' +
          '<span class="row-label">' + esc(s.label) + '</span>' +
          '<span class="row-meta" data-elapsed="' + s.id + '">' + metaLine(s, res) + '</span>' +
        '</span>' +
        '<span class="row-amount" data-amount="' + s.id + '">' + money(res.charge) + '</span>' +
        '</button></li>';
    }).join('');
  }

  function renderTodayTotal() {
    todayTotal.textContent = money(dayTotals().paid);
    businessName.textContent = state.business || 'Mi negocio';
  }

  function renderClosed() {
    var closed = state.sessions.filter(function (s) {
      return s.status === 'paid' && isToday(s.paidAt || s.closedAt);
    }).sort(function (a, b) {
      return String(b.paidAt || b.closedAt).localeCompare(String(a.paidAt || a.closedAt));
    });
    closedCount.textContent = String(closed.length);
    emptyClosed.hidden = closed.length > 0;
    closedList.innerHTML = closed.map(function (s) {
      var res = Tarifa.compute(s.rate, s.start, s.end);
      var tag = '<small>' + (s.method === 'transfer' ? 'Transferencia' : 'Efectivo') + '</small>';
      return '<li class="closed-row">' +
        '<span class="row-main">' +
          '<span class="row-label">' + esc(s.label) + '</span>' +
          '<span class="row-meta">' + clock(s.start) + ' → ' + clock(s.end) + ' · ' + duration(res.minutes) + '</span>' +
        '</span>' +
        '<span class="row-amount">' + money(s.amount) + tag + '</span>' +
        '</li>';
    }).join('');
  }

  function renderOwed() {
    var owed = state.sessions.filter(function (s) { return s.status === 'owed'; })
      .sort(function (a, b) { return String(a.closedAt).localeCompare(String(b.closedAt)); });
    owedCount.textContent = String(owed.length);
    emptyOwed.hidden = owed.length > 0;
    owedList.innerHTML = owed.map(function (s) {
      var res = Tarifa.compute(s.rate, s.start, s.end);
      return '<li><button type="button" class="row" data-action="settle" data-id="' + s.id + '">' +
        '<span class="row-main">' +
          '<span class="row-label">' + esc(s.label) + '</span>' +
          '<span class="row-meta">Desde ' + clock(s.start) + ' · ' + duration(res.minutes) + '</span>' +
        '</span>' +
        '<span class="row-amount">' + money(s.amount) + '<small class="tag-owed">Cobrar</small></span>' +
        '</button></li>';
    }).join('');
  }

  function renderDays() {
    var days = state.days.slice(-5).reverse();
    if (!days.length) {
      daysHistory.innerHTML = '';
      return;
    }
    daysHistory.innerHTML = '<h3 class="sub">Días cerrados</h3>' + days.map(function (d) {
      var diff;
      if (d.diff == null) diff = 'sin contar';
      else if (d.diff === 0) diff = 'cuadra';
      else if (d.diff > 0) diff = 'sobran ' + money(d.diff);
      else diff = 'faltan ' + money(-d.diff);
      return '<div class="day-row"><span>' + prettyDate(d.date) + '</span><strong>' + money(d.paid) + '</strong><small>' + diff + '</small></div>';
    }).join('');
  }

  function updateCashDiff() {
    var raw = cashCount.value.trim();
    if (raw === '') {
      cashDiff.textContent = 'Escribe cuánto efectivo contaste.';
      cashDiff.className = 'diff';
      return;
    }
    var diff = (Number(raw) || 0) - dayTotals().cash;
    if (diff === 0) {
      cashDiff.textContent = 'Cuadra.';
      cashDiff.className = 'diff good';
    } else if (diff > 0) {
      cashDiff.textContent = 'Sobra ' + money(diff) + '.';
      cashDiff.className = 'diff warn';
    } else {
      cashDiff.textContent = 'Falta ' + money(-diff) + '.';
      cashDiff.className = 'diff bad';
    }
  }

  function renderDay() {
    var t = dayTotals();
    dayDate.textContent = dateLabel();
    statPaid.textContent = money(t.paid);
    statCash.textContent = money(t.cash);
    statTransfer.textContent = money(t.transfer);
    statOwed.textContent = money(t.owed);
    statOpen.textContent = String(t.open);
    renderClosed();
    renderOwed();
    renderDays();
    updateCashDiff();
  }

  function field(key, label, type, value) {
    return '<label class="field"><span>' + label + '</span>' +
      '<input data-field="' + key + '" type="' + type + '" inputmode="' + (type === 'number' ? 'numeric' : 'text') + '" min="0" step="1" value="' + esc(String(value)) + '"></label>';
  }

  function option(value, label, current) {
    return '<option value="' + value + '"' + (value === current ? ' selected' : '') + '>' + label + '</option>';
  }

  function renderRates() {
    var openBox = rateList.querySelector('details[open]');
    var openId = openBox ? openBox.getAttribute('data-rate-id') : null;
    if (!state.rates.length) {
      rateList.innerHTML = '<p class="empty">No hay tarifas. Añade una para poder cobrar.</p>';
      return;
    }
    rateList.innerHTML = state.rates.map(function (r) {
      var isHour = r.mode === 'hour';
      var isBlock = r.mode === 'block';
      var priceLabel = isHour ? 'Precio por hora' : (isBlock ? 'Precio por bloque' : 'Precio por día');
      return '<details class="rate-card" data-rate-id="' + r.id + '">' +
        '<summary><span><strong>' + esc(r.name) + '</strong><small>' + rateLabel(r) + '</small></span></summary>' +
        '<div class="fields">' +
          field('name', 'Nombre', 'text', r.name) +
          '<label class="field"><span>Cómo cobra</span><select data-field="mode">' +
            option('hour', 'Por hora', r.mode) +
            option('block', 'Por bloque', r.mode) +
            option('day', 'Por día', r.mode) +
          '</select></label>' +
          field('price', priceLabel, 'number', r.price) +
          (isHour ? field('fraction', 'Fracción (min)', 'number', r.fraction || 60) : '') +
          (isBlock ? field('block', 'Bloque (min)', 'number', r.block || 15) : '') +
          (!isBlock ? field('grace', 'Tolerancia (min)', 'number', r.grace || 0) : '') +
          (!isBlock ? field('min', 'Mínimo (min)', 'number', r.min || 0) : '') +
          field('cap', 'Tope (opcional)', 'number', r.cap || 0) +
          '<button type="button" class="link-danger" data-action="del-rate" data-id="' + r.id + '">Eliminar tarifa</button>' +
        '</div>' +
        '</details>';
    }).join('');
    if (openId) {
      var el = rateList.querySelector('[data-rate-id="' + openId + '"]');
      if (el) el.open = true;
    }
  }

  function renderAll() {
    renderChips();
    renderOpen();
    renderTodayTotal();
    renderDay();
    renderRates();
  }

  function tick() {
    if (viewCharge.hidden && !sheet.open) return;
    var now = new Date().toISOString();
    var nodes = document.querySelectorAll('[data-elapsed]');
    for (var i = 0; i < nodes.length; i++) {
      var id = nodes[i].getAttribute('data-elapsed');
      var s = sessionById(id);
      if (!s) continue;
      var res = Tarifa.compute(s.rate, s.start, now);
      nodes[i].textContent = metaLine(s, res);
      var amountNode = document.querySelector('[data-amount="' + id + '"]');
      if (amountNode) amountNode.textContent = money(res.charge);
    }
    if (sheet.open && sheetSessionId) {
      var current = sessionById(sheetSessionId);
      if (current && current.status === 'open') {
        var r = Tarifa.compute(current.rate, current.start, now);
        var amountEl = $('sheetAmount');
        var timeEl = $('sheetTime');
        var breakdownEl = $('sheetBreakdown');
        if (amountEl) amountEl.textContent = money(r.charge);
        if (timeEl) timeEl.textContent = duration(r.minutes);
        if (breakdownEl) breakdownEl.textContent = breakdown(current.rate, r);
        var input = $('payAmount');
        if (input && !amountDirty && document.activeElement !== input) {
          input.value = r.charge;
        }
      }
    }
  }

  // ---------- acciones ----------

  function startSession() {
    var r = rateById(state.selectedRate) || state.rates[0];
    if (!r) {
      switchTab('settings');
      return;
    }
    var label = plate.value.trim();
    if (!label) {
      var n = state.sessions.filter(function (s) { return isToday(s.start); }).length + 1;
      label = 'Turno ' + n;
    }
    state.sessions.push({
      id: uid(),
      rateId: r.id,
      rate: JSON.parse(JSON.stringify(r)),
      label: label.toUpperCase(),
      start: new Date().toISOString(),
      end: null,
      status: 'open',
      amount: null,
      method: null,
      closedAt: null,
      paidAt: null,
      adjustment: 0,
      startEdited: false
    });
    saveState();
    plate.value = '';
    renderOpen();
    renderTodayTotal();
    plate.focus();
  }

  function openSheet(id) {
    var s = sessionById(id);
    if (!s || s.status !== 'open') return;
    sheetSessionId = id;
    settleMode = false;
    payMethod = 'cash';
    amountDirty = false;
    renderSheet();
    if (!sheet.open) sheet.showModal();
  }

  function openSettle(id) {
    var s = sessionById(id);
    if (!s || s.status !== 'owed') return;
    sheetSessionId = id;
    settleMode = true;
    payMethod = 'cash';
    amountDirty = false;
    renderSheet();
    if (!sheet.open) sheet.showModal();
  }

  function renderSheet() {
    var s = sessionById(sheetSessionId);
    if (!s) return;
    if (settleMode) {
      renderSettleSheet(s);
      return;
    }
    var res = Tarifa.compute(s.rate, s.start, new Date().toISOString());
    sheet.innerHTML = '<div class="sheet-inner">' +
      '<div class="sheet-head">' +
        '<div>' +
          '<h2 id="sheetTitle">' + esc(s.label) + '</h2>' +
          '<p class="muted">' + esc(s.rate.name) + ' · ' + rateLabel(s.rate) + '</p>' +
        '</div>' +
        '<button type="button" class="ghost" data-action="close-sheet">Cerrar</button>' +
      '</div>' +
      '<div class="big"><strong id="sheetAmount">' + money(res.charge) + '</strong><span id="sheetTime">' + duration(res.minutes) + '</span></div>' +
      '<p class="breakdown" id="sheetBreakdown">' + breakdown(s.rate, res) + '</p>' +
      '<p class="fineprint">Entró a las ' + clock(s.start) + (s.startEdited ? ' · hora corregida' : '') + '</p>' +
      '<div class="ticket-rule"></div>' +
      '<div class="pay">' +
        '<label for="payAmount">Cobro</label>' +
        '<input id="payAmount" type="number" inputmode="numeric" min="0" step="100" value="' + res.charge + '">' +
        '<div class="segmented" role="radiogroup" aria-label="Medio de pago">' +
          '<button type="button" class="seg' + (payMethod === 'cash' ? ' is-active' : '') + '" data-method="cash">Efectivo</button>' +
          '<button type="button" class="seg' + (payMethod === 'transfer' ? ' is-active' : '') + '" data-method="transfer">Transferencia</button>' +
        '</div>' +
        '<button type="button" class="primary" data-action="confirm-pay">Cobrado</button>' +
        '<button type="button" class="secondary" data-action="confirm-owe">Cobrar después</button>' +
      '</div>' +
      '<details class="entry-edit">' +
        '<summary>Corregir la hora de entrada</summary>' +
        '<div class="row-2"><input id="entryTime" type="time" value="' + clock(s.start) + '"><button type="button" class="secondary" data-action="save-entry">Guardar</button></div>' +
        '<p class="fineprint">Solo si el registro se equivocó. Queda marcada como corrección.</p>' +
      '</details>' +
      '<button type="button" class="link-danger" data-action="void">Anular</button>' +
      '</div>';
    var payInput = $('payAmount');
    if (payInput) {
      payInput.addEventListener('input', function () { amountDirty = true; });
    }
  }

  function renderSettleSheet(s) {
    sheet.innerHTML = '<div class="sheet-inner">' +
      '<div class="sheet-head">' +
        '<div>' +
          '<h2 id="sheetTitle">Cobrar</h2>' +
          '<p class="muted">' + esc(s.label) + ' · debe desde las ' + clock(s.start) + '</p>' +
        '</div>' +
        '<button type="button" class="ghost" data-action="close-sheet">Cerrar</button>' +
      '</div>' +
      '<div class="big"><strong id="sheetAmount">' + money(s.amount) + '</strong><span>por cobrar</span></div>' +
      '<div class="ticket-rule"></div>' +
      '<div class="pay">' +
        '<label for="payAmount">Cobro</label>' +
        '<input id="payAmount" type="number" inputmode="numeric" min="0" step="100" value="' + s.amount + '">' +
        '<div class="segmented" role="radiogroup" aria-label="Medio de pago">' +
          '<button type="button" class="seg' + (payMethod === 'cash' ? ' is-active' : '') + '" data-method="cash">Efectivo</button>' +
          '<button type="button" class="seg' + (payMethod === 'transfer' ? ' is-active' : '') + '" data-method="transfer">Transferencia</button>' +
        '</div>' +
        '<button type="button" class="primary" data-action="confirm-settle">Cobrado</button>' +
      '</div>' +
      '</div>';
    var input = $('payAmount');
    if (input) input.addEventListener('input', function () { amountDirty = true; });
  }

  function finishClose() {
    saveState();
    if (sheet.open) sheet.close();
    renderAll();
  }

  function confirmPay() {
    var s = sessionById(sheetSessionId);
    if (!s || s.status !== 'open') return;
    var now = new Date().toISOString();
    var res = Tarifa.compute(s.rate, s.start, now);
    var input = $('payAmount');
    var amount = amountDirty
      ? Math.max(0, Math.round(Number(input ? input.value : 0) || 0))
      : res.charge;
    s.end = now;
    s.closedAt = now;
    s.status = 'paid';
    s.amount = amount;
    s.adjustment = amount - res.charge;
    s.method = payMethod;
    s.paidAt = now;
    finishClose();
  }

  function confirmOwe() {
    var s = sessionById(sheetSessionId);
    if (!s || s.status !== 'open') return;
    var now = new Date().toISOString();
    var res = Tarifa.compute(s.rate, s.start, now);
    var input = $('payAmount');
    var amount = amountDirty
      ? Math.max(0, Math.round(Number(input ? input.value : 0) || 0))
      : res.charge;
    s.end = now;
    s.closedAt = now;
    s.status = 'owed';
    s.amount = amount;
    s.adjustment = amount - res.charge;
    s.method = null;
    s.paidAt = null;
    finishClose();
  }

  function confirmSettle() {
    var s = sessionById(sheetSessionId);
    if (!s || s.status !== 'owed') return;
    var input = $('payAmount');
    var amount = amountDirty
      ? Math.max(0, Math.round(Number(input ? input.value : 0) || 0))
      : s.amount;
    s.amount = amount;
    s.method = payMethod;
    s.paidAt = new Date().toISOString();
    s.status = 'paid';
    finishClose();
  }

  function voidSession() {
    var s = sessionById(sheetSessionId);
    if (!s || s.status !== 'open') return;
    var now = new Date().toISOString();
    s.end = now;
    s.closedAt = now;
    s.status = 'void';
    s.amount = 0;
    s.method = null;
    s.paidAt = null;
    finishClose();
  }

  function correctStart(hhmm) {
    var s = sessionById(sheetSessionId);
    if (!s || !hhmm) return;
    var parts = hhmm.split(':');
    var d = new Date();
    d.setHours(Number(parts[0]) || 0, Number(parts[1]) || 0, 0, 0);
    if (d.getTime() > Date.now()) d.setDate(d.getDate() - 1);
    s.start = d.toISOString();
    s.startEdited = true;
    amountDirty = false;
    saveState();
    renderSheet();
    renderOpen();
  }

  function closeDay() {
    var t = dayTotals();
    var raw = cashCount.value.trim();
    var counted = raw === '' ? null : (Number(raw) || 0);
    var snap = {
      date: todayKey(),
      at: new Date().toISOString(),
      paid: t.paid,
      cash: t.cash,
      transfer: t.transfer,
      owed: t.owed,
      open: t.open,
      counted: counted,
      diff: counted == null ? null : counted - t.cash
    };
    var index = -1;
    for (var i = 0; i < state.days.length; i++) {
      if (state.days[i].date === snap.date) index = i;
    }
    if (index >= 0) state.days[index] = snap;
    else state.days.push(snap);
    saveState();
    renderDays();
    dayMsg.textContent = counted == null
      ? 'Día guardado sin cuadre de efectivo.'
      : (counted === t.cash ? 'Día cerrado. La caja cuadra.' : 'Día cerrado. Revisa la diferencia.');
  }

  function exportData() {
    var data = {
      v: 1,
      app: 'cobro-por-tiempo',
      exportedAt: new Date().toISOString(),
      setup: state.setup,
      business: state.business,
      rates: state.rates,
      sessions: state.sessions,
      days: state.days
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'cobro-' + todayKey() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function addRate() {
    var r = {
      id: uid(),
      name: 'Tarifa ' + (state.rates.length + 1),
      mode: 'hour',
      price: 1000,
      fraction: 60,
      grace: 0,
      min: 0,
      cap: 0
    };
    state.rates.push(r);
    saveState();
    renderAll();
    var el = rateList.querySelector('[data-rate-id="' + r.id + '"]');
    if (el) {
      el.open = true;
      el.scrollIntoView({ block: 'center' });
    }
  }

  function deleteRate(id) {
    if (state.rates.length <= 1) {
      alert('Necesitas al menos una tarifa.');
      return;
    }
    if (!confirm('¿Eliminar esta tarifa? Las sesiones que ya empezaron conservan su precio.')) return;
    state.rates = state.rates.filter(function (r) { return r.id !== id; });
    if (state.selectedRate === id) state.selectedRate = state.rates[0].id;
    saveState();
    renderAll();
  }

  function clearAll() {
    try { localStorage.removeItem(KEY); } catch (err) { /* nada */ }
    state = seedState();
    bizInput.value = state.business;
    cashCount.value = '';
    dayMsg.textContent = '';
    if (sheet.open) sheet.close();
    saveState();
    renderAll();
    switchTab('charge');
    openSetup();
  }

  function selectTemplate(key) {
    if (!TEMPLATES[key]) return;
    setupTemplate = key;
    var buttons = document.querySelectorAll('[data-template]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-checked', buttons[i].getAttribute('data-template') === key ? 'true' : 'false');
    }
    if (setupSample) setupSample.textContent = TEMPLATES[key].sample;
  }

  function openSetup() {
    if (!setupDialog) return;
    selectTemplate('vehicles');
    if (setupName) setupName.value = '';
    if (!setupDialog.open) setupDialog.showModal();
  }

  function finishSetup() {
    var name = (setupName && setupName.value.trim()) || 'Mi negocio';
    var chosen = TEMPLATES[setupTemplate].rates.map(function (rate) {
      return {
        id: uid(),
        name: rate.name,
        mode: rate.mode,
        price: rate.price,
        fraction: rate.fraction || 60,
        block: rate.block || 15,
        grace: rate.grace || 0,
        min: rate.min || 0,
        cap: rate.cap || 0
      };
    });
    state.business = name;
    state.rates = chosen;
    state.selectedRate = chosen[0].id;
    state.setup = true;
    saveState();
    if (setupDialog && setupDialog.open) setupDialog.close();
    renderAll();
    switchTab('charge');
    plate.focus();
  }

  function wireInstall() {
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('beforeinstallprompt', function (event) {
        event.preventDefault();
        deferredPrompt = event;
        if (installHint) installHint.textContent = 'Ya puedes instalarla en este teléfono.';
      });
      window.addEventListener('appinstalled', function () {
        deferredPrompt = null;
        if (installHint) installHint.textContent = 'Listo: quedó en tu pantalla de inicio.';
      });
    }
    if (!installBtn) return;
    installBtn.addEventListener('click', function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () { deferredPrompt = null; });
        return;
      }
      var ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
      if (/iPhone|iPad|iPod/i.test(ua)) {
        if (installHint) installHint.textContent = 'En Safari: toca Compartir y elige «Añadir a pantalla de inicio».';
      } else if (/Android/i.test(ua)) {
        if (installHint) installHint.textContent = 'En Chrome: abre el menú ⋮ y elige «Añadir a pantalla de inicio».';
      } else {
        if (installHint) installHint.textContent = 'En Chrome: usa el icono de instalar de la barra de direcciones, o menú ⋮ → «Instalar Cobro por tiempo».';
      }
    });
  }

  function switchTab(name) {
    viewCharge.hidden = name !== 'charge';
    viewDay.hidden = name !== 'day';
    viewSettings.hidden = name !== 'settings';
    var tabs = document.querySelectorAll('[data-tab]');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('is-active', tabs[i].getAttribute('data-tab') === name);
    }
    if (name === 'day') renderDay();
    if (name === 'settings') renderRates();
    window.scrollTo(0, 0);
  }

  function twoStep(btn, run) {
    if (btn.dataset.armed === '1') {
      btn.dataset.armed = '0';
      run();
      return;
    }
    var original = btn.textContent;
    btn.dataset.armed = '1';
    btn.textContent = '¿Seguro? Toca otra vez';
    setTimeout(function () {
      if (btn.isConnected && btn.dataset.armed === '1') {
        btn.dataset.armed = '0';
        btn.textContent = original;
      }
    }, 3000);
  }

  function handleAction(action, el) {
    switch (action) {
      case 'open': openSheet(el.getAttribute('data-id')); break;
      case 'settle': openSettle(el.getAttribute('data-id')); break;
      case 'close-sheet': sheet.close(); break;
      case 'confirm-pay': confirmPay(); break;
      case 'confirm-owe': confirmOwe(); break;
      case 'confirm-settle': confirmSettle(); break;
      case 'save-entry':
        correctStart(($('entryTime') || {}).value);
        break;
      case 'void': twoStep(el, voidSession); break;
      case 'add-rate': addRate(); break;
      case 'del-rate': deleteRate(el.getAttribute('data-id')); break;
      case 'close-day': closeDay(); break;
      case 'export': exportData(); break;
      case 'clear': twoStep(el, clearAll); break;
    }
  }

  // ---------- eventos ----------

  document.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-tab]');
    if (tab) {
      switchTab(tab.getAttribute('data-tab'));
      return;
    }
    var chip = e.target.closest('[data-rate]');
    if (chip) {
      state.selectedRate = chip.getAttribute('data-rate');
      saveState();
      renderChips();
      return;
    }
    var method = e.target.closest('[data-method]');
    if (method) {
      payMethod = method.getAttribute('data-method');
      var segs = document.querySelectorAll('[data-method]');
      for (var i = 0; i < segs.length; i++) {
        segs[i].classList.toggle('is-active', segs[i] === method);
      }
      return;
    }
    var tpl = e.target.closest('[data-template]');
    if (tpl) {
      selectTemplate(tpl.getAttribute('data-template'));
      return;
    }
    var action = e.target.closest('[data-action]');
    if (action) {
      handleAction(action.getAttribute('data-action'), action);
    }
  });

  startBtn.addEventListener('click', startSession);

  if (setupStart) setupStart.addEventListener('click', finishSetup);
  if (setupDialog) setupDialog.addEventListener('cancel', function (e) { e.preventDefault(); });

  plate.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      startSession();
    }
  });

  bizInput.addEventListener('input', function () {
    state.business = bizInput.value.trim();
    saveState();
    businessName.textContent = state.business || 'Mi negocio';
  });

  cashCount.addEventListener('input', updateCashDiff);

  rateList.addEventListener('change', function (e) {
    var key = e.target.getAttribute('data-field');
    if (!key) return;
    var box = e.target.closest('[data-rate-id]');
    if (!box) return;
    var r = rateById(box.getAttribute('data-rate-id'));
    if (!r) return;
    if (key === 'name') {
      r.name = e.target.value.trim() || 'Tarifa';
      var summaryName = box.querySelector('summary strong');
      if (summaryName) summaryName.textContent = r.name;
    } else if (key === 'mode') {
      r.mode = e.target.value;
      if (r.mode === 'block') {
        r.grace = 0;
        r.min = 0;
      }
      saveState();
      renderChips();
      renderRates();
      return;
    } else {
      r[key] = Math.max(0, Number(e.target.value) || 0);
      var summaryPrice = box.querySelector('summary small');
      if (summaryPrice) summaryPrice.textContent = rateLabel(r);
    }
    saveState();
    renderChips();
  });

  sheet.addEventListener('close', function () {
    sheetSessionId = null;
    settleMode = false;
  });

  // ---------- arranque ----------

  if (!state.selectedRate || !rateById(state.selectedRate)) {
    state.selectedRate = state.rates.length ? state.rates[0].id : null;
  }
  bizInput.value = state.business || '';
  renderAll();
  switchTab('charge');
  wireInstall();
  if (!state.setup) openSetup();
  setInterval(tick, 1000);
})();
