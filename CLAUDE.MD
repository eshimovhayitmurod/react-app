# CLAUDE.md

This file is the working guide for Claude Code when contributing to this repository.

## Project overview

This is a React 19 + Vite web application.

The app is highly feature-rich and mostly data-driven. Many screens are built as forms, tables, wizards, and document workflows that call backend services through a centralized API layer.

## Core stack

- Node: 24.22.1
- Yarn: 1.22.22
- Typescript: 7.0.2
- React: 19.3.1
- React Router: 8.5.1
- Vite (SWC): 8.3.5
- Tailwind CSS 4.3.3
- Redux Toolkit
- Axios
- i18next
- Recharts, React PDF, QRCode, DnD kit, ExcelJS

## Important commands

```bash
yarn install
yarn dev
yarn build
yarn lint
yarn preview
```

## Repository structure

- src/main.jsx — application entry point
- src/app/ — app shell, providers, routing bootstrap, initialization hooks
- src/modules/ — feature modules and route definitions
- src/shared/ — shared layout, hooks, helpers, i18n, store, services, controllers
- src/assets/ — icons, illustrations, fonts, styles

## Application bootstrap

The runtime flow is:

1. src/main.jsx mounts the app.
2. src/app/index.jsx composes Providers, AppWrapper, and Modules.
3. Providers wires Redux, Router, i18n, theme, and global styles.
4. AppWrapper runs initialization hooks on startup.
5. Modules defines the route tree and wraps protected sections.

## Routing and module organization

Routing is defined in src/modules/index.jsx with React Router's useRoutes.

Main route groups:

- /auth — login/register flow
- /welcome — onboarding and initial setup flow
- /account — authenticated application shell
   - /account/dashboard
   - /account/edo
   - /account/warehouse
   - /account/bank-and-cash
   - /account/reports-and-analytics
   - /account/hr-and-payroll
   - /account/fixed-and-intangible-assets
   - /account/taxes
   - /account/profile

Protected routes are wrapped with Account, Layout, and SubscriptionGuard where relevant.

## Shared architecture patterns

### 1) Service layer

All API calls go through src/services/index.js and the centralized API wrapper in src/shared/api.js.

Important notes:

- Use the shared services entrypoint: import services from '@services'
- Prefer existing service modules instead of calling axios directly from components
- The API wrapper adds auth headers, language headers, error handling, and response transformation
- The wrapper uses VITE_API_URL from the environment

### 2) State management

State lives in Redux Toolkit under src/shared/store/.

Slices:

- common — shared reference data and cross-feature state
- ui — UI state and interface preferences
- user — authentication, user profile, subscription plan, and status

Async logic is handled through thunks in the related extraReducers files.

### 3) Initialization hooks

App startup logic is centralized in src/shared/hooks/initialization/:

- useAuthorization — validates token and loads initial user state
- useCheckForUpdates — checks for app updates
- useErrorLogging — attaches error logging behavior
- useInitTheme — initializes theme-related state

### 4) Internationalization

Translations are managed in src/shared/i18n/ with resources for uz, ru, and en.

When adding UI strings:

- prefer existing translation keys
- add new keys in the relevant locale files
- keep the app language behavior consistent

## Module conventions

Most feature modules under src/modules follow this pattern:

- pages/ — main screens for the feature
- components/ — feature-local UI pieces
- hooks/ — feature-specific stateful logic (when needed)
- index.jsx — module entry or route wiring

When implementing a new feature:

1. Place the screen or workflow in the correct module folder.
2. Reuse shared layout/components/hooks when possible.
3. Put API calls into the relevant service module under src/services/.
4. If the feature needs global state, extend the appropriate Redux slice rather than introducing ad hoc local state.
5. Add or update routes in src/modules/index.jsx if the feature is navigable.

## Styling and UI conventions

- Global styles are imported in src/app/Providers.jsx
- Tailwind is used, but there are also legacy/global CSS files under src/assets/styles
- Prefer existing shared components and styling patterns over introducing one-off UI
- Respect the current visual language and spacing patterns

## Onboarding flow

Current flow:

1. App initialization checks the profile.
2. Redux stores auth status such as LOADING, SUCCESS, ERROR, SERVER_ERROR, and WELCOME.
3. Routes and guards decide whether the user can enter protected sections.

Important: do not break the token/auth initialization flow when changing login, logout, profile, or welcome behavior.

## API and environment notes

The app targets multiple environments through VITE_API_URL.

Expected environment behavior:

- production/demo/dev hosts are handled by the configured API layer
- local development usually relies on the VITE_API_URL value

When changing API behavior, keep the shared service wrapper in mind and preserve its error handling semantics.

## Code style expectations

Follow the existing codebase style:

- semicolons are used
- indentation is 3 spaces in most files
- use existing import aliases from jsconfig.json
- prefer existing helpers and shared utilities over new ad hoc logic
- keep changes localized and consistent with surrounding modules

## Path aliases

The project uses the following aliases:

- @assets
- @modules
- @shared

These aliases are configured in jsconfig.json and should be preferred for imports.

## Verification before completion

Before considering a change complete, verify it with the relevant project checks.

Preferred verification:

```bash
yarn lint
yarn build
```

For documentation-only changes, confirm the updated file content is correct and consistent with the codebase.

## Practical guidance for Claude

- Explore existing modules before making changes; this codebase is highly interconnected.
- Prefer extending existing flows rather than inventing parallel patterns.
- Keep new UI components reusable and shared when possible.
- Respect the service-driven architecture rather than bypassing it.
- Be careful with auth, subscription, and document workflow changes because they affect core business logic.
- When in doubt, follow the existing implementation patterns in the nearest similar module.
