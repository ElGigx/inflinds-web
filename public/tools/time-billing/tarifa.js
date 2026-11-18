/* Cobro por tiempo — motor de tarifas.
   Funciones puras: sin DOM ni almacenamiento. Corre en el navegador y en Node. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Tarifa = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var MINUTE = 60000;
  var DAY = 1440;

  function elapsedMinutes(start, end) {
    var from = new Date(start).getTime();
    var to = end ? new Date(end).getTime() : Date.now();
    var ms = to - from;
    if (!isFinite(ms) || ms <= 0) return 0;
    return Math.ceil(ms / MINUTE);
  }

  function unitPrice(rate) {
    if (rate.mode === 'hour') {
      var fraction = rate.fraction || 60;
      return (rate.price * fraction) / 60;
    }
    return rate.price;
  }

  function hoursLabel(maxMinutes) {
    var hours = Number(maxMinutes) / 60;
    return String(Math.round(hours * 10) / 10).replace('.', ',') + ' h';
  }

  function compute(rate, start, end, options) {
    options = options || {};
    var maxMinutes = Math.max(0, Number(options.maxMinutes) || 0);
    var dayPrice = Math.max(0, Number(options.dayPrice) || 0);

    var rawMinutes = elapsedMinutes(start, end);
    var minutes = rawMinutes;
    var cappedByTime = false;
    if (maxMinutes > 0 && minutes > maxMinutes) {
      minutes = maxMinutes;
      cappedByTime = true;
    }

    var grace = rate.mode === 'block' ? 0 : (rate.grace || 0);
    var billable = Math.max(0, minutes - grace);
    var minMinutes = rate.min || 0;
    if (billable > 0 && minMinutes > 0) {
      billable = Math.max(billable, minMinutes);
    }

    var units = 0;
    var charge = 0;
    var unit = { one: '', many: '' };

    if (billable > 0) {
      if (rate.mode === 'hour') {
        var fraction = rate.fraction || 60;
        units = Math.ceil(billable / fraction);
        charge = units * unitPrice(rate);
        unit = fraction === 60
          ? { one: 'hora', many: 'horas' }
          : { one: 'fracción de ' + fraction + ' min', many: 'fracciones de ' + fraction + ' min' };
      } else if (rate.mode === 'block') {
        var block = rate.block || 15;
        units = Math.ceil(billable / block);
        charge = units * rate.price;
        unit = { one: 'bloque de ' + block + ' min', many: 'bloques de ' + block + ' min' };
      } else {
        units = Math.ceil(billable / DAY);
        charge = units * rate.price;
        unit = { one: 'día', many: 'días' };
      }
    }

    charge = Math.round(charge);

    var capLimit = 0;
    var capKind = null;
    if (rate.cap > 0) {
      capLimit = rate.cap;
      capKind = 'rate';
    }
    if (dayPrice > 0 && (capLimit === 0 || dayPrice < capLimit)) {
      capLimit = dayPrice;
      capKind = 'day';
    }

    var capped = false;
    if (capLimit > 0 && charge > capLimit) {
      charge = capLimit;
      capped = true;
    }

    return {
      minutes: minutes,
      rawMinutes: rawMinutes,
      maxMinutes: maxMinutes,
      billable: billable,
      units: units,
      unit: unit,
      charge: charge,
      capped: capped,
      cappedByTime: cappedByTime,
      capKind: capKind,
      capAmount: capLimit
    };
  }

  function describe(rate, result, money) {
    money = money || function (n) { return '$' + n; };
    if (!result || result.charge === 0) {
      if (result && rate.grace > 0 && result.minutes <= rate.grace) {
        return 'Sin cobro: dentro de la tolerancia de ' + rate.grace + ' min';
      }
      return 'Sin cobro';
    }

    var timeNote = result.cappedByTime && result.maxMinutes > 0
      ? 'máximo ' + hoursLabel(result.maxMinutes)
      : '';

    if (result.capKind === 'day') {
      return (timeNote ? 'Máximo ' + hoursLabel(result.maxMinutes) + ' · ' : '')
        + 'tarifa día ' + money(result.capAmount);
    }

    var label = result.units === 1 ? result.unit.one : result.unit.many;
    var text = result.units + ' ' + label + ' × ' + money(unitPrice(rate)) + ' = ' + money(result.charge);
    if (result.capped && result.capKind === 'rate') {
      text += ' (tope ' + money(result.capAmount) + ')';
    }
    if (timeNote) text += ' · ' + timeNote;
    return text;
  }

  return {
    elapsedMinutes: elapsedMinutes,
    unitPrice: unitPrice,
    compute: compute,
    describe: describe
  };
});
