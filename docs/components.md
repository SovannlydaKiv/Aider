# Component trees

## Helper list (HelperListPage)
Owns: search, availability, experience (via useHelperFilters). Reads helpers store.
├─ FilterBar   v-model: search, availability, experience
└─ HelperCard  props: helper   emits: select(id)

## Helper detail (HelperDetailPage)
props: id (route param). Reads helpers store (byId).

## Job feed (JobFeedPage)
Reads jobs store (jobs, status, error). Shows an urgency badge per job.

## Job form (JobFormPage)
Owns: form, submitted, errors, pending (all local). On submit calls jobs.create, then goes to /jobs.

## Shared state
helpers store: helpers, status, error, byId
jobs store: jobs, status, error, create
session store: role (drives the route guard)