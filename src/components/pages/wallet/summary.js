// PaymentTypes enum
const PaymentTypes = {
  BOOKING: 0,
  WITHDRAWAL: 1,
  REFUND: 2,
};

/** Convert string/number to finite number */
function toNumber(v) {
  if (v === undefined || v === null) return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const cleaned = String(v).replace(/,/g, "").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

/** Default: compute net = amount - (serviceFee + vat + cautionFee) + sojournCredits */
function defaultNetForPayment(p) {
  const gross = toNumber(p.amount);
  const serviceFee = toNumber(p.serviceFee);
  const vat = toNumber(p.vat);
  const cautionFee = toNumber(p.cautionFee);
  const sojournCredits = toNumber(p.sojournCreditsAmount);
  return gross - (serviceFee + vat + cautionFee) + sojournCredits;
}

/** Pick a date to classify month */
function defaultPaymentDate(p) {
  if (p?.booking?.checkOut) return new Date(p.booking.checkOut);
  if (p?.booking?.checkIn) return new Date(p.booking.checkIn);
  if (p?.date) return new Date(p.date);
  if (p?.createdAt) return new Date(p.createdAt);
  return null;
}

/** Month key like "YYYY-MM" */
function monthKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Main function
 * @param {Array} payments - payments array
 * @param {Object} opts - optional overrides:
 *    { confirmedStatuses: Set<string>, netForPayment: fn, paymentDate: fn, now: Date }
 */
export function computePaymentSummary(payments = [], opts = {}) {
  const {
    confirmedStatuses = new Set(["confirmed", "paid", "completed", "settled"]),
    netForPayment = defaultNetForPayment,
    paymentDate = defaultPaymentDate,
    now = new Date(),
  } = opts;

  const thisMonthKey = monthKey(now);
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthKey = monthKey(prev);

  let totalEarnings = 0;
  let thisMonthEarnings = 0;
  let lastMonthEarnings = 0;

  let totalWithdrawals = 0;
  let thisMonthWithdrawals = 0;
  let lastMonthWithdrawals = 0;

  let pendingTotal = 0;

  for (const p of Array.isArray(payments) ? payments : []) {
    const status = (p?.paymentStatus || "").toString().toLowerCase();
    const type = Number(p?.paymentType);
    const net = toNumber(netForPayment(p));

    // pending (any type)
    if (status === "pending") pendingTotal += net;

    // earnings: bookings with confirmed status
    if (type === PaymentTypes.BOOKING && confirmedStatuses.has(status)) {
      totalEarnings += net;
      const dt = paymentDate(p);
      if (dt && !isNaN(dt.getTime())) {
        const key = monthKey(dt);
        if (key === thisMonthKey) thisMonthEarnings += net;
        if (key === lastMonthKey) lastMonthEarnings += net;
      }
    }

    // withdrawals: withdrawal payments with confirmed status
    if (type === PaymentTypes.WITHDRAWAL && confirmedStatuses.has(status)) {
      totalWithdrawals += net;
      const dt = paymentDate(p);
      if (dt && !isNaN(dt.getTime())) {
        const key = monthKey(dt);
        if (key === thisMonthKey) thisMonthWithdrawals += net;
        if (key === lastMonthKey) lastMonthWithdrawals += net;
      }
    }
  }

  function pctIncrease(thisMonth, lastMonth) {
    if (lastMonth === 0) {
      return thisMonth === 0 ? 0 : 100;
    }
    return ((thisMonth - lastMonth) / Math.abs(lastMonth)) * 100;
  }

  return {
    totalEarnings,
    earningsPctIncrease: Number(
      pctIncrease(thisMonthEarnings, lastMonthEarnings).toFixed(2)
    ),
    totalWithdrawals,
    withdrawalsPctIncrease: Number(
      pctIncrease(thisMonthWithdrawals, lastMonthWithdrawals).toFixed(2)
    ),
    pendingTotal,
    // extras if you want to display them
    thisMonthEarnings,
    lastMonthEarnings,
    thisMonthWithdrawals,
    lastMonthWithdrawals,
  };
}
