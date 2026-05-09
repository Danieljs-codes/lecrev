# Disputes and Chargebacks

## Status

- Accepted as the launch-direction document for dispute and chargeback handling
- Complements `docs/DELIVERY_ESCROW_AND_RELEASE.md` and `docs/PAYMENTS_NIGERIA.md`

## Goals

- Resolve genuine buyer/seller issues quickly enough to preserve trust at launch
- Keep dispute coverage narrow enough to be defensible and hard to game
- Respond fast enough to avoid losing provider-side disputes by default
- Preserve clear evidence for every protected transaction

## Operational constraints reviewed

Provider timelines are short enough that dispute operations cannot be informal.

Examples from provider docs reviewed:

- Paystack dispute guidance indicates unresolved disputes may be auto-accepted on the merchant's behalf after a short response window
- Flutterwave chargeback documentation shows merchants can lose if they do not respond before the due date, with examples using a 48-hour response horizon

Therefore:

- launch must have explicit SLAs
- evidence must already exist before a dispute starts
- support cannot rely on ad hoc back-and-forth only

## Core launch decisions

- Launch dispute coverage is **narrow and structured**
- Buyers are expected to **inspect visible condition before sharing the pickup OTP**
- After OTP handover, launch disputes are limited to **hidden/material issues**, not issues that were plainly inspectable at pickup
- Support may issue **full refunds or partial refunds**
- When the buyer prevails, the item should be **returned when practical**; support decides custody/return steps case-by-case
- If a user files a payment-provider chargeback instead of using Emporion's dispute flow, Emporion should **freeze sensitive actions pending review**
- Operations target: **acknowledge within 12 hours, initial decision target within 48 hours**

## Definitions

### Protected dispute

A dispute raised about a transaction that stayed within Emporion's protected flow:

- payment completed on-platform
- protected local pickup used
- handover confirmed by platform proof

### Failed fulfillment

A case where valid handover never completed.
This is not the same as a post-handover dispute.
Examples:

- seller no-show
- buyer no-show
- no OTP handover completed

### Chargeback

A payment dispute initiated with the payment provider or issuing bank instead of through Emporion support.

## Launch dispute scope

Emporion should cover only the following at launch:

- item not received
- wrong item received
- materially not as described
- undisclosed major defect
- counterfeit / authenticity issue where relevant

## Not covered at launch

The following should usually be outside launch protection:

- buyer remorse / changed mind
- subjective dissatisfaction not tied to the listing promise
- issues that were clearly visible and reasonably inspectable before pickup OTP was shared
- minor cosmetic wear already disclosed or obvious at pickup
- disputes arising from off-platform payment or off-platform fulfillment arrangements

## Pickup inspection rule

Because launch protection is limited to local pickup, the buyer has a meaningful chance to inspect before handover is finalized.

### Rule

Before sharing the pickup OTP, the buyer is expected to inspect:

- visible condition
- obvious item mismatch
- obvious missing included parts that can be checked at pickup

After OTP handover, disputes should generally be limited to:

- hidden defects
- material misrepresentation not reasonably discoverable at pickup
- authenticity concerns
- major functional issues that could not reasonably be verified on the spot

This rule reduces abuse while preserving real buyer protection.

## Dispute filing window

Launch dispute window: **48 hours after handover confirmation**

### Rule

- disputes must be filed inside the inspection window
- filing inside the window immediately pauses funds release
- filing outside the window should normally be rejected unless support finds an exceptional platform or fraud reason to review it anyway

## Filing requirements

A buyer filing a dispute should provide:

- dispute reason
- short description of the problem
- what was expected versus what was received
- photo/video evidence where relevant
- any immediate pickup context that matters

The platform should automatically attach:

- listing snapshot
- payment record
- pickup OTP logs
- chat transcript
- account and trust context needed for review

## Seller response requirements

When a dispute is opened:

- seller should be notified immediately
- seller should provide their response and evidence quickly
- support should not wait indefinitely for seller input before acting

If a seller does not respond in time:

- support may decide based on available evidence
- payout remains paused until the case is resolved

## Evidence model

The dispute system should favor **platform-generated evidence first**, then user-submitted evidence.

### Platform-generated evidence

- listing snapshot at sale time
- payment initiation and verification data
- pickup OTP issuance and redemption logs
- chat transcript
- timestamps of key events
- seller/buyer trust and restriction history where relevant

### User-submitted evidence

- photos
- videos
- receipts or authenticity proof
- statements explaining the issue

### Evidence rules

- screenshots of chat alone are weak evidence when the platform already has the underlying chat log
- unsupported verbal claims are weak evidence
- evidence quality and timing matter; late or edited evidence may carry less weight

## Resolution outcomes

Launch support may issue the following outcomes:

### 1. Dispute rejected

Use when evidence supports the seller or the issue is outside covered launch scope.

### 2. Full refund

Use when the buyer should be made whole.
Examples:

- wrong item
- counterfeit item
- major undisclosed defect rendering the item materially different or unusable
- no valid value delivered

### 3. Partial refund

Use when the buyer received some value, but not full promised value.
Examples:

- missing included accessory of meaningful value
- material but not total mismatch
- defect that reduces value substantially without destroying the transaction entirely

## Return and item custody policy

Launch rule:

- **return when practical; support directs case-by-case**

This means:

- Emporion does not promise a universal automated return flow at launch
- support can require return, supervised re-handover, or another practical custody step when the facts justify it
- support should avoid refunding while the buyer simply keeps the item in cases where return is practical and fair

### Why this matters

A blanket `buyer keeps item and gets refund` rule is too easy to abuse.
A blanket `refund only after verified return` rule is too rigid for every launch case.
Case-by-case direction is the safest launch compromise.

## Release and payout effect

When a protected dispute is filed on time:

- funds remain held
- seller payout is paused
- the order moves into dispute review

When the dispute is resolved:

- release, refund, or partial refund follows the resolution outcome
- seller/buyer trust actions may also be applied

## Chargeback policy

If a user files a provider-side chargeback instead of using Emporion's dispute flow:

- freeze sensitive actions pending review

### Sensitive actions to freeze

At minimum:

- new bidding
- new listing creation
- payout initiation
- withdrawal / release-sensitive actions

### Why

A direct chargeback is high-risk behavior for a launch marketplace because it can bypass platform evidence and recovery flows.
Freezing sensitive actions protects the marketplace while the case is investigated.

### Important nuance

This is not necessarily a permanent ban.
If review shows the user acted reasonably, restrictions can be reduced or removed.

## Support SLA

Launch operational targets:

- **acknowledge within 12 hours**
- **initial decision target within 48 hours**

### What `initial decision` means

An initial decision may be:

- buyer-leaning
- seller-leaning
- request for specific additional evidence
- temporary hold pending a required return/custody step

The key is that support acts quickly enough to keep provider timelines and user expectations under control.

## State model

```text
dispute_none → dispute_open → {evidence_requested, under_review}
under_review → {resolved_buyer, resolved_seller, resolved_partial}
under_review → escalated
```

### Notes

- `escalated` should be rare at launch and used for high-value, ambiguous, or high-risk cases
- final resolution must always be auditable

## Trust and account consequences

Disputes are not only order-level events; they also feed trust systems.

### Buyer-side consequences may include

- no penalty for good-faith valid disputes
- restrictions for abusive repeat disputes
- stronger verification requirements after suspicious patterns

### Seller-side consequences may include

- manual review
- listing limits reduced
- payout holds widened
- suspension for repeated valid complaints or fraud signals

### Chargeback-specific consequences

- immediate freeze of sensitive actions
- elevated review priority
- stronger trust downgrade if abuse is confirmed

## Internal review principles

Support should use the narrowest fair rule that fits the facts.

Principles:

- prefer objective platform evidence
- respect the pickup inspection rule
- do not reward off-platform deviation from the protected flow
- do not force false certainty when evidence is weak; pause and escalate if needed
- be explicit about what is still true, what is paused, and what the next step is

## Appeals

Launch should allow a lightweight internal appeal path, but not unlimited re-litigation.

Recommended launch baseline:

- one appeal per case
- appeal must provide new evidence or identify a clear review error

## Evidence retention

Dispute-relevant evidence should be retained long enough to support:

- in-app disputes
- provider chargebacks
- fraud reviews
- account appeals
- ledger / reconciliation audits

## Open items

- exact category-specific evidence checklist
- exact appeal time window
- exact thresholds for escalation beyond frontline support

## Related docs

- `docs/PAYMENTS_NIGERIA.md`
- `docs/VERIFICATION_AND_TRUST_TIERS.md`
- `docs/AUCTION_RULES.md`
- `docs/DELIVERY_ESCROW_AND_RELEASE.md`
- `docs/PAYOUTS_AND_RESERVES.md`
