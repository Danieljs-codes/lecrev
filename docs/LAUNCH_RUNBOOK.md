# Launch Runbook

## Status

- Accepted as the launch-direction runbook for first public release
- Complements all core launch policy docs, especially `PAYMENTS_NIGERIA.md`, `DELIVERY_ESCROW_AND_RELEASE.md`, `DISPUTES_AND_CHARGEBACKS.md`, and `TRUST_AND_SAFETY.md`

## Purpose

This runbook defines how Emporion should launch operationally, not just technically.

It covers:

- who gets access
- what inventory is present on day 1
- what support/risk coverage exists
- what metrics decide whether launch is healthy
- what kill switches exist if launch quality drops

## Launch choices already made

- **Rollout mode:** soft-open to the full waitlist
- **Geographic scope:** nationwide access in Nigeria
- **Support coverage:** extended hours, 7 days
- **Day-1 supply strategy:** pre-seed reviewed sellers + open signup with low limits
- **Protected fulfillment:** local pickup only
- **Categories:** moderate set with stricter review for riskier items

## Important launch risk note

Among the rollout options discussed, **soft-open to the full waitlist is the highest-risk choice**.

Because launch also uses:

- protected local pickup only
- nationwide access
- open seller signup with low limits

Emporion must compensate with:

- stronger real-time monitoring
- visible kill switches
- extended support/risk coverage
- disciplined suspension of risky flows when metrics worsen

## Launch assumptions

- buyers can sign up nationwide
- sellers can sign up nationwide, but remain subject to trust-tier and listing-policy controls
- protected transactions only use the protected local pickup flow
- support and trust/risk teams are active throughout launch week
- pre-seeded reviewed inventory is available before public traffic arrives

## Launch objectives

### Primary objectives

- first users should see real supply quickly
- first transactions should feel safe and understandable
- fraud losses should be contained before they scale
- payout safety should be preserved

### Non-goals for launch week

- maximum growth at any cost
- instant payout speed at the expense of fraud control
- broad category expansion before core metrics are healthy

## Launch mode

### User access

Launch is a soft-open to the full waitlist.

This means:

- all waitlist users may be granted access
- launch quality is protected through product/risk controls rather than invite waves

### Seller supply

Day-1 supply should be seeded with:

- reviewed sellers already prepared before launch
- open seller signup still allowed, but under low limits and listing review rules

## Nationwide scope handling

Emporion is software, but protected pickup still creates operational obligations.

Therefore nationwide launch should mean:

- accounts can access the product nationwide
- listings can be created nationwide where policy allows
- support must be ready for regionally uneven pickup quality and support burden
- regional or category-level restrictions must remain available as operational kill switches

## Launch week staffing expectations

### Support coverage

Target:

- extended hours
- 7 days

### Required operating functions

At minimum, launch week must have active coverage for:

- customer support
- trust and safety / risk review
- dispute operations
- payout operations / finance review
- engineering on-call

## Pre-launch checklist

Before launch opens publicly, confirm all of the following:

### Product and policy readiness

- payment flows working end-to-end
- protected pickup flow working end-to-end
- dispute filing flow available
- payout hold controls available
- chat masking/reporting/warning flows active
- listing review workflow active
- trust/safety freeze tools active

### Inventory readiness

- pre-seeded reviewed sellers are live
- launch categories are configured correctly
- excluded categories are blocked
- reviewed category rules are active

### Operational readiness

- support macros/playbooks prepared
- dispute queue staffed
- payout hold review staffed
- trust/safety review queue staffed
- launch incident channel active
- escalation tree published internally

### Monitoring readiness

- key metrics visible in one place
- alerting configured for severe spikes
- kill-switch ownership assigned

## Day-0 / launch-day flow

### T-2 hours

- verify monitoring dashboards
- confirm support/risk presence
- confirm reviewed listings are visible
- verify no critical payout or payment incidents are open

### T-0

- open access to the waitlist
- publish launch messaging explaining:
  - protected local pickup only
  - buyer protection with delayed seller release
  - no off-platform payment protection
  - support/reporting availability

### First 6 hours

Watch especially for:

- signup bottlenecks
- payment setup failures
- listing rejection spikes
- off-platform steering flags
- non-payment spikes
- pickup flow confusion

### First 24 hours

Run repeated reviews for:

- fraud/risk queues
- disputes
- payout holds
- seller inventory quality
- support backlog

## Metrics to monitor closely

### Marketplace health

- active sellers
- reviewed sellers live
- approved listings vs rejected/needs-changes
- listing report rate

### Buyer funnel

- signup completion
- phone/email verification completion
- payment-method setup completion
- bid eligibility conversion

### Auction and payment quality

- bids placed per active buyer
- win-to-payment conversion
- winner non-payment rate
- payment verification mismatch rate

### Pickup and support quality

- handover confirmation completion rate
- disputes filed within 48h window
- support first-response time
- moderation first-response time

### Risk quality

- linked-account auction freeze rate
- off-platform steering warning rate
- account restriction/suspension rate
- shared payout-account review rate

### Financial quality

- held vs available seller balances
- payout failure rate
- post-payout recovery cases
- chargeback count

## Launch review cadence

### During first 24 hours

- hourly review of critical metrics and incidents

### Days 2–7

- morning and evening review cadence at minimum
- immediate ad hoc review when alert thresholds are crossed

## Launch success signals

Early launch is trending healthy if:

- real listings are available and buyers can understand the rules
- win-to-payment conversion is stable
- winner non-payment stays manageable
- support queue remains within SLA
- dispute rate remains narrow and evidence-backed
- payout holds stay selective rather than exploding broadly

## Warning signals

Launch quality is degrading if any of the following occur:

- sharp spike in unpaid wins
- large increase in linked-account auction freezes
- widespread listing-quality failures
- support or moderation SLA collapse
- off-platform steering becomes common
- payout hold volume rises so fast that many honest sellers are blocked
- dispute queue grows faster than decisions can be made

## Kill switches and containment actions

Emporion must have fast, explicit containment actions.

### Level 1 — narrow containment

Use when a single area is degrading.
Possible actions:

- pause new listings in a category
- require manual review for a wider class of listings
- tighten payout holds for affected sellers/accounts
- disable contact reveal temporarily
- widen trust/risk monitoring on affected accounts

### Level 2 — marketplace containment

Use when abuse is broader but not yet existential.
Possible actions:

- pause new seller publishing
- suspend new bidding for recently created buyers
- raise verification requirements temporarily
- reduce category scope
- freeze suspicious auctions more aggressively

### Level 3 — emergency containment

Use when trust or money safety is at risk.
Possible actions:

- pause all new auctions
- pause all new bids
- pause payout batches
- force marketplace into limited/safe mode while investigation happens

## Support and risk routing

### Support owns first-line handling for

- user confusion
- pickup coordination questions
- simple policy explanation
- basic report intake

### Trust and safety owns

- linked-account review
- off-platform steering enforcement
- suspicious listing/account review
- repeated non-payment abuse

### Dispute operations owns

- protected transaction disputes
- evidence review
- refund/partial refund decisions

### Finance/payout operations owns

- payout holds
- payout failures
- recovery and negative-balance cases

## Launch communication principles

User-facing communication during launch should emphasize:

- pickup is protected only through the platform flow
- do not pay outside Emporion
- do not share pickup OTP before handover
- report scams or threats quickly
- seller payout is delayed to protect both sides fairly

## Internal launch review questions

At the end of each day in launch week, ask:

- Are first impressions still strong enough to justify continuing at current exposure?
- Are we seeing more genuine commerce than abuse?
- Are support/risk teams staying ahead of the queues?
- Are payouts still safe to continue on the current cadence?
- Do any categories or regions need temporary restriction?

## End-of-week decision gate

At the end of launch week, leadership should decide whether to:

- continue as-is
- tighten risk controls
- narrow category/scope temporarily
- move toward a more phased rollout even if the initial launch was broad

## Open items

- exact numeric thresholds for alerting and kill-switch activation
- exact internal staffing roster and escalation ownership
- exact user-facing launch messaging copy
- whether any region/category needs special launch-day restrictions despite nationwide access

## Related docs

- `docs/PAYMENTS_NIGERIA.md`
- `docs/VERIFICATION_AND_TRUST_TIERS.md`
- `docs/AUCTION_RULES.md`
- `docs/DELIVERY_ESCROW_AND_RELEASE.md`
- `docs/DISPUTES_AND_CHARGEBACKS.md`
- `docs/PAYOUTS_AND_RESERVES.md`
- `docs/TRUST_AND_SAFETY.md`
- `docs/CHAT_SAFETY_AND_MODERATION.md`
- `docs/LISTING_POLICY.md`
