# Verification and Trust Tiers

## Status
- Accepted as the launch-direction document for Nigeria-first rollout
- Complements `docs/PAYMENTS_NIGERIA.md`
- Defines who can do what before stronger verification is required

## Goals
- Keep signup friction low enough for launch conversion
- Make bidding and selling expensive to abuse
- Step up verification before risk or transaction value increases
- Allow both individual and business sellers at launch
- Give operations clear levers for restriction, review, and escalation

## Core launch decisions
- Buyers must have **email + phone + at least one payment method** before placing their first bid
- Sellers must have **email + phone + payout bank match** before publishing low-limit listings
- **Manual review is not universal** at launch; it is required when a seller crosses a review threshold or trips risk signals
- **Individuals are allowed** to sell at launch
- Stronger identity verification such as **BVN / NIN or equivalent provider-supported checks** is required when users hit higher bid or listing limits, or when risk signals justify step-up

## Principles
1. **Light first, stricter before exposure increases**
   - Browsing should stay easy
   - Money-moving actions must be harder to abuse
2. **Buyer and seller trust are separate**
   - A user may be bid-enabled but not seller-enabled
3. **Trust is reversible**
   - Limits can be raised with successful history
   - Limits can be reduced immediately when risk rises
4. **Manual review is threshold-based and risk-based**
   - It should protect launch trust, not become a bottleneck for every user
5. **Verification evidence should be durable**
   - Every important trust decision must be auditable later during disputes, abuse review, or appeals

## Verification artifacts
These are the building blocks used to compute user trust tiers.

- `email_verified`
- `phone_verified`
- `payment_method_configured`
- `payout_account_resolved`
- `payout_name_match`
- `enhanced_identity_verified`
  - BVN / NIN or equivalent provider-supported check
- `manual_review_passed`
- `business_verified`
  - CAC or equivalent business verification
- `risk_restricted`
- `suspended`

## Buyer trust tiers

### B0 — Signup only
**Requirements**
- account created

**Allowed**
- browse
- search
- view listings

**Not allowed**
- bid
- win/pay flows

### B1 — Contact verified
**Requirements**
- `email_verified`
- `phone_verified`

**Allowed**
- watchlist
- profile completion
- set delivery details
- add payment method

**Not allowed**
- bid yet

### B2 — Bid enabled (launch default)
**Requirements**
- `email_verified`
- `phone_verified`
- `payment_method_configured`
- not restricted

**Allowed**
- place bids in allowed launch categories
- win auctions
- complete post-win payment within deadline

**Limits**
- limited by base launch bid/value thresholds
- limited by concurrent active-bid thresholds
- repeated non-payment reduces or removes this access

### B3 — Enhanced buyer
**Requirements**
- B2 requirements
- `enhanced_identity_verified`

**Allowed**
- higher bid values
- higher concurrent bid limits
- access to categories or price bands that require stronger trust

**Typical trigger**
- buyer attempts to exceed base bid thresholds
- buyer attempts to bid in a higher-risk category
- buyer is flagged by risk controls and must step up to continue

### BX — Restricted / suspended buyer
**Triggers may include**
- repeated non-payment after winning
- chargeback or dispute abuse patterns
- linked-account abuse
- suspicious bidding patterns
- verification inconsistencies

**Effects**
- no bidding, or sharply reduced bidding rights
- forced enhanced verification and/or manual review before restoration

## Seller trust tiers

### S0 — Signup only
**Requirements**
- account created

**Allowed**
- browse
- prepare seller profile

**Not allowed**
- publish listings
- receive payouts

### S1 — Contact verified seller
**Requirements**
- `email_verified`
- `phone_verified`

**Allowed**
- create draft listings
- complete seller profile
- add payout account

**Not allowed**
- publish listings yet

### S2 — Seller enabled for low-limit launch listings
**Requirements**
- `email_verified`
- `phone_verified`
- `payout_account_resolved`
- `payout_name_match`
- not restricted

**Allowed**
- publish low-risk listings below the seller review threshold
- sell within low launch limits

**Limits**
- low listing-value cap
- low cumulative exposure cap
- low concurrent active-listing cap
- payout timing remains subject to payout policy

### S3 — Reviewed seller
**Requirements**
- S2 requirements
- `manual_review_passed`

**Allowed**
- publish listings above the review threshold
- higher listing count or higher listing-value bands within reviewed limits

**Manual review is required when**
- listing price exceeds the seller review threshold
- cumulative active exposure exceeds threshold
- category policy requires it
- account behavior trips risk signals

### S4 — Enhanced seller
**Requirements**
- S3 requirements
- `enhanced_identity_verified`

**Allowed**
- higher-value listings
- higher seller exposure limits
- access to additional categories if launch policy permits

**Typical trigger**
- seller attempts to exceed reviewed limits
- seller accumulates enough exposure that stronger identity assurance is needed
- seller is flagged for step-up review

### S5 — Business / commercial seller
**Requirements**
- S4 requirements
- `business_verified`

**Allowed**
- higher-volume commercial selling
- business-name aligned payouts
- higher operational limits under payout/risk policy

**Launch policy**
- not required for all sellers
- required only for higher-volume or clearly commercial sellers

### SX — Restricted / suspended seller
**Triggers may include**
- payout account mismatch
- suspicious listing patterns
- fraud complaints or elevated dispute rate
- linked-account abuse
- repeated policy violations
- document inconsistency or failed enhanced verification

**Effects**
- publishing disabled
- active listings may be paused
- payouts may be held
- manual review required before restoration

## Launch action matrix

| Action | Minimum requirement |
| --- | --- |
| Browse listings | B0 / S0 |
| Use watchlist | B1 |
| Place first bid | B2 |
| Bid above base threshold | B3 |
| Create draft listing | S1 |
| Publish low-risk listing below review threshold | S2 |
| Publish listing above review threshold | S3 |
| Exceed higher listing/value limits | S4 |
| Operate as higher-volume commercial seller | S5 |

## Step-up triggers
The platform should require stronger verification when any of the following occurs:

### Buyer step-up triggers
- attempted bid above base bid threshold
- too many concurrent active bids
- repeated wins with slow or failed payment
- suspicious account linkage or device behavior
- attempts to enter higher-risk categories or price bands

### Seller step-up triggers
- attempted listing above seller review threshold
- cumulative active listing value above threshold
- rapid creation of multiple listings from a new account
- payout account name mismatch or payout account changes
- dispute or fraud signals
- category escalation into a higher-risk segment

## Manual review policy
Manual review is intentionally selective.

### Required by threshold
- seller listing above configured review threshold
- seller cumulative active exposure above configured threshold

### Required by risk
- name mismatch between profile and payout account
- unusually new account attempting unusually high-value listing
- suspicious device / IP / linked-account patterns
- abnormal edit behavior, relisting behavior, or bid/listing interplay

### Reviewer checks should include
- profile consistency
- payout name match confidence
- listing quality and plausibility
- category-specific risk checks
- account age and behavior history
- any prior support, dispute, or abuse signals

## Payout bank match policy
Before a seller can publish low-limit listings, the payout account must be resolved and compared against the seller identity on file.

### For individual sellers
- compare resolved bank account name against the seller's profile and, when available, enhanced identity data

### For business sellers
- compare resolved bank account name against the business verification record once business verification is required

### If match confidence is weak
- do not silently accept
- force manual review, stronger verification, or both

## Limits and thresholds
This document defines **when** thresholds matter, not their exact numeric values.

Exact launch values should live in operations-facing policy/config and be tuned after beta feedback. At minimum, the system needs:
- `buyer_base_bid_threshold`
- `buyer_concurrent_bid_threshold`
- `seller_listing_review_threshold`
- `seller_cumulative_exposure_threshold`
- `enhanced_verification_thresholds_by_role`

## Risk signals that can downgrade trust
- non-payment after winning
- payment disputes or chargeback abuse
- linked buyer/seller collusion signals
- multiple accounts sharing suspicious identifiers
- payout account churn
- repeated failed verification attempts
- off-platform payment steering once moderation systems exist
- complaints that survive initial review

## Data handling requirements
- Store the minimum sensitive data necessary to prove verification status
- Prefer provider references / verification results over storing raw identity numbers when possible
- Audit every trust-tier transition with timestamp, actor, reason, and evidence reference
- Restrict access to sensitive verification data to authorized support/risk staff only

## Open items
- choose the exact verification providers for BVN / NIN / CAC workflows
- set exact numeric launch thresholds
- decide whether any launch category should require enhanced verification immediately

## Related docs
- `docs/PAYMENTS_NIGERIA.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/AUCTION_RULES.md`
- `docs/PAYOUTS_AND_RESERVES.md`
- `docs/TRUST_AND_SAFETY.md`
