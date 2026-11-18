const assert = require('assert');
const C = require('../public/tools/accounts-receivable/cuentas.js');

const customers = [
  { id: 'a', name: 'Doña Rosa' },
  { id: 'b', name: 'Carlos' },
  { id: 'c', name: 'Marta' },
  { id: 'd', name: 'El Flaco' }
];

let n = 0;
function entry(customerId, kind, amount, date, note) {
  n += 1;
  return {
    id: 'e' + n,
    customerId,
    kind,
    amount,
    date,
    note: note || '',
    createdAt: '2026-11-17T15:0' + (n % 10) + ':00.000Z'
  };
}

const entries = [
  entry('a', 'charge', 45000, '2026-11-17', 'Mercado'),
  entry('a', 'payment', 10000, '2026-11-17', 'Abono'),
  entry('b', 'charge', 18000, '2026-11-16', 'Cuadernos'),
  entry('c', 'charge', 10000, '2026-11-15', 'Almuerzo'),
  entry('c', 'payment', 10000, '2026-11-16', 'Pago completo'),
  entry('d', 'payment', 5000, '2026-11-14', 'Quedó a favor')
];

assert.strictEqual(C.balance(entries, 'a'), 35000, 'Doña Rosa debe 35.000');
assert.strictEqual(C.balance(entries, 'b'), 18000, 'Carlos debe 18.000');
assert.strictEqual(C.balance(entries, 'c'), 0, 'Marta está al día');
assert.strictEqual(C.balance(entries, 'd'), -5000, 'El Flaco tiene 5.000 a favor');

const totals = C.totals(customers, entries);
assert.deepStrictEqual(
  { owed: totals.owed, credit: totals.credit, net: totals.net, debtors: totals.debtors, customers: totals.customers },
  { owed: 53000, credit: 5000, net: 48000, debtors: 2, customers: 4 }
);

const today = C.day(entries, '2026-11-17');
assert.deepStrictEqual(
  { charges: today.charges, payments: today.payments, count: today.count },
  { charges: 45000, payments: 10000, count: 2 }
);

const sorted = C.sortBalances(C.balances(customers, entries)).map((item) => item.customer.name);
assert.deepStrictEqual(sorted, ['Doña Rosa', 'Carlos', 'Marta', 'El Flaco']);

const last = C.lastEntry(entries, 'a');
assert.strictEqual(last.kind, 'payment');
assert.strictEqual(C.lastEntry(entries, 'b').kind, 'charge');
assert.strictEqual(C.lastEntry(entries, 'zzz'), null);

// Un abono mayor deja saldo a favor y no se pierde.
const creditEntry = entry('b', 'payment', 30000, '2026-11-17');
assert.strictEqual(C.balance(entries.concat(creditEntry), 'b'), -12000);

// Los montos se redondean al peso.
assert.strictEqual(C.amount('1234.6'), 1235);
assert.strictEqual(C.amount(null), 0);

console.log('cuentas.test.js: 8/8 OK');
