# Chat Safety and Moderation

## Status

- Accepted as the launch-direction document for auction-linked chat safety and moderation
- Complements `docs/TRUST_AND_SAFETY.md`, `docs/DELIVERY_ESCROW_AND_RELEASE.md`, and `docs/DISPUTES_AND_CHARGEBACKS.md`

## Goals

- Let buyers and sellers coordinate safely without making chat the easiest path to scam or bypass the platform
- Reduce off-platform payment steering, harassment, and abuse
- Preserve enough communication evidence to support disputes, trust reviews, and appeals
- Keep chat usable for protected local pickup coordination

## Core launch decisions

- Contact details are **masked by default**
- Limited contact reveal is allowed **only when needed for protected pickup coordination**
- Lecrev should **warn users and queue high-risk chats for review** when scam/off-platform signals appear
- Users may **not fully block each other during an active protected transaction**; support can intervene instead
- Launch chat reports should cover **scam, harassment, off-platform steering, and threats/abuse**
- Launch chat allows **text and images**, but not arbitrary files
- Moderation target for high-risk chat reports/flags: **acknowledge within 12 hours, review target within 24 hours**

## Role of chat in Emporion

Chat is for:

- auction-related questions
- protected pickup coordination
- clarifying logistics details that do not alter platform protections
- preserving useful evidence for later review if something goes wrong

Chat is **not** for:

- moving payment off-platform
- replacing structured handover proof
- adding hidden fees after the auction result
- bypassing protected pickup rules

## Launch chat access rules

Chat remains auction-linked.

At launch, chat participation should remain consistent with the broader marketplace rules:

- seller
- users with at least one valid bid where product rules allow it
- admin/support

After a protected transaction is created, chat stays available for pickup coordination and support review.

## Contact-sharing policy

Launch rule:

- **mask by default; allow limited reveal only when needed for pickup coordination**

### Why

Free contact exchange too early makes it easy to:

- move payment off-platform
- evade moderation
- pressure users outside the product
- break the evidence trail needed for disputes and trust reviews

### What should be masked by default

Examples include:

- phone numbers
- WhatsApp numbers
- obvious direct-contact handles when possible

### Limited reveal rule

A limited contact reveal may be allowed only when all of the following are true:

- there is an active protected transaction
- users are in the pickup-coordination phase
- the reveal is needed for practical meetup coordination

### Reveal principles

- reveal should happen as late as reasonably possible
- reveal should be narrow and explicit, not a silent default
- the product should warn users that off-platform payment or unprotected arrangements are still not covered

## Off-platform steering detection

Launch rule:

- **warn users and queue high-risk chats for review**

### Examples of steering/scam risk

- requests for bank transfer outside Emporion
- requests to complete payment outside the platform
- instructions to ignore protected pickup confirmation
- coercive attempts to move the deal to WhatsApp for payment/settlement

### Launch handling

#### Low-to-medium confidence signal

- warning shown in chat
- educational reminder about protected flow
- message retained for review context

#### High-risk signal

- warning shown
- chat/report queued for moderation review
- trust/safety may add monitoring or restrictions after review

### Important nuance

At launch, Emporion should avoid overly aggressive fully automatic message blocking for every suspicious phrase.
The default is **warn + queue**, not `auto-block every suspicious message`.

## Blocking and user safety during active transactions

Launch rule:

- **no full block during an active protected transaction; support can intervene**

### Why

A full user-to-user block during an active protected transaction can break:

- pickup coordination
- support follow-up
- evidence continuity

### Safer launch approach

During an active protected transaction:

- users should be able to report the chat
- the system may allow reduced-noise controls such as muting notifications, if implemented
- support/admin can intervene, warn, freeze, or separate communication where safety requires it

After the protected transaction is resolved and no coordination obligation remains:

- stronger user-level blocking can be considered by product policy later

## Report categories at launch

Users should be able to report chat for:

- **scam**
- **harassment**
- **off-platform steering**
- **threats/abuse**

### Why this set

- it covers the highest-risk launch behaviors
- it keeps moderation routing simpler than a huge taxonomy
- it aligns with trust, dispute, and payout controls already defined

## Attachments policy

Launch chat should allow:

- text
- images

Launch chat should **not** allow:

- arbitrary files
- open document uploads
- executable or opaque attachment types

### Why images are allowed

Images are useful for:

- item clarification
- meetup coordination
- evidence for disputes or moderation

### Image-related rules

- images may support a dispute or moderation review, but they do not replace structured platform proof
- payment screenshots are not accepted as proof of valid payment completion
- harmful or abusive images remain reportable and reviewable under moderation policy

## Moderation SLA

High-risk chat reports/flags target:

- **acknowledge within 12 hours**
- **review target within 24 hours**

### Why this is needed

Chat issues can quickly become:

- pickup failures
- off-platform scams
- threats or harassment
- trust and safety escalations

Waiting too long undermines the protected flow.

## Moderation actions

Moderation should have a clear response ladder.

### Low-severity actions

- warning
- educational prompt
- added monitoring

### Medium-severity actions

- temporary chat restriction
- manual review requirement
- trust/safety review of the associated account or order

### High-severity actions

- account restriction or suspension
- auction/order freeze if integrity is at risk
- payout hold if seller-side fraud risk is implicated
- escalation to trust and safety / dispute operations

## What support/moderation should see

Moderation tooling should expose at least:

- auction/order context
- participant identities and trust status
- prior chat reports
- flagged messages and reasons
- linked dispute or payout-hold context when relevant

## Evidence and retention

Chat is an evidence surface.

The platform should preserve:

- message text
- timestamps
- participant ids
- image references
- report events
- warnings shown
- moderation actions taken

### Why this matters

Chat logs may later support:

- disputes
- chargeback defense
- off-platform steering enforcement
- appeal review
- linked-account investigations

## Seller and buyer guidance in the product

The product should communicate plainly:

- keep payment on Emporion
- do not share the pickup OTP before physical handover
- use chat for coordination, not for bypassing protection
- report scams, threats, or suspicious behavior quickly

## Relationship to other docs

### With delivery and release

Chat supports pickup coordination, but does not replace platform handover proof.

### With disputes

Chat may provide context and supporting evidence in dispute review.

### With trust and safety

Chat reports and flags feed trust enforcement actions.

### With payouts

Confirmed scam or steering behavior may widen payout holds or delay release.

## Open items

- exact trigger for limited contact reveal in product flow
- exact masking rules for usernames/handles beyond phone numbers
- exact image moderation rules and any category-specific constraints
- exact automation thresholds for high-risk chat flagging

## Related docs

- `docs/TRUST_AND_SAFETY.md`
- `docs/DELIVERY_ESCROW_AND_RELEASE.md`
- `docs/DISPUTES_AND_CHARGEBACKS.md`
- `docs/PAYOUTS_AND_RESERVES.md`
- `docs/IMPLEMENTATION_PLAN.md`
