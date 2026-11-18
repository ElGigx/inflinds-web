/* Cuentas claras — modelo puro.
   Sin DOM ni almacenamiento: se puede probar en Node. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Cuentas = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function amount(value) {
    return Math.round(Number(value) || 0);
  }

  function entriesFor(entries, customerId) {
    return (entries || []).filter(function (entry) {
      return entry.customerId === customerId;
    });
  }

  function balance(entries, customerId) {
    return entriesFor(entries, customerId).reduce(function (sum, entry) {
      return sum + (entry.kind === 'charge' ? amount(entry.amount) : -amount(entry.amount));
    }, 0);
  }

  function balances(customers, entries) {
    return (customers || []).map(function (customer) {
      return { customer: customer, balance: balance(entries, customer.id) };
    });
  }

  function totals(customers, entries) {
    var list = balances(customers, entries);
    var owed = 0;
    var credit = 0;
    var debtors = 0;

    list.forEach(function (item) {
      if (item.balance > 0) {
        owed += item.balance;
        debtors += 1;
      } else if (item.balance < 0) {
        credit += -item.balance;
      }
    });

    return {
      owed: owed,
      credit: credit,
      net: owed - credit,
      debtors: debtors,
      customers: list.length
    };
  }

  function day(entries, date) {
    var list = (entries || []).filter(function (entry) {
      return entry.date === date;
    });
    var charges = 0;
    var payments = 0;

    list.forEach(function (entry) {
      if (entry.kind === 'charge') charges += amount(entry.amount);
      else payments += amount(entry.amount);
    });

    return {
      date: date,
      entries: list,
      charges: charges,
      payments: payments,
      net: charges - payments,
      count: list.length
    };
  }

  function lastEntry(entries, customerId) {
    var list = entriesFor(entries, customerId);
    if (!list.length) return null;

    return list.slice().sort(function (a, b) {
      var da = String(a.createdAt || a.date || '');
      var db = String(b.createdAt || b.date || '');
      return da < db ? -1 : da > db ? 1 : 0;
    })[list.length - 1];
  }

  function sortBalances(list) {
    return list.slice().sort(function (a, b) {
      var aRank = a.balance > 0 ? 0 : a.balance === 0 ? 1 : 2;
      var bRank = b.balance > 0 ? 0 : b.balance === 0 ? 1 : 2;
      if (aRank !== bRank) return aRank - bRank;
      if (aRank === 0) return b.balance - a.balance;
      if (aRank === 2) return a.balance - b.balance;
      return String(a.customer.name || '').localeCompare(String(b.customer.name || ''), 'es');
    });
  }

  return {
    amount: amount,
    entriesFor: entriesFor,
    balance: balance,
    balances: balances,
    totals: totals,
    day: day,
    lastEntry: lastEntry,
    sortBalances: sortBalances
  };
});
