# Trust and Safety

## Status
- Accepted as the launch-direction document for marketplace abuse prevention and enforcement
- Complements `docs/VERIFICATION_AND_TRUST_TIERS.md`, `docs/AUCTION_RULES.md`, `docs/DISPUTES_AND_CHARGEBACKS.md`, and `docs/PAYOUTS_AND_RESERVES.md`

## Goals
- Make Emporion hard to game at launch without making normal users feel punished
- Detect and stop fraud before money leaves the platform
- Protect buyers, sellers, and the platform from repeat abusers
- Keep enforcement explainable, auditable, and appealable

## Launch context
Emporion launch already assumes:
- verified payment setup before bidding
- protected local pickup only
- structured dispute handling
- selective payout holds
- low-risk category launch

This document defines the abuse-prevention layer around those systems.

## Core launch decisions
- If Emporion detects a likely linked buyer/seller relationship on the same auction, the default action is to **freeze the auction and send it to manual review**
- Repeated winner non-payment should use a **2-strike then suspend bidding** rule
- If users appear to be steering payment or protected fulfillment off-platform, Emporion should **warn first, then restrict on repeat**
- If multiple seller accounts share the same payout bank account, Emporion should require **manual review before payout**
- Trust and safety appeals should allow **one appeal with new evidence**
- Users should be able to report **listings, chats, and user accounts** at launch

## Principles
1. **Prefer narrow, defensible rules over vague promises**
2. **Block obvious abuse early; review ambiguous cases quickly**
3. **Do not let money leave faster than trust can be evaluated**
4. **Use platform-generated signals first, user claims second**
5. **Every serious enforcement action must be reviewable and auditable**

## Abuse areas covered at launch
Emporion trust and safety should explicitly cover:
- linked-account abuse
- shill bidding / collusive bidding
- repeated winner non-payment
- payout fraud / account takeover indicators
- off-platform payment or fulfillment steering
- listing fraud / possession fraud
- repeat dispute abuse
- chargeback abuse
- impersonation / account compromise signals where evident

## Risk signals
The trust system should combine signals across identity, device, payments, bidding, disputes, and payouts.

### Account linkage signals
Examples:
- same payout account used by multiple seller accounts
- suspicious reuse of phone numbers, devices, IP ranges, or other identifiers
- buyer and seller accounts repeatedly interacting with each other in abnormal patterns
- accounts created or activated in close proximity with shared risk markers

### Auction integrity signals
Examples:
- linked buyer/seller bidding on the same auction
- repeated bid inflation followed by winner default
- repeated late-bid patterns between the same accounts
- seller cancellations after suspicious bidding behavior

### Payment and default signals
Examples:
- repeated winner non-payment
- repeated failed or disputed payments
- chargeback filing instead of using the protected dispute flow
- mismatch between user identity and payout/payment behavior

### Payout fraud signals
Examples:
- payout account changes shortly before payout
- weak payout account name match
- shared payout accounts across multiple seller accounts
- attempts to cash out quickly after suspicious activity

### Listing integrity signals
Examples:
- implausible listing values for a new seller
- duplicate or reused media across suspicious accounts
- categories with elevated fraud patterns
- evidence the seller may not possess the listed item

## Linked-account and shill-bidding policy
Launch default:
- if Emporion detects a likely linked buyer/seller relationship on the same auction, **freeze the auction and send it to manual review**

### Why
- false positives are possible
- allowing the auction to proceed can corrupt pricing and trust
- immediate auto-suspension is too harsh as the default for all ambiguous cases

### Review outcomes may include
- auction restored with monitoring
- auction canceled
- bids reversed
- payout hold widened
- buyer/seller restrictions or suspension

## Winner non-payment enforcement
Launch rule:
- **2 strikes then suspend bidding**

### Strike definition
A non-payment strike should apply when:
- a buyer wins
- the buyer fails to pay inside the required payment window
- no platform/system fault or approved support exception explains the failure

### Consequences
#### First strike
- warning
- trust downgrade
- potentially lower bid/concurrency limits

#### Second strike
- bidding suspended pending review or stronger verification

### Notes
- support may accelerate enforcement if abuse is clearly intentional or linked to other fraud signals
- good-faith exceptions should be auditable and rare

## Off-platform steering policy
If chat or behavior suggests users are trying to move payment or protected fulfillment off-platform:
- **warn first, restrict on repeat**

### Examples of steering risk
- asking for direct transfer outside the platform
- asking users to ignore platform pickup confirmation rules
- attempts to bypass protected flow while still expecting platform protection later

### Launch enforcement ladder
#### First event
- warning message
- educational reminder in chat and/or account UI

#### Repeat event
- restriction on sensitive actions
- tighter monitoring and possible manual review

### Important nuance
Normal coordination in chat is allowed.
The rule is about moving protected commerce outside Emporion, not about ordinary meetup planning.

## Shared payout account policy
Launch rule:
- if multiple seller accounts use the same payout account, require **manual review before payout**

### Why
- shared payout accounts are a strong fraud/collusion signal
- but automatic blocking can also hit legitimate family/team cases

### Review outcomes may include
- payout released
- payout kept on hold
- stronger verification requested
- linked-account enforcement actions applied

## User reporting at launch
Users should be able to report:
- listings
- chats
- user accounts

### Why each matters
- **Listing reports** help catch fraud, prohibited items, and misrepresentation
- **Chat reports** help catch off-platform steering, threats, harassment, and scams
- **User reports** help aggregate bad behavior beyond a single auction

## Report intake expectations
A report should capture at least:
- reporter
- reported entity type
- reason category
- optional free-text explanation
- timestamp and linked object ids

The system should automatically attach relevant context where possible.

## Enforcement actions
Trust and safety needs a clear ladder of actions.

### Low-severity actions
- warning
- education notice
- tighter monitoring
- temporary feature friction (e.g. step-up verification)

### Medium-severity actions
- bid limit reduction
- listing limit reduction
- payout hold
- auction freeze
- manual review requirement

### High-severity actions
- bidding suspension
- listing suspension
- sensitive-action freeze
- account suspension
- cancellation of impacted auctions/orders

## Sensitive actions that may be frozen
At minimum:
- new bidding
- new listing creation
- payout initiation
- payout account updates when already under review
- other money-moving actions support/risk deems necessary

## Manual review policy
Manual review should focus on high-value or high-risk decisions, not every user event.

### Priority manual review cases
- frozen auction because of likely linked accounts
- shared payout account before payout
- suspicious payout account change
- multiple strikes for non-payment
- repeated chargeback/dispute abuse signals
- serious listing integrity concerns

### Reviewer goals
- decide quickly enough to preserve user trust and payout safety
- use objective signals first
- avoid forcing certainty when evidence is weak; escalate instead

## Appeals policy
Launch appeals rule:
- **one appeal with new evidence**

### Why
- keeps the process fair
- avoids endless relitigation
- fits launch ops capacity

### Appeal requirements
An appeal should usually include:
- the challenged action
- why the user believes it was wrong
- new evidence or a clear review error

## Evidence and auditability
Every serious trust/safety action should preserve:
- actor (system or human)
- target account/object
- timestamp
- reason code
- evidence references
- resulting action taken

This matters for:
- disputes
- chargebacks
- seller payout holds
- appeals
- future fraud pattern analysis

## Admin / operations capabilities needed
Emporion should have internal tooling to:
- freeze auctions
- place/remove payout holds
- view linked-account indicators
- inspect chat and listing reports
- apply strikes and suspensions
- record appeal outcomes
- annotate manual review decisions

## Seller/buyer communication principles
Enforcement messages should be clear but not overly revealing.

Good examples:
- `This auction is under review for integrity checks.`
- `Your bidding access is temporarily suspended because of repeated unpaid wins.`
- `Payout is on hold pending review of your payout account details.`

Avoid:
- exposing sensitive internal detection logic
- vague unexplained freezes with no next step

## Relationship to other docs
### With verification tiers
Trust and safety can force step-up verification or manual review.

### With auction rules
Trust and safety can freeze auctions, reverse bids, or cancel integrity-compromised auctions.

### With disputes and chargebacks
Abusive patterns in disputes or chargebacks feed account-level enforcement.

### With payouts and reserves
Trust and safety can widen selective holds or stop payout release.

## Open items
- exact signal thresholds for linked-account detection
- exact strike decay/expiration policy, if any
- exact launch report reason taxonomy
- exact category-specific fraud watchlist

## Related docs
- `docs/VERIFICATION_AND_TRUST_TIERS.md`
- `docs/AUCTION_RULES.md`
- `docs/DELIVERY_ESCROW_AND_RELEASE.md`
- `docs/DISPUTES_AND_CHARGEBACKS.md`
- `docs/PAYOUTS_AND_RESERVES.md`
- `docs/IMPLEMENTATION_PLAN.md`
