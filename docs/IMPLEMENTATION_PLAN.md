# Emporion Implementation Plan

## Current Status
- Planning phase completed
- Implementation pending explicit start signal

## 1. Project Overview
- Repository contains documentation only (no product implementation yet)
- Greenfield architecture being designed with strict state safety principles
- Target market: Nigeria-first with international expansion planned

## 2. Technology Stack Decisions

### Backend
- **Language/Framework:** Typescript with effect
- **API Design:** Code-first approach with typed success/error responses
- **Error Handling:** Discriminated unions (`oneOf`) avoiding generic 400 responses

### Frontend
- **Framework:** React with TanStack Router
- **State Management:** To be determined based on complexity requirements

### Data & Infrastructure
- **Primary Database:** PostgreSQL
- **Accounting System:** Double-entry ledger implemented in PostgreSQL (source of truth for financial data)
- **Caching Layer:** Redis-compatible solution (never source of truth)
- **Observability:** OpenTelemetry instrumentation with Collector for batching/routing
- **Background Processing:** Job runner for async workflows (notifications, webhooks, analytics, etc.)

### Third-party Integrations
- **Email:** Provider abstraction with Resend as primary choice, Mailgun as fallback
- **Payments:** Paystack + Flutterwave integration
- **Analytics:** PostHog Cloud (MVP) for tracking funnels, engagement, conversions
- **Verification:** Tiered model for Nigeria launch: email + phone at signup, payment method required for bidding, payout bank match for seller publishing, and BVN/NIN/CAC step-up at higher limits or risk triggers (see `VERIFICATION_AND_TRUST_TIERS.md`)

## 3. Core Product Features (MVP)
- End-to-end paid auction flow
- Watchlist functionality
- Bid history tracking
- Seller analytics dashboard
- Live mini-charts for auction activity
- Auction-linked chat system with masking, reporting, and moderation controls (see `CHAT_SAFETY_AND_MODERATION.md`)
- Bid eligibility via verified payment setup + post-win payment deadline for Nigeria launch (see `PAYMENTS_NIGERIA.md`)
- Buyer protection with delayed seller release after confirmed protected pickup handover + 48-hour inspection window when undisputed (see `DELIVERY_ESCROW_AND_RELEASE.md`)
- Structured dispute resolution + chargeback handling with fast support SLA (see `DISPUTES_AND_CHARGEBACKS.md`)
- Daily batch seller payouts with no global reserve and selective holds only (see `PAYOUTS_AND_RESERVES.md`)

## 4. Domain State Machines

### Auction Lifecycle
```
draft → scheduled → live → ended → settled
          ↓               ↓
     cancelled      disputed
```

### Bid States
```
submitted → {accepted, rejected, withdrawn}
```

### Payment Flow
```
pending → {processing, succeeded, failed, expired}
processing → {succeeded, failed, expired}
succeeded → {refunded, disputed}
```

### Buyer Payment Eligibility
```
unverified → eligible → {restricted, suspended}
```

### Post-win Payment
```
payment_due → {processing, paid, expired, defaulted}
           processing → {paid, failed, expired}
```
**Rules:**
- Users must be `eligible` to place bids
- Eligibility requires verified contact details and at least one supported payment rail
- Winning an auction creates `payment_due`, not `paid`
- `paid` requires provider webhook confirmation plus server-side verification

### Delivery & Delayed Release
```
awaiting_pickup → handover_confirmed → inspection_window → funds_released
       ↓                 ↓
failed_fulfillment    disputed
```

### Auction-linked Chat
```
open → {archived, blocked}
```
**Rules:**
- Chat cannot be disabled by users
- Posting permitted for: sellers, users with ≥1 valid bid, admin/support
- Remains open post-auction for delivery coordination

## 5. API & Error Contract Strategy
- Code as source of OpenAPI specification as single source of truth
- Typed error responses using discriminated unions:
  - VALIDATION_ERROR
  - STATE_TRANSITION_DENIED
  - AUTHZ_DENIED
  - BID_TOO_LOW
  - AUCTION_NOT_LIVE
  - PAYMENT_PROVIDER_ERROR
  - DISPUTE_REQUIRED
- Command endpoints model state transitions rather than direct status updates
- Idempotency keys for payment/webhook-sensitive endpoints

## 6. Database Design

### Core Tables
- Users & verification: `users`, `user_verifications`
- Product catalog: `listings`, `auctions`, `auction_transitions`
- Bidding system: `bids`, `bid_rejections`, `watchlists`
- Communication: `conversations`, `messages`
- Order management: `orders`, `payments`, `deliveries`, `disputes`
- Notifications & metrics: `notifications`, `seller_metrics_daily`
- Accounting: `ledger_accounts`, `ledger_journals`, `ledger_postings`

### Key Constraints & Indexes
- CHECK constraints: non-negative monetary values, valid percentages, chronological ordering
- Foreign key constraints: all inter-table relationships
- UNIQUE constraints:
  - Single active auction per listing
  - One order per winner/auction pair
  - Provider transaction references (per provider)
- Partial indexes: live auctions, unresolved disputes
- Audit logging: all status transitions via transition service

### Concurrency Controls
- Bid placement uses row-level locking (`SELECT ... FOR UPDATE`) on auction aggregates
- Atomic recomputation of `current_price` and `leading_bid_id` during bid processing
- Prevents race conditions in high-concurrency bidding scenarios

### Scaling Strategy
- Initial deployment: single PostgreSQL instance
- Future partitioning: time/auction-id partitioning for high-volume tables (`bids`, `auction_transitions`)

### Accounting Ledger Implementation
- Append-only double-entry journal for all financial movements
- Journal balancing: sum(debits) = sum(credits) per entry
- Idempotency and unique indexing for provider/webhook references

## 7. Reference Materials Consulted
- Resend and Mailgun pricing/documentation
- PostHog analytics platform information
- OpenTelemetry documentation and Collector guides
- PostgreSQL resources on constraints, locking mechanisms, and partitioning strategies

## 8. Implementation Roadmap
1. Architecture foundation + Architecture Decision Records (ADRs)
2. OpenAPI contract generation from effect code + type generation
3. Domain transition engine + invariant validation tests
4. Initial PostgreSQL schema deployment
5. Authentication & authorization systems + policy enforcement
6. Auction lifecycle APIs + corresponding UI components
7. Bidder payment-eligibility flow + bidding engine (concurrency control + anti-sniping measures + post-win payment deadline)
8. Payment processing + idempotent webhook handling
9. Protected pickup flow + delayed seller release logic implementation
10. Chat system + moderation tooling
11. Notification system + email provider integration + watchlist features
12. Seller analytics + bid history visualization + live activity charts
13. Observability pipeline (OpenTelemetry) + product analytics dashboard configuration
14. System hardening: load testing, race condition analysis, abuse prevention, dispute resolution workflows

## 9. Pending Decisions
- Specific verification providers for BVN/NIN/CAC workflows
- Exact launch thresholds for bid limits, listing review, and cumulative exposure
- Exact numeric bid increment schedule and any category-specific auction exceptions
- Exact category-specific dispute evidence checklist and appeal window
- Exact threshold/rule set for selective payout holds beyond the launch baseline
- Exact linked-account detection thresholds, strike decay policy, and report reason taxonomy
- Exact contact-reveal trigger, image moderation rules, and chat-flagging thresholds
- Exact launch category set and any category-specific required fields or identifier capture rules
- Exact alert thresholds, kill-switch triggers, and internal staffing roster for launch week
