# Nigeria Payments Strategy (Launch)

## Status
- Accepted as the launch-direction document for Nigeria-first rollout
- This supersedes the earlier assumption that bidder eligibility depends on card pre-authorization

## Why this doc exists
- Nigeria launch cannot depend on card pre-authorization flows that are not consistently available to us
- Auction trust depends on making it expensive to win and not pay, without making every bid feel like a purchase
- First-launch trust matters more than squeezing out the lowest possible checkout friction

## External constraints reviewed
- Paystack card preauthorization documentation currently describes a South Africa / ZAR flow, so it must not be a Nigeria launch dependency
- Paystack recurring charges and direct debit exist for Nigeria, but they are not a clean replacement for a universal bid hold
- Flutterwave supports NGN bank-transfer / virtual-account flows with webhook-confirmable completion
- Provider success states must still be confirmed by webhook validation and server-side verification before value is given

## Launch assumptions
- Sellers launch with open signup and low limits
- Launch starts with limited low-risk categories
- The product goal is to maximize trust and reduce gaming during the first public rollout

## Launch decision

### 1. Bid placement
- No universal pre-fund requirement for every bid at launch
- A buyer may bid only if all of the following are true:
  - email is verified
  - phone is verified
  - account is not restricted
  - at least one supported payment rail is configured
  - the buyer is within bid/value limits for their trust tier
- Repeated non-payment is treated as abuse, not as a harmless failed checkout

### 2. Winner payment model
- Default launch model: pay immediately after winning
- The winner receives a short payment deadline; initial default is **30 minutes** from auction end
- While payment is pending, the item is reserved but not marked paid or fully settled
- Supported payment rails at launch:
  - card checkout
  - dynamic NGN virtual account / bank-transfer fallback
- Cards and bank transfer are both first-class rails; the platform may tune their UI ordering later, but both must resolve through provider webhooks and verification APIs

### 3. Why this model
- Pre-funding every bid adds too much friction for early adoption
- Pure unfunded bidding is too easy to game
- Immediate post-win payment is the best launch compromise when paired with verification, limits, and enforcement
- Dynamic virtual accounts fit Nigerian payment behavior and reduce fake-alert abuse because only provider-confirmed transfers count

### 4. Not in the launch default path
- No requirement that every buyer maintain a wallet balance before bidding
- No reliance on Nigeria card preauthorization
- No acceptance of screenshots, bank SMS alerts, or chat claims as proof of payment
- No seller payout before payment verification and delivery / inspection rules are satisfied

## Payment success rules
A payment is `successful` only when:
1. the provider webhook is received and signature-verified; and
2. server-side verification confirms:
   - expected reference
   - expected amount
   - expected currency
   - expected customer / order linkage

Additional rules:
- UI may show `processing` or `awaiting_confirmation`, but never `paid` early
- Any mismatch moves the payment into review or failed state
- Exact-amount matching is mandatory for dynamic virtual-account payments

## Non-payment / default flow
If the winner does not complete payment within the deadline:
- order / payment moves to `expired` or `defaulted`
- buyer gets a non-payment strike
- buyer's bidding limits may be reduced or bidding may be suspended
- the auction resolves via next-eligible-bidder flow or seller relist flow, as defined in `docs/AUCTION_RULES.md`

Non-payment must feed trust and risk scoring. It must not be silently ignored.

## State model

### Buyer payment eligibility
```text
unverified → eligible → {restricted, suspended}
```

### Post-win payment
```text
payment_due → {processing, paid, expired, defaulted}
           processing → {paid, failed, expired}
```

**Rules:**
- Only `eligible` buyers may bid
- Winning an auction creates `payment_due`, not `paid`
- `paid` requires verified provider confirmation
- `defaulted` impacts future bidding rights

## Supported rails at launch

### Cards
Use cards for the lowest-friction checkout path when issuer authentication succeeds.

**Strengths**
- fastest happy path
- familiar checkout UX

**Risks**
- issuer step-up / authentication failures
- chargebacks and disputes
- weaker guarantee than a true hold

### Dynamic bank transfer / virtual accounts
Use dynamic NGN virtual accounts as the strong local fallback and standard alternative when card flow fails or is unavailable.

**Strengths**
- strong fit for Nigeria
- exact-amount matching
- resistant to fake screenshot / fake alert abuse when webhook-confirmed only

**Risks**
- slightly more friction
- payment can expire if not completed inside the deadline window

## Future upgrades after launch
These are valid later, but are not required for the first release:
- refundable bid bonds / deposits for high-risk or high-value categories
- direct debit for trusted repeat buyers
- stored payment-method / recurring-charge flows for trusted repeat users
- category-specific pre-funding for fraud-heavy segments

## Engineering requirements
- Use idempotency keys for every payment initiation
- Store immutable payment references linked to auction, bidder, seller, and order
- Verify all webhook signatures
- Re-verify provider charge state on webhook receipt
- Reject stale or duplicate callbacks safely
- Keep evidence needed for disputes: listing snapshot, timestamps, chat, delivery proof, payment references
- Reconcile provider settlements and the internal ledger daily

## Related docs
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/VERIFICATION_AND_TRUST_TIERS.md`
- `docs/AUCTION_RULES.md`
- `docs/DISPUTES_AND_CHARGEBACKS.md`
- `docs/PAYOUTS_AND_RESERVES.md`
