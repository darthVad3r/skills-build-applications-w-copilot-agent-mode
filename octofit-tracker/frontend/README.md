# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit Tracker multi-tier application.

## API configuration

Define `VITE_CODESPACE_NAME` in `.env.local` when running the frontend in GitHub Codespaces:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, API requests use:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When it is not defined, the frontend safely falls back to:

```text
http://localhost:8000/api/[component]/
```

The data views normalize API responses that are returned as arrays, keyed collections such as `{ users: [...] }`, or paginated-style payloads such as `{ results: [...] }`.
