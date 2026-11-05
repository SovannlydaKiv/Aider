# State management: store vs component

> **M1 requirement:** Explain what state lives in the store and what stays inside a component, and why.

---

## What lives in the Pinia store

| Store | State held |
|---|---|
| `helpersStore` | `helpers[]`, `status`, `error` |
| `jobsStore` | `jobs[]`, `status`, `error` |
| `sessionStore` | `role` |

**Rule of thumb:** state goes in the store when **more than one component needs to read or write it**, or when it must **survive a route navigation**.

### Why each piece lives in the store

| State | Reason |
|---|---|
| `helpers[]` / `jobs[]` | Fetched once from the API; both the list page *and* the detail page need the same data. Keeping it in the store avoids a double fetch when the user navigates back and forth. |
| `status` / `error` | Shared loading/error UI is driven by this. `HelperListPage` and `HelperDetailPage` both react to `status === 'loading'` from the same store, so the spinner is consistent everywhere. |
| `role` (session) | The router guard (`router/index.ts`) reads `role` to decide whether to allow navigation to `/jobs` or `/jobs/new`. Guards run outside any component, so the value must be in a store. |

---

## What stays inside a component

| Component | Local state |
|---|---|
| `JobFormPage` | `form` (field values), `errors`, `pending`, `submitted` |
| `ReviewPage` | `rating`, `comment`, `pending`, `submitted`, `error` |
| `HelperListPage` | `search`, `availability`, `experience` (filter values) |
| `FilterBar` | *none* — it is fully controlled via `v-model` props |

**Rule of thumb:** state stays local when it is **only relevant to one component's current interaction** and does not need to be shared or survive navigation.

### Why each piece stays local

| State | Reason |
|---|---|
| `form` / `errors` / `pending` in `JobFormPage` | Only the form itself cares about what the user is typing right now. Once the user submits and navigates to `/jobs`, this state is thrown away — that is exactly what should happen. Storing half-typed form data globally would create confusing stale state. |
| `rating` / `comment` in `ReviewPage` | Same reasoning — it is ephemeral input for a single action. |
| `search` / `availability` / `experience` in `HelperListPage` | These are UI filter controls that only affect the computed list inside the same page. If the user goes to a detail page and comes back, resetting the filters is the expected UX. No other page needs to know what filter is selected, so there is no reason to put them in the store. |

---

## Summary

```
Pinia store  →  shared, long-lived, or needed outside components (API data, session role)
Component    →  local, ephemeral, single-owner state (form inputs, UI toggles)
```

Keeping local state local makes components easier to test in isolation (no store setup needed) and avoids accidental coupling between pages.

