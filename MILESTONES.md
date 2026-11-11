# Milestone Checklists

## M0 Proposal (week 3)

- [x] PROPOSAL.md follows the template in Appendix A
- [x] Problem stated in two sentences; target users and at least 2 roles named
- [x] 6–10 user stories, with acceptance criteria for the 3 most important
- [x] MVP scope split into must-have and nice-to-have
- [x] Entity list with main attributes and relations; at least 3 entities
- [x] Chosen stretch feature named

### Explain: Which story did you cut from the MVP, and why?
I moved Story 2 (showing distance/urgency) and Story 6 (saving jobs to a personal list) into nice-to-have. 

**Why:** The main goal of the MVP is to get the core hiring flow working: a family posts what they need, a helper applies, and the family approves them, therefore i thought that things like calculating distance or bookmarking jobs are convenient, but not essential for someone to find help right now.

---

## M1 Frontend prototype (week 5)

- [x] Wireframes (photo or tool) of the main screens in docs/
- [x] Vue 3 + TypeScript app created with Vite; strict mode on; ESLint passes
- [x] At least 4 routes, including a detail page with a route parameter
- [x] At least one form with client-side validation
- [x] A Pinia store and a service layer calling a mock API (json-server or local JSON)
- [x] Loading, empty and error states visible

### Explain: What state lives in the store and what stays inside a component? Why?

**In the Pinia store:**
- **Helpers and Jobs data and loading/error status:** Both the list page and detail page need to access this data, so by keeping it in the store means I don't have to refetch from the API every time someone clicks back and forth between pages.
- **User role (`session.role`):** The router guard checks this before letting users into pages like `/jobs` or `/jobs/new`. Since router guards run outside components, this has to be in the store.

**Inside the component:**
- **Form inputs and validation errors (in `JobFormPage` and `ReviewPage`):** What the user types is temporary. Once they submit the form or leave the page, that data isn't needed anywhere else and can just reset.
- **Search and filter toggles (in `HelperListPage`):** The search text and filter chips only affect what's shown on that single screen, so no other component needs to know about them.
