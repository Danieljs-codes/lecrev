# Listing Policy

## Status
- Accepted as the launch-direction document for seller listings and listing moderation
- Complements `docs/VERIFICATION_AND_TRUST_TIERS.md`, `docs/TRUST_AND_SAFETY.md`, `docs/AUCTION_RULES.md`, and `docs/DELIVERY_ESCROW_AND_RELEASE.md`

## Goals
- Keep launch inventory trustworthy enough that buyers feel safe bidding
- Make it harder for sellers to list items they do not possess or cannot fulfill
- Reduce ambiguity in item condition so disputes are narrower and easier to resolve
- Limit launch category exposure where fraud/authenticity risk is too high

## Core launch decisions
- Launch uses a **moderate category set**, with stricter review for riskier items
- Sellers must use **real photos** for every listing
- **Timestamp proof** is required for higher-risk items
- Listings must use **structured condition grades** and **required defect disclosure**
- Launch excludes **authenticity-sensitive categories** initially
- Listings must include **at least 5 real images** and **no stock images**
- Listings go to manual review based on **price threshold, category rules, or risk signals**

## Category approach at launch
Launch should not be so narrow that supply is dead, but it should not be so broad that fraud overwhelms trust.

### Launch model
Emporion should use three category buckets:

#### 1. Standard launch categories
These are categories that can be listed with the normal seller-enabled flow, subject to ordinary policy checks.

Characteristics:
- easy to inspect at pickup
- lower authenticity risk
- easier condition verification
- lower dispute ambiguity

#### 2. Reviewed categories
These are allowed only with stricter listing review and stronger evidence.

Characteristics:
- higher value
- higher theft/fraud risk
- more complex condition verification
- greater mismatch/dispute potential

#### 3. Excluded launch categories
These are not allowed at launch.

Characteristics:
- authenticity is hard to verify reliably at pickup
- fraud or counterfeit risk is high
- regulated/sensitive goods require more infrastructure or policy maturity

## Authenticity-sensitive categories
Launch decision:
- **exclude authenticity-sensitive categories initially**

Examples of categories that should start excluded unless later approved by a dedicated policy update:
- luxury/designer goods where authenticity is the main purchase claim
- high-risk branded jewelry and watches
- collectibles/memorabilia where authenticity is difficult to verify quickly
- other categories where fake vs genuine is not reasonably resolvable in the launch dispute model

This does **not** mean every branded product is excluded.
It means categories whose value depends heavily on authenticity claims should not be part of the launch set until stronger category-specific review exists.

## Listing requirements
Every listing should include, at minimum:
- title
- category
- structured condition grade
- description
- required defect disclosures
- quantity / single-item clarity where relevant
- general pickup area
- asking / starting price consistent with auction flow
- required real images

### Pickup area safety rule
Because launch uses protected local pickup only:
- listings should show a **general pickup area**, not an exact home or private address
- exact meetup location should be coordinated later through the protected transaction flow

## Proof-of-possession policy
Launch rule:
- **real photos required for all listings**
- **timestamp proof required for higher-risk items**

### Real-photo rule
Every listing must use photos taken by the seller of the actual item being sold.

This means:
- no stock photos
- no scraped marketplace photos
- no manufacturer-only catalog imagery as the substantive listing photos

### Timestamp proof rule
For higher-risk items, the listing must include additional proof that the seller currently possesses the item.

Examples of acceptable timestamp proof:
- a photo showing the item with a handwritten Emporion code/date marker
- a photo that clearly ties the item to the seller's listing session or review request

### Why
This is one of the strongest launch controls against:
- fake inventory
- bait listings
- stolen images
- sellers who do not actually possess the item

## Image policy
Launch rule:
- **minimum 5 real images**
- **no stock images**

### Minimum image expectations
A compliant listing should normally include enough images to show:
- the full item
- multiple angles
- close-up details
- visible defects/wear where relevant
- identifying details if category rules require them

### Higher-risk categories/items may require more
For reviewed items, moderation may require:
- clearer close-ups
- identifying markers
- timestamp proof image

## Condition model
Launch rule:
- **structured condition grades + required defect disclosure**

### Condition grades
Emporion should use a structured set rather than freeform condition only.

Recommended launch grades:
- `new_sealed`
- `new_open_box`
- `like_new`
- `used_good`
- `used_fair`
- `damaged_or_for_repair`

### Required defect disclosure
If an item has any material flaw, the seller must disclose it clearly.

Examples:
- cracks
- scratches/dents beyond minor wear
- missing accessories/parts
- battery degradation or power issues
- repair history where relevant
- functional limitations

### Why this matters
Structured grades alone are not enough.
A seller should not be able to choose `used_good` and omit a serious defect.

## Description rules
Listing descriptions must be:
- specific
- truthful
- consistent with the photos
- consistent with the chosen condition grade

Descriptions must not:
- hide known material problems
- imply authenticity that the platform is not prepared to verify for excluded categories
- misstate included accessories or extras
- materially mismatch the actual item shown in photos

## Reviewed listing policy
Launch rule:
- listings go to manual review based on **price threshold, category rules, or risk signals**

### Review triggers
A listing should go to manual review when any of the following applies:
- listing price exceeds the seller review threshold
- category is a reviewed category
- seller/account has risk signals
- timestamp proof is required and missing or weak
- image set looks duplicated, suspicious, or inconsistent
- listing description and images conflict materially

### Manual review goals
Reviewers should check:
- proof of possession strength
- photo quality and consistency
- condition/disclosure consistency
- category eligibility
- seller trust tier and risk context
- whether the seller appears able to fulfill the listing honestly

## Listing state model
```text
draft → submitted_for_review → {live, needs_changes, rejected}
live → {paused, ended, removed}
```

### Notes
- not every listing needs manual review, but every listing should be reviewable
- `needs_changes` is important so sellers can fix genuine issues without full rejection
- `paused` should be available when trust/safety concerns arise after publication

## Prohibited listing behaviors
The following should be prohibited at launch:
- listing items the seller does not currently possess
- using misleading or stolen images
- hiding material defects
- miscategorizing to bypass review or policy
- listing excluded launch categories
- attempting to negotiate hidden mandatory charges after auction close
- using listing text to steer users off-platform

## Listing integrity interactions
Listing policy should feed directly into trust and safety.

Examples:
- fake possession evidence → listing rejection + seller review
- repeated misrepresentation → listing restrictions or suspension
- suspicious reused imagery across accounts → linked-account / fraud review
- authenticity claims in excluded categories → removal or rejection

## User reporting
Listings should be reportable at launch.

Useful report reasons include:
- fraudulent/misleading listing
- wrong category
- prohibited item
- fake or suspicious images
- item appears not to be in seller possession

These reports should feed moderation and trust review, not only customer support.

## Seller education requirements
When a seller creates a listing, the product should communicate clearly:
- use only real images of the actual item
- disclose all material defects
- do not list items you do not physically possess
- exact pickup location is not public; only general area is shown in the listing
- authenticity-sensitive categories are excluded at launch

## Relationship to other docs
### With verification tiers
Seller trust tier determines how much listing exposure is allowed.

### With trust and safety
Suspicious listings can trigger manual review, freezes, or account restrictions.

### With auction rules
Listings must remain valid and honestly fulfillable throughout the auction lifecycle.

### With disputes
Structured condition and photo requirements make disputes narrower and more evidence-based.

## Open items
- exact launch category set for `standard`, `reviewed`, and `excluded` buckets
- exact price threshold for listing review
- exact category-specific required fields for reviewed items
- whether some categories need serial-number/identifier capture at launch

## Related docs
- `docs/VERIFICATION_AND_TRUST_TIERS.md`
- `docs/AUCTION_RULES.md`
- `docs/DELIVERY_ESCROW_AND_RELEASE.md`
- `docs/TRUST_AND_SAFETY.md`
- `docs/IMPLEMENTATION_PLAN.md`
