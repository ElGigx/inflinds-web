/* Cuentas claras — app local.
   Sin cuenta ni nube: todo vive en localStorage de este teléfono. */
(function () {
  'use strict';

  var KEY = 'cuentasClaras.v1';
  var EVENTS_KEY = 'cuentasClaras.events.v1';
  var ANON_KEY = 'cuentasClaras.anon';
  var VISIT_KEY = 'cuentasClaras.visits';
  var EVENTS_URL = window.CUENTAS_EVENTS_URL || '';

  // ---------- utilidades ----------

  function $(id) { return document.getElementById(id); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n) { return '$' + Math.round(Number(n) || 0).toLocaleString('es-CO'); }
  function num(value) { return Math.round(Number(value) || 0); }
  function dateKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function todayKey() { return dateKey(new Date()); }
  function parseDate(key) {
    var p = String(key || todayKey()).split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }
  function shortDate(key) {
    return parseDate(key).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
  }
  function longDate(key) {
    var text = parseDate(key).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  function timeOf(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function initials(name) {
    var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    return (parts[0].charAt(0) + (parts.length > 1 ? parts[1].charAt(0) : '')).toUpperCase();
  }
  function firstName(name) {
    return String(name || '').trim().split(/\s+/)[0] || '';
  }
  function phoneDigits(phone) {
    var digits = String(phone || '').replace(/\D/g, '');
    if (digits.length === 10) digits = '57' + digits;
    return digits;
  }
  function methodLabel(method) {
    if (method === 'transfer') return 'Transferencia';
    if (method === 'cash') return 'Efectivo';
    return '—';
  }
  function bucket(n) {
    n = Math.abs(Number(n) || 0);
    if (n < 10000) return '<10k';
    if (n < 50000) return '10-50k';
    if (n < 200000) return '50-200k';
    return '200k+';
  }

  // ---------- estado ----------

  function seedState() {
    return { v: 1, setup: false, business: '', phone: '', customers: [], entries: [] };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return seedState();
      var s = JSON.parse(raw);
      if (!s || s.v !== 1) return seedState();
      s.customers = Array.isArray(s.customers) ? s.customers : [];
      s.entries = Array.isArray(s.entries) ? s.entries : [];
      return s;
    } catch (err) {
      return seedState();
    }
  }

  var state = loadState();

  function saveState() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (err) { /* sigue en memoria */ }
  }

  function customerById(id) {
    for (var i = 0; i < state.customers.length; i++) {
      if (state.customers[i].id === id) return state.customers[i];
    }
    return null;
  }

  // ---------- medición anónima ----------

  var anonId = (function () {
    try {
      var v = localStorage.getItem(ANON_KEY);
      if (!v) { v = uid(); localStorage.setItem(ANON_KEY, v); }
      return v;
    } catch (err) {
      return uid();
    }
  })();

  function readEvents() {
    try { return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]'); } catch (err) { return []; }
  }

  function writeEvents(list) {
    try { localStorage.setItem(EVENTS_KEY, JSON.stringify(list.slice(-120))); } catch (err) { /* nada */ }
  }

  function flushEvents() {
    if (!EVENTS_URL || typeof fetch !== 'function') return;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
    var queue = readEvents();
    if (!queue.length) return;
    try {
      fetch(EVENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({ app: 'accounts-receivable', anon: anonId, events: queue })
      }).then(function (res) {
        if (res.ok) writeEvents([]);
      }).catch(function () { /* se reintenta al volver la red */ });
    } catch (err) { /* se reintenta */ }
  }

  function track(name, props) {
    var queue = readEvents();
    queue.push({ name: name, props: props || {}, at: Date.now() });
    writeEvents(queue);
    flushEvents();
  }

  // ---------- referencias ----------

  var businessName = $('businessName');
  var totalOwed = $('totalOwed');
  var search = $('search');
  var customerCount = $('customerCount');
  var customerList = $('customerList');
  var emptyCustomers = $('emptyCustomers');
  var viewCuentas = $('view-cuentas');
  var viewDia = $('view-dia');
  var viewAjustes = $('view-ajustes');
  var viewCustomer = $('view-customer');
  var dayDate = $('dayDate');
  var dayCharges = $('dayCharges');
  var dayPayments = $('dayPayments');
  var dayCount = $('dayCount');
  var dayList = $('dayList');
  var dayListCount = $('dayListCount');
  var emptyDay = $('emptyDay');
  var businessInput = $('businessInput');
  var phoneInput = $('phoneInput');
  var installBtn = $('installBtn');
  var installHint = $('installHint');
  var customerAvatar = $('customerAvatar');
  var customerName = $('customerName');
  var customerPhone = $('customerPhone');
  var customerBalanceBox = $('customerBalanceBox');
  var customerBalanceLabel = $('customerBalanceLabel');
  var customerBalance = $('customerBalance');
  var remindBtn = $('remindBtn');
  var entryCount = $('entryCount');
  var entryList = $('entryList');
  var emptyEntries = $('emptyEntries');
  var deleteCustomerBtn = $('deleteCustomerBtn');
  var setup = $('setup');
  var setupName = $('setupName');
  var setupPhone = $('setupPhone');
  var setupStart = $('setupStart');
  var customerSheet = $('customerSheet');
  var customerForm = $('customerForm');
  var customerFormTitle = $('customerFormTitle');
  var customerNameInput = $('customerNameInput');
  var customerPhoneInput = $('customerPhoneInput');
  var entrySheet = $('entrySheet');
  var entryForm = $('entryForm');
  var entryTitle = $('entryTitle');
  var entryCustomer = $('entryCustomer');
  var entryAmount = $('entryAmount');
  var entryNote = $('entryNote');
  var entryDate = $('entryDate');
  var entryMethodWrap = $('entryMethodWrap');
  var entrySave = $('entrySave');
  var toastEl = $('toast');

  var currentCustomerId = null;
  var editingCustomerId = null;
  var entryKind = 'charge';
  var payMethod = 'cash';
  var toastTimer = null;
  var deferredPrompt = null;

  // ---------- pintar ----------

  function renderHeader() {
    businessName.textContent = state.business || 'Mi negocio';
    var totals = Cuentas.totals(state.customers, state.entries);
    totalOwed.textContent = money(totals.owed);
    document.title = (state.business || 'Cuentas claras') + ' · Cuentas claras';
  }

  function customerRow(item) {
    var c = item.customer;
    var b = item.balance;
    var last = Cuentas.lastEntry(state.entries, c.id);
    var meta = last
      ? (last.kind === 'charge' ? 'Fió ' : 'Abonó ') + money(last.amount) + ' · ' + shortDate(last.date)
      : 'Sin movimientos';
    var cls = b > 0 ? 'debt' : b < 0 ? 'credit' : 'zero';
    var label = b > 0 ? money(b) : b < 0 ? 'A favor ' + money(-b) : 'Al día';

    return '<li><button type="button" class="row person" data-action="open-customer" data-id="' + c.id + '">' +
      '<span class="avatar">' + esc(initials(c.name)) + '</span>' +
      '<span class="person-main"><span class="person-name">' + esc(c.name) + '</span>' +
      '<span class="person-meta">' + esc(meta) + '</span></span>' +
      '<span class="person-balance ' + cls + '">' + esc(label) + '</span>' +
      '</button></li>';
  }

  function renderCustomers() {
    var q = (search.value || '').trim().toLowerCase();
    var list = Cuentas.sortBalances(Cuentas.balances(state.customers, state.entries));
    var visible = list.filter(function (item) {
      if (!q) return true;
      return String(item.customer.name || '').toLowerCase().indexOf(q) !== -1 ||
        String(item.customer.phone || '').toLowerCase().indexOf(q) !== -1;
    });

    customerCount.textContent = String(visible.length);
    customerList.innerHTML = visible.map(customerRow).join('');
    emptyCustomers.hidden = visible.length > 0;
    emptyCustomers.innerHTML = q
      ? 'No encontramos a nadie.<br>Prueba con otro nombre.'
      : 'Aún no tienes cuentas.<br>Toca «Nuevo» y empieza por el primero.';
    renderHeader();
  }

  function moveRow(entry, withDelete) {
    var customer = customerById(entry.customerId);
    var title = (customer ? customer.name : 'Cliente') + ' · ' + (entry.kind === 'charge' ? 'Fió' : 'Abonó');
    var meta = [entry.note, entry.kind === 'payment' ? methodLabel(entry.method) : null, timeOf(entry.createdAt)]
      .filter(Boolean).join(' · ');
    var amount = (entry.kind === 'charge' ? '' : '−') + money(entry.amount);

    return '<li class="move">' +
      '<div class="move-main"><div class="move-title">' + esc(title) + '</div>' +
      '<div class="move-meta">' + esc(meta || shortDate(entry.date)) + '</div></div>' +
      '<div class="move-amount ' + (entry.kind === 'charge' ? 'charge' : 'payment') + '">' + amount + '</div>' +
      (withDelete
        ? '<button type="button" class="entry-delete" data-action="delete-entry" data-id="' + entry.id + '" aria-label="Eliminar movimiento">✕</button>'
        : '') +
      '</li>';
  }

  function renderDay() {
    var today = todayKey();
    var d = Cuentas.day(state.entries, today);
    dayDate.textContent = longDate(today);
    dayCharges.textContent = money(d.charges);
    dayPayments.textContent = money(d.payments);
    dayCount.textContent = String(d.count);
    dayListCount.textContent = String(d.count);

    var items = d.entries.slice().sort(function (a, b) {
      return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
    });
    dayList.innerHTML = items.map(function (entry) { return moveRow(entry, false); }).join('');
    emptyDay.hidden = items.length > 0;
  }

  function renderSettings() {
    businessInput.value = state.business || '';
    phoneInput.value = state.phone || '';
    installHint.textContent = deferredPrompt ? 'Ya puedes instalarla en este teléfono.' : '';
  }

  function renderCustomer() {
    var c = customerById(currentCustomerId);
    if (!c) { currentCustomerId = null; showView('cuentas'); return; }

    var b = Cuentas.balance(state.entries, c.id);
    customerAvatar.textContent = initials(c.name);
    customerName.textContent = c.name;
    customerPhone.textContent = c.phone || 'Sin teléfono';
    customerBalanceBox.className = 'detail-balance ' + (b > 0 ? 'debt' : b < 0 ? 'credit' : '');
    customerBalanceLabel.textContent = b > 0 ? 'Debe' : b < 0 ? 'A favor' : 'Al día';
    customerBalance.textContent = money(Math.abs(b));

    var items = Cuentas.entriesFor(state.entries, c.id).slice().sort(function (a, b2) {
      return String(b2.createdAt || '').localeCompare(String(a.createdAt || ''));
    });
    entryCount.textContent = String(items.length);
    entryList.innerHTML = items.map(function (entry) { return moveRow(entry, true); }).join('');
    emptyEntries.hidden = items.length > 0;

    deleteCustomerBtn.disabled = items.length > 0;
    deleteCustomerBtn.title = items.length > 0 ? 'Elimina primero sus movimientos' : 'Eliminar cliente';
    remindBtn.disabled = b <= 0;
  }

  function renderAll() {
    renderHeader();
    renderCustomers();
    renderDay();
    renderSettings();
    if (currentCustomerId) renderCustomer();
  }

  // ---------- navegación ----------

  function showView(name) {
    viewCuentas.hidden = name !== 'cuentas';
    viewDia.hidden = name !== 'dia';
    viewAjustes.hidden = name !== 'ajustes';
    viewCustomer.hidden = name !== 'customer';

    var active = name === 'customer' ? 'cuentas' : name;
    var tabs = document.querySelectorAll('[data-tab]');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('is-active', tabs[i].getAttribute('data-tab') === active);
    }
    window.scrollTo(0, 0);
  }

  function switchTab(name) {
    currentCustomerId = null;
    showView(name);
    if (name === 'dia') renderDay();
    if (name === 'ajustes') renderSettings();
    track('tab_view', { tab: name });
  }

  function openCustomer(id) {
    currentCustomerId = id;
    renderCustomer();
    showView('customer');
    track('customer_viewed', { balance: bucket(Cuentas.balance(state.entries, id)) });
  }

  function backToCustomers() {
    currentCustomerId = null;
    showView('cuentas');
  }

  // ---------- primera vez ----------

  function openSetup() {
    setupName.value = state.business || '';
    setupPhone.value = state.phone || '';
    if (!setup.open) setup.showModal();
    setupName.focus();
  }

  function finishSetup() {
    state.business = (setupName.value || '').trim() || 'Mi negocio';
    state.phone = (setupPhone.value || '').trim();
    state.setup = true;
    saveState();
    if (setup.open) setup.close();
    renderAll();
    switchTab('cuentas');
    track('setup_done', { has_phone: !!state.phone });
  }

  // ---------- clientes ----------

  function openCustomerForm(id) {
    editingCustomerId = id || null;
    var c = id ? customerById(id) : null;
    customerFormTitle.textContent = c ? 'Editar cliente' : 'Nuevo cliente';
    customerNameInput.value = c ? c.name : '';
    customerPhoneInput.value = c ? (c.phone || '') : '';
    if (!customerSheet.open) customerSheet.showModal();
    customerNameInput.focus();
  }

  function saveCustomer(event) {
    event.preventDefault();
    var name = (customerNameInput.value || '').trim();
    var phone = (customerPhoneInput.value || '').trim();
    if (!name) { toast('Escribe el nombre.'); customerNameInput.focus(); return; }

    var wasEditing = Boolean(editingCustomerId);
    if (editingCustomerId) {
      var editing = customerById(editingCustomerId);
      if (editing) {
        editing.name = name;
        editing.phone = phone;
      }
    } else {
      state.customers.push({ id: uid(), name: name, phone: phone, createdAt: new Date().toISOString() });
    }

    saveState();
    customerForm.reset();
    if (customerSheet.open) customerSheet.close();
    editingCustomerId = null;
    renderAll();
    if (currentCustomerId) renderCustomer();
    toast('Cliente guardado.');
    track(wasEditing ? 'customer_edited' : 'customer_created', { has_phone: !!phone });
  }

  function deleteCustomer() {
    var c = customerById(currentCustomerId);
    if (!c) return;
    var entries = Cuentas.entriesFor(state.entries, c.id);
    if (entries.length) { toast('Elimina primero sus movimientos.'); return; }
    if (!confirm('¿Eliminar a ' + c.name + '?')) return;

    state.customers = state.customers.filter(function (item) { return item.id !== c.id; });
    saveState();
    currentCustomerId = null;
    showView('cuentas');
    renderAll();
    toast('Cliente eliminado.');
    track('customer_deleted');
  }

  // ---------- movimientos ----------

  function openEntry(kind) {
    var c = customerById(currentCustomerId);
    if (!c) return;
    entryKind = kind;
    payMethod = 'cash';
    var b = Cuentas.balance(state.entries, c.id);

    entryTitle.textContent = kind === 'charge' ? 'Fiar' : 'Cobrar';
    entryCustomer.textContent = 'Para ' + c.name;
    entryAmount.value = kind === 'payment' && b > 0 ? String(b) : '';
    entryNote.value = '';
    entryDate.value = todayKey();
    entryMethodWrap.hidden = kind !== 'payment';
    var pays = document.querySelectorAll('[data-pay]');
    for (var i = 0; i < pays.length; i++) {
      pays[i].classList.toggle('is-active', pays[i].getAttribute('data-pay') === 'cash');
    }
    entrySave.textContent = kind === 'charge' ? 'Guardar deuda' : 'Guardar abono';

    if (!entrySheet.open) entrySheet.showModal();
    entryAmount.focus();
  }

  function saveEntry(event) {
    event.preventDefault();
    var c = customerById(currentCustomerId);
    if (!c) return;
    var amount = num(entryAmount.value);
    if (amount <= 0) { toast('Escribe un monto.'); entryAmount.focus(); return; }

    var note = (entryNote.value || '').trim();
    var date = entryDate.value || todayKey();
    state.entries.push({
      id: uid(),
      customerId: c.id,
      kind: entryKind,
      amount: amount,
      note: note,
      date: date,
      method: entryKind === 'payment' ? payMethod : null,
      createdAt: new Date().toISOString()
    });
    saveState();
    entryForm.reset();
    if (entrySheet.open) entrySheet.close();
    renderAll();
    renderCustomer();
    toast(entryKind === 'charge' ? 'Deuda guardada.' : 'Abono guardado.');
    track(entryKind === 'charge' ? 'charge_created' : 'payment_created', {
      amount: bucket(amount),
      has_note: !!note,
      method: entryKind === 'payment' ? payMethod : null,
      customers: state.customers.length
    });
  }

  function deleteEntry(id) {
    var entry = null;
    for (var i = 0; i < state.entries.length; i++) {
      if (state.entries[i].id === id) { entry = state.entries[i]; break; }
    }
    if (!entry) return;
    if (!confirm('¿Eliminar este movimiento?')) return;

    state.entries = state.entries.filter(function (item) { return item.id !== id; });
    saveState();
    renderAll();
    renderCustomer();
    toast('Movimiento eliminado.');
    track('entry_deleted', { kind: entry.kind });
  }

  // ---------- recordatorio ----------

  function remind() {
    var c = customerById(currentCustomerId);
    if (!c) return;
    var b = Cuentas.balance(state.entries, c.id);
    if (b <= 0) { toast('No debe nada.'); return; }

    var business = state.business || 'mi negocio';
    var text = 'Hola ' + firstName(c.name) + ', te recuerdo que tienes ' + money(b) +
      ' pendiente con ' + business + '. Cuando puedas, me avisas. Gracias.';
    var phone = phoneDigits(c.phone);

    if (!phone) {
      copyText(text);
      toast('Mensaje copiado. Pégalo en WhatsApp.');
      track('reminder_copied', { amount: bucket(b) });
      return;
    }

    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    track('reminder_opened', { amount: bucket(b) });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () { /* sin permiso */ });
    }
  }

  // ---------- datos ----------

  function exportData() {
    var data = {
      v: 1,
      app: 'accounts-receivable',
      exportedAt: new Date().toISOString(),
      business: state.business,
      phone: state.phone,
      customers: state.customers.map(function (c) {
        return {
          id: c.id,
          name: c.name,
          phone: c.phone || null,
          balance: Cuentas.balance(state.entries, c.id),
          createdAt: c.createdAt || null
        };
      }),
      entries: state.entries
    };

    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'accounts-receivable-' + todayKey() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast('Archivo exportado.');
    track('export', { customers: state.customers.length, entries: state.entries.length });
  }

  function clearAll() {
    if (!confirm('Se borran todas las cuentas y movimientos de este teléfono. ¿Seguir?')) return;
    track('clear');
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem(EVENTS_KEY);
      localStorage.removeItem(ANON_KEY);
      localStorage.removeItem(VISIT_KEY);
    } catch (err) { /* nada */ }
    state = seedState();
    currentCustomerId = null;
    saveState();
    showView('cuentas');
    renderAll();
    openSetup();
  }

  // ---------- instalar ----------

  function wireInstall() {
    window.addEventListener('beforeinstallprompt', function (event) {
      event.preventDefault();
      deferredPrompt = event;
      if (installHint) installHint.textContent = 'Ya puedes instalarla en este teléfono.';
    });
    window.addEventListener('appinstalled', function () {
      deferredPrompt = null;
      if (installHint) installHint.textContent = 'Listo: quedó en tu pantalla de inicio.';
      track('install_done');
    });
    if (!installBtn) return;
    installBtn.addEventListener('click', function () {
      if (deferredPrompt) {
        track('install_prompt');
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () { deferredPrompt = null; });
        return;
      }
      var ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
      if (/iPhone|iPad|iPod/i.test(ua)) {
        installHint.textContent = 'En Safari: toca Compartir y elige «Añadir a pantalla de inicio».';
      } else if (/Android/i.test(ua)) {
        installHint.textContent = 'En Chrome: abre el menú ⋮ y elige «Añadir a pantalla de inicio».';
      } else {
        installHint.textContent = 'En Chrome: usa el icono de instalar de la barra de direcciones.';
      }
    });
  }

  // ---------- avisos ----------

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2200);
  }

  function closeSheets() {
    if (customerSheet.open) customerSheet.close();
    if (entrySheet.open) entrySheet.close();
  }

  // ---------- eventos ----------

  function handleAction(action, el) {
    switch (action) {
      case 'new-customer': openCustomerForm(null); break;
      case 'open-customer': openCustomer(el.getAttribute('data-id')); break;
      case 'charge': openEntry('charge'); break;
      case 'payment': openEntry('payment'); break;
      case 'remind': remind(); break;
      case 'edit-customer': openCustomerForm(currentCustomerId); break;
      case 'delete-customer': deleteCustomer(); break;
      case 'delete-entry': deleteEntry(el.getAttribute('data-id')); break;
      case 'back': backToCustomers(); break;
      case 'close-sheet': closeSheets(); break;
      case 'export': exportData(); break;
      case 'clear': clearAll(); break;
    }
  }

  document.addEventListener('click', function (event) {
    var tab = event.target.closest('[data-tab]');
    if (tab) { switchTab(tab.getAttribute('data-tab')); return; }

    var pay = event.target.closest('[data-pay]');
    if (pay) {
      payMethod = pay.getAttribute('data-pay');
      var pays = document.querySelectorAll('[data-pay]');
      for (var i = 0; i < pays.length; i++) pays[i].classList.toggle('is-active', pays[i] === pay);
      return;
    }

    var merez = event.target.closest('[data-merez]');
    if (merez) { track('merez_click', { customers: state.customers.length }); return; }

    var actionEl = event.target.closest('[data-action]');
    if (actionEl) handleAction(actionEl.getAttribute('data-action'), actionEl);
  });

  customerForm.addEventListener('submit', saveCustomer);
  entryForm.addEventListener('submit', saveEntry);
  search.addEventListener('input', renderCustomers);

  businessInput.addEventListener('input', function () {
    state.business = businessInput.value.trim();
    saveState();
    renderHeader();
  });

  phoneInput.addEventListener('input', function () {
    state.phone = phoneInput.value.trim();
    saveState();
  });

  setupStart.addEventListener('click', finishSetup);
  setup.addEventListener('cancel', function (event) { event.preventDefault(); });

  window.addEventListener('online', flushEvents);
  wireInstall();

  // ---------- arranque ----------

  var visits = 0;
  try { visits = Number(localStorage.getItem(VISIT_KEY) || 0); } catch (err) { visits = 0; }
  try { localStorage.setItem(VISIT_KEY, String(visits + 1)); } catch (err) { /* nada */ }

  renderAll();
  switchTab('cuentas');
  if (!state.setup) openSetup();
  track('app_open', { returning: visits > 0, customers: state.customers.length });
  flushEvents();
})();
