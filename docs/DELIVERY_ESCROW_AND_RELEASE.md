# Delivery, Escrow, and Release

## Status

- Accepted as the launch-direction document for fulfillment and seller-funds release
- Public product wording should prefer **buyer protection with delayed seller release** pending legal review
- This file keeps the legacy `escrow` term in its name for internal continuity only

## Goals

- Protect buyers from paying for items they do not receive or items materially different from the listing
- Protect sellers from silent-buyer abuse after valid handover
- Avoid over-promising platform control over Nigerian last-mile shipping when that control does not yet exist
- Preserve enough evidence to resolve disputes fairly

## Launch rationale

Research reviewed before this decision showed that:

- address standardization remains a real problem in Nigeria
- last-mile delivery is fragmented and inconsistent
- traffic, cost, and security issues make doorstep shipping unreliable
- large operators often use pickup stations, drop-off points, tracking, or verified partner networks rather than pretending arbitrary seller-arranged shipping is tightly controlled

Therefore, Emporion should **not** launch with a strong buyer-protection promise around seller-arranged shipping.

## Core launch decisions

- Launch supports **protected local pickup only**
- Seller-arranged shipping is **not** part of the protected launch flow
- Auction-linked chat may be used for **coordination**, but not as the source of truth for release proof
- Seller funds are released **after confirmed handover + 48-hour inspection window**, if no dispute is raised
- If a dispute is raised before release, funds remain held until resolution
- Public wording should be **buyer protection with delayed seller release**, not just `escrow`, until legal/compliance review says otherwise

## What this means in practice

At launch, Emporion protects transactions only when the platform can verify the key handover event itself.

That means:

- buyers can coordinate meetup details in chat
- money stays on-platform
- handover must be confirmed through a platform-controlled pickup flow
- seller funds do not release just because one side claims the meetup happened

It also means:

- we do **not** treat arbitrary courier/dropoff arrangements negotiated in chat as protected fulfillment
- we do **not** promise that Emporion can verify or safely adjudicate every doorstep delivery across Nigeria at launch

## Why chat alone is not enough

Chat is useful and should stay open for coordination.

Chat is good for:

- agreeing meetup time
- sharing landmark/location guidance
- arranging who arrives first
- clarifying pickup instructions

Chat is **not enough** for:

- proving who handed over what
- deciding when seller funds should release
- resolving disputes fairly

Therefore:

- coordination may happen in chat
- proof of handover must remain structured on-platform

## Fulfillment modes at launch

### 1. Protected local pickup

- seller offers local handover at an agreed location
- buyer and seller coordinate in chat if needed
- the transaction remains protected only if handover completes through the platform pickup confirmation flow

### 2. Not supported as protected launch flow

The following are intentionally **not** part of the protected launch model:

- seller-arranged courier shipping
- buyer-arranged rider shipping
- shipping fees negotiated after auction close
- off-platform handover that depends only on chat screenshots or verbal claims

These may become future modes only after Emporion has stronger control through approved partner networks, pickup stations, or logistics points.

## Seller funds release model

The platform should not publicly promise a regulated escrow structure unless legal review approves that wording.

At launch, the practical model is:

- buyer pays on-platform
- seller does not receive funds immediately
- funds remain held through handover confirmation and the inspection window
- release happens only after handover is confirmed and no dispute is raised within the inspection window

## Delivery state model

```text
awaiting_pickup → handover_confirmed → inspection_window → funds_released
       ↓                 ↓
failed_fulfillment    disputed
```

### State meanings

- `awaiting_pickup`: order is paid and seller/buyer must complete pickup handover
- `handover_confirmed`: platform has enough proof that the buyer physically received the item
- `inspection_window`: 48-hour period where buyer may inspect and raise a dispute
- `funds_released`: seller funds become payable per payout policy
- `failed_fulfillment`: valid handover did not happen
- `disputed`: release paused pending review

## Handover proof rules

Because launch protection depends on platform-controlled proof, a handover is confirmed only when the platform has an acceptable pickup proof event.

## Primary rule

A protected handover is confirmed only when the platform records a valid pickup confirmation event.

### Pickup handover proof

Launch rule:

- buyer receives an **in-app pickup OTP / handover code**
- seller must not receive release credit without that confirmation unless support manually intervenes with strong evidence
- buyer should only share the code once the item is physically in their possession

### Supplemental evidence

The following may support a later review, but do not replace platform pickup confirmation by default:

- chat messages about time/place
- meetup photos
- call logs or arrival confirmations
- support-collected statements from both sides

### Invalid proof

The following must never be treated as sufficient proof on their own:

- screenshots sent in chat
- verbal claim that meetup happened
- seller-only status changes without buyer-linked confirmation

## Buyer guidance

The product should tell buyers clearly:

- do not share the pickup OTP until the item is physically in your possession
- inspect the item promptly after pickup
- raise any issue within the inspection window
- do not move payment off-platform if you want platform protection

## Inspection window

Launch inspection window: **48 hours** after `handover_confirmed`

### Why 48 hours

- gives buyers enough time to inspect common low-risk items
- limits seller frustration from very long holds
- reduces silent-buyer abuse compared with 7-day release windows

### Rules

- the inspection window starts only after valid handover confirmation
- if no dispute is raised during the window, funds become releasable
- a dispute raised in time pauses release immediately

## Release rules

Funds become releasable only when all of the following are true:

- payment succeeded and remains valid
- handover is confirmed
- inspection window expired with no dispute
- no integrity/risk hold blocks payout

At launch, keep the rule simple:

- **auto-release after the 48-hour inspection window if undisputed**

## Dispute effect on release

If a dispute is raised before release:

- funds remain held
- payout is paused
- support/admin reviews the case using listing snapshot, chat, pickup proof, and any additional evidence

Typical dispute reasons that should pause release include:

- item not received
- wrong item received
- materially not as described
- major damage not disclosed in listing
- fake / counterfeit concerns where relevant

Not every complaint should automatically win; the system should pause release and move into dispute review.

## Seller obligations

Once paid:

- seller must fulfill using the protected pickup flow
- seller must meet the buyer at the agreed location/time reasonably
- seller must not request off-platform settlement or direct transfer
- seller must not pressure the buyer to share the pickup code before physical handover

If seller fails to fulfill:

- order may move to `failed_fulfillment`
- buyer should be refunded per payment/refund policy
- seller trust may be downgraded

## Buyer obligations

- complete payment within the post-win deadline
- cooperate in scheduling pickup reasonably
- do not share OTP before actual receipt
- raise disputes within the inspection window when applicable

If buyer goes silent after valid handover:

- funds still auto-release after the inspection window
- silence is not a valid reason to hold seller funds forever

## Special cases

### 1. Pickup no-show

If a pickup is scheduled but no valid pickup OTP is completed:

- funds do not release automatically
- support may review chat, timing, and behavior history if either side claims bad faith

### 2. Handover disagreement

If buyer and seller met physically but the buyer says the item was not handed over or was unacceptable before code sharing:

- no auto-release happens without the platform confirmation event
- support/admin reviews the surrounding evidence and decides next steps

### 3. Manual override

Support/admin may manually confirm, pause, or cancel fulfillment only in exceptional cases with strong evidence.

Every override must be audited with:

- actor
- timestamp
- reason
- evidence used
- resulting state transition

## Evidence requirements

The platform should preserve, at minimum:

- listing snapshot at time of sale
- selected fulfillment mode
- payment reference and timing
- pickup OTP issuance and redemption logs
- buyer receipt confirmation events
- chat transcript
- dispute submissions and attachments
- support/admin interventions

## Future upgrades after launch

The first expansion beyond protected local pickup should be one of these, not arbitrary seller-arranged shipping:

- approved partner pickup stations
- approved logistics points / drop-off points
- partner-managed shipping lanes with reliable tracking and handover events

## Open items

- exact seller handling time / pickup scheduling SLA
- exact geographic launch scope for protected pickup
- whether some categories should require safer meetup guidance or restricted pickup locations
- exact refund behavior for failed fulfillment

## Related docs

- `docs/PAYMENTS_NIGERIA.md`
- `docs/VERIFICATION_AND_TRUST_TIERS.md`
- `docs/AUCTION_RULES.md`
- `docs/PAYOUTS_AND_RESERVES.md`
- `docs/DISPUTES_AND_CHARGEBACKS.md`
