# Auction Rules

## Status

- Accepted as the launch-direction document for auction behavior
- Complements `docs/PAYMENTS_NIGERIA.md` and `docs/VERIFICATION_AND_TRUST_TIERS.md`

## Goals

- Make auctions feel fair and hard to game
- Keep the rules simple enough to explain clearly at launch
- Prevent seller-side and buyer-side actions that destroy trust
- Define the fallback path when a winner does not pay

## Core launch decisions

- Auctions use a **public minimum starting price** at launch
- There is **no hidden reserve price** at launch
- If a bid is accepted in the last **5 minutes**, the auction extends so that **5 minutes remain**
- Launch supports **proxy / max-auto bidding**
- If the winner does not pay on time, the platform should **offer the item to the next eligible bidder**, and the defaulting buyer's trust/reputation should take a hit
- Bids are effectively final once accepted; **only support can reverse them in exceptional cases**
- Sellers may cancel auctions **before the first accepted bid**; after that, only support/admin may cancel in exceptional cases

## Auction model

Each auction must define at least:

- seller
- listing
- start time
- scheduled end time
- public starting price
- bid increment rules
- category / risk controls if applicable

At launch:

- the seller's public starting price is also the minimum acceptable opening bid
- the platform does not support a hidden reserve layer on top of the public starting price
- only users who are bid-eligible under `docs/VERIFICATION_AND_TRUST_TIERS.md` may place bids

## Public minimum price behavior

The seller chooses a visible minimum starting price.

**Rules**

- no accepted bid may be below this amount
- bidders can see this minimum before bidding
- if the auction closes with a valid highest bid, the seller is expected to honor that result subject to payment, trust, and dispute rules

This keeps launch rules simpler and more transparent than hidden reserve behavior.

## Bid acceptance rules

A bid is accepted only if all of the following are true:

- auction is `live`
- bidder is bid-eligible
- seller/listing is still eligible to receive bids
- bid amount satisfies minimum increment rules
- bid arrives before the current auction end time
- no risk or integrity control blocks the bid

A rejected bid must return a specific reason, such as:

- auction not live
- bidder not eligible
- bid below minimum increment
- auction already ended
- bidder restricted by risk controls

## Bid increments

The auction must enforce minimum increments.

At launch, the exact numeric increment schedule is still configurable, but the rule shape is fixed:

- every new bid must exceed the current effective price by at least the configured increment for that price band
- equal bids are not accepted
- increment rules must be deterministic and auditable

## Proxy / max-auto bidding

Launch supports proxy bidding.

### How it works

- a bidder may submit a private maximum amount they are willing to pay
- the system automatically bids only the minimum amount needed to keep that bidder in the lead, up to their private maximum
- the public/current price increases only as needed; it does not jump straight to the bidder's maximum unless necessary

### Privacy rules

- a bidder's maximum bid is never shown to other bidders
- a bidder's maximum bid is never shown to the seller in normal product UI
- internal systems may retain the maximum and the derived bid actions for audit, abuse review, and disputes

### Fairness rules

- if two bidders end up with the same maximum, the earlier accepted maximum wins
- every auto-generated bid must be reproducible from the immutable event log
- UI should clearly explain that the system is bidding on the user's behalf up to their chosen maximum

## Current price and leading bidder semantics

The auction must keep track of:

- current effective price
- current leading bidder
- full accepted bid history
- proxy/max-bid events needed to reproduce outcomes

The displayed/current price should always be the lowest valid amount at which the current leader remains in front under the proxy-bidding rules.

## Anti-sniping extension

At launch, auctions use a rolling anti-sniping extension.

**Rule**

- if an accepted bid lands when less than 5 minutes remain, the auction end time is moved so that 5 minutes remain from the time of that accepted bid

Examples:

- if 4 minutes remain and a bid is accepted, end time extends by 4 minutes
- if 20 seconds remain and a bid is accepted, end time extends to bid time + 5 minutes
- repeated accepted bids can continue extending the auction

### Why

- reduces last-second unfairness
- gives real buyers time to respond
- makes sniping less effective as a manipulation strategy

## Auction close and winner selection

When the auction closes:

- the highest accepted and still-valid bid wins
- if proxy bidding is enabled, the winner is determined by the proxy rules and immutable bid log
- the winner enters the `payment_due` flow defined in `docs/PAYMENTS_NIGERIA.md`

### Tie-breaking

- later equal bids are rejected because equal bids are invalid under the minimum-increment rules
- if proxy logic results in equal maximums, the earlier accepted maximum wins

## Winner payment deadline

The winning bidder does not become the final paid buyer until payment is verified.

**Launch rule**

- winner has **30 minutes** to complete payment, per `docs/PAYMENTS_NIGERIA.md`

During this period:

- item is reserved
- seller cannot cancel freely
- seller must not arrange off-platform settlement

## Winner default flow

If the winner does not pay within the deadline:

- the order/payment becomes `expired` or `defaulted`
- the defaulting buyer receives a non-payment strike / trust downgrade
- bidding rights and limits may be reduced or suspended
- the platform should attempt a second-chance offer to the next eligible bidder

### Second-chance offer rule

The next eligible bidder should not be punished by price inflation caused by the defaulting bidder.

Therefore:

- the second-chance offer amount should be computed from the immutable auction log **as if the defaulting bidder had not participated**, while still respecting the next bidder's own committed maximum and the public minimum price
- if multiple defaulting bidders must be removed, recompute in order until an eligible offer target is found or the auction is exhausted

### Second-chance offer timing

At launch:

- next eligible bidder receives a short payment window
- default recommended window: **30 minutes**
- if they decline or fail to pay, the platform may continue down the eligible order or relist according to operational policy

## Relist path

An auction may be relisted when:

- no eligible bidder remains after defaults or declines
- support/admin cancels due to integrity or compliance reasons
- payment/dispute rules make the original auction non-settleable

A relist should create a new auction identity and not silently overwrite the old auction history.

## Bid withdrawal and reversal

Accepted bids are final for users.

### User-side rule

- bidders cannot withdraw accepted live bids themselves

### Support exception rule

Only support/admin may reverse a bid, and only for exceptional reasons such as:

- verified account compromise
- platform bug or duplicated bid caused by system failure
- fraud/integrity incident
- legal or compliance intervention

Every reversal must be audited with:

- who performed it
- why it was performed
- what evidence supported it
- what downstream auction changes were made

## Seller cancellation rules

### Before first accepted bid

- seller may cancel the auction

### After first accepted bid

- seller may not cancel directly
- only support/admin may cancel, and only for exceptional reasons such as:
  - fraud or stolen-item concerns
  - prohibited or miscategorized item
  - major listing integrity problem
  - legal/compliance requirement
  - clear impossibility of fulfillment

### Consequences

Seller-side cancellations after bidding starts should feed seller trust/reputation and may trigger listing limits, manual review, or suspension.

## Listing integrity interactions

Support/admin may freeze or cancel an auction when integrity concerns arise, including:

- evidence the seller does not possess the item
- counterfeit or prohibited goods concerns
- linked-account/shill-bidding patterns
- manipulated listing details that materially affect value

## Off-platform dealing prohibition

Once an auction has bids:

- seller and bidders must not complete the transaction off-platform
- attempts to steer payment or fulfillment off-platform may trigger restrictions, cancellation, or suspension

This rule is especially important because payment, trust, and dispute protections depend on platform-controlled evidence.

## Auditability requirements

The auction engine must retain enough information to reconstruct outcomes later.

Required evidence includes:

- original auction configuration
- every accepted/rejected bid with timestamp and reason
- every proxy/max-bid submission
- every anti-sniping extension
- final winner determination logic
- default / second-chance calculations
- support/admin interventions

## Open items

- exact numeric bid increment schedule by price band
- whether any category should have stricter anti-sniping or no proxy bidding
- whether second-chance offers continue through all eligible bidders automatically or stop after a limited number of attempts

## Related docs

- `docs/PAYMENTS_NIGERIA.md`
- `docs/VERIFICATION_AND_TRUST_TIERS.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/TRUST_AND_SAFETY.md`
- `docs/PAYOUTS_AND_RESERVES.md`
