# Payouts and Reserves

## Status

- Accepted as the launch-direction document for seller payout handling
- Complements `docs/DELIVERY_ESCROW_AND_RELEASE.md`, `docs/VERIFICATION_AND_TRUST_TIERS.md`, and `docs/DISPUTES_AND_CHARGEBACKS.md`

## Goals

- Pay honest sellers predictably and without unnecessary launch friction
- Keep enough control to stop payout fraud, account takeover, and post-sale loss propagation
- Make seller balances easy to understand
- Avoid platform-wide reserve policies that punish good sellers by default

## Core launch decisions

- **No extra payout delay for new sellers** once funds become eligible for release
- **No global rolling reserve** for all sellers at launch
- Use **selective holds only** for risky/problem cases
- Eligible funds are paid out via **daily batch payouts**
- If a seller changes payout account details, Emporion must **re-verify and freeze payouts for 72 hours**
- If Emporion later takes a loss on a seller-related case, Emporion should **offset future payouts and hold the account if needed**
- Seller balance UI should show **pending, held, available, and payout history**

## High-level model

There are three distinct ideas that must not be confused:

### 1. Release eligibility

This is decided by the protected transaction flow.
Funds become releasable only after:

- payment succeeded
- protected pickup handover was confirmed
- 48-hour inspection window passed undisputed
- no payout-blocking hold exists

### 2. Payout availability

Once funds are releasable, they become `available` unless a selective hold applies.

### 3. Payout execution

Available funds are disbursed in the next daily payout batch.

## What `no extra delay for new sellers` means

At launch, a brand-new seller does **not** automatically wait an extra 3 or 7 days after the inspection window.

If the order clears normally:

- funds move to `available`
- they are paid in the next daily payout batch

This keeps seller UX strong at launch.

### Important nuance

`No extra delay` does **not** mean `no control`.
The platform may still apply selective holds for:

- disputes
- chargebacks
- payout-account changes
- verification concerns
- suspicious or abusive patterns

## Reserve policy

At launch, Emporion uses:

- **no global reserve; selective holds only**

### What this means

- Emporion does **not** hold back a percentage from every seller by default
- Emporion does **not** create a universal rolling reserve across the marketplace
- Emporion may hold some or all otherwise payable funds only when case-specific risk justifies it

### Why this approach

- better seller trust at launch
- simpler seller messaging
- avoids punishing honest low-risk sellers
- still gives the platform room to contain risk when there are warning signs

## Selective hold triggers

Funds that would otherwise become `available` may be moved to or kept in `held` when any of the following occurs:

- active in-app dispute
- active provider-side chargeback or refund risk event
- payout account changed within the last 72 hours
- payout name mismatch or re-verification failure
- seller is under manual risk review
- linked-account, fraud, or integrity concerns
- negative balance recovery is in progress
- law/compliance/support intervention requires a pause

### Hold scope

Depending on severity, the platform may hold:

- a specific order's funds only
- the seller's currently available balance
- all future payouts until review is complete

## Payout cadence

Launch payout cadence: **daily batch payouts**

### Why daily batches

- predictable for sellers
- safer operationally than instant payouts
- easier to reconcile against provider balances and the internal ledger
- gives support/risk a short but useful intervention window before funds leave the system

### Rules

- only `available` funds enter the payout batch
- `held` funds do not enter the payout batch
- failed payouts return funds to `held` or `available` depending on the failure reason and risk status

## Payout account requirements

Before a seller can receive payouts:

- payout account must be resolved
- payout name match rules from `docs/VERIFICATION_AND_TRUST_TIERS.md` must pass
- seller must not be suspended or blocked from payout

## Payout account change policy

If a seller changes payout account details:

- re-verify the new account
- freeze payouts for **72 hours**
- if verification or name match is weak, escalate to manual review

### Why

This is one of the most important anti-account-takeover controls.
A compromised account should not be able to swap payout details and cash out immediately.

## Seller balance model

Seller balance UI should show at least:

- `pending`
- `held`
- `available`
- `payout history`

### Definitions

#### Pending

Money linked to paid orders that has **not** yet cleared the protected fulfillment/release flow.
Examples:

- waiting for pickup handover
- inside the 48-hour inspection window

#### Held

Money that is not currently payable because of a hold.
Examples:

- dispute open
- chargeback under review
- payout account recently changed
- manual risk hold

#### Available

Money eligible for the next payout batch.

#### Payout history

A record of completed, failed, reversed, or adjusted payouts.

### Why this UI matters

Sellers should understand:

- what money is still in progress
- what money is blocked and why
- what money will actually be paid next

A single opaque `balance` number is not enough.

## Payout state model

```text
pending → {held, available}
held → {available, recovered, reversed}
available → {paid_out, held}
paid_out → {adjusted}
```

### Notes

- `pending` is normal transaction progression, not a punishment
- `held` is a control state, not necessarily a final loss
- `adjusted` covers later reconciliations, reversals, or recovery offsets

## Negative balance and loss recovery

If Emporion later loses money on a seller-related case:

- offset future payouts first
- hold the seller account if needed

### Typical causes

- provider chargeback loss
- refund decision against seller after payout already happened
- fraud or collusion loss tied to seller activity
- recovery of overpaid or duplicate payouts

### Recovery rules

- future available funds are applied to the negative balance before new payout occurs
- seller may be restricted from listing or payout while recovery is unresolved
- support/risk should be able to widen the hold scope if abuse is suspected

## Failed payout handling

If a payout attempt fails:

- mark the payout attempt clearly in payout history
- return funds to `held` if the failure suggests account/risk problems
- return funds to `available` only if the failure is clearly transient and the account remains trusted
- notify the seller with the next required action

## Relationship to disputes and chargebacks

### If an in-app dispute opens before payout

- funds remain `held`
- no payout happens until resolution

### If a chargeback appears after payout

- account moves into recovery review
- sensitive actions may already be frozen under `docs/DISPUTES_AND_CHARGEBACKS.md`
- future payouts are used for offset where needed

## Operational controls

Support/risk/admin should be able to:

- place a payout hold
- release a payout hold
- change hold scope
- annotate the reason for the hold
- review payout account changes
- inspect payout history and adjustment history

Every manual action must be audited with:

- actor
- timestamp
- reason
- related order/account identifiers

## Seller communication rules

Payout messaging should be explicit.

Examples of good seller-facing status messages:

- `Pending: waiting for protected pickup completion`
- `Pending: inspection window ends in 18 hours`
- `Held: dispute under review`
- `Held: payout account changed, payouts resume after re-verification window`
- `Available: included in next payout batch`

Avoid vague messages like:

- `processing`
- `temporarily unavailable`
  without explanation

## Ledger and reconciliation requirements

The internal ledger remains the source of truth for financial state.

Required properties:

- order-level linkage between buyer payment, seller payable amount, fees, refunds, and adjustments
- payout batch records linked to payout transactions
- recovery offsets recorded as explicit adjustments, not silent arithmetic
- daily reconciliation between provider settlement data and Emporion ledger entries

## Open items

- exact threshold/rule set for selective holds beyond the launch baseline
- exact seller fee treatment in partial-refund and post-payout recovery cases
- exact seller-facing wording for recovery and adjustment events

## Related docs

- `docs/PAYMENTS_NIGERIA.md`
- `docs/VERIFICATION_AND_TRUST_TIERS.md`
- `docs/DELIVERY_ESCROW_AND_RELEASE.md`
- `docs/DISPUTES_AND_CHARGEBACKS.md`
- `docs/IMPLEMENTATION_PLAN.md`
