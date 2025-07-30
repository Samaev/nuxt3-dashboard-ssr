# Nuxt 3 SSR Dashboard

A fully functional **SSR Dashboard** built with **Nuxt 3**, using **Pinia** for state management and **Tailwind CSS** for styling.  
This project simulates user authentication and protected routing using a static JSON user list and supports role-based access control.

---

## 🚀 Features Implemented

### ✅ Core Requirements

- **Login System**
    - Static login using users from a local JSON file
    - Role-based access: only `admin` users can access `/users` page
    - Authentication state is persisted with `pinia-plugin-persistedstate`

- **Dashboard Page** (`/dashboard`)
    - Shows total users, admins, and regular users
    - Animated counters implemented via a `useAnimatedCounter` composable

- **Users Page** (`/users`)
    - Accessible **only to admins** (middleware protected)
    - Displays user cards in a responsive grid
    - Includes search by name/email and country filter
    - Pagination (10 users per page)

- **Navbar**
    - Responsive mobile & desktop navigation
    - Shows initials and user role badge when logged in
    - Logout button clears state and redirects properly

- **Middleware**
    - `auth.ts` — protects authenticated routes
    - `admin-only.ts` — protects admin routes
    - SSR-aware logic using Nuxt middleware lifecycle

- **API Routes**
    - `/api/login` — validates credentials and returns safe user object
    - `/api/users` — returns users list **without passwords**
    - Raw passwords are never sent to client

---

## 🎁 Extra Features (Bonus)

- **Profile Page** (`/profile`)
    - Displays all current user info
    - Allows editing all fields except email
    - Uses `vue-select` (with async country list) for country dropdown
    - SweetAlert2 imitation used for save feedback

- **Composable Utilities**
    - `useInitials(name)` — generates initials with fallback
    - `useAnimatedCounter()` — animates numbers from 0 to target

- **TailwindCSS**
    - Project is fully styled using Tailwind 4.*
    - Custom global styles for buttons, etc.

- **Safe Auth Handling**
    - Password comparison only happens server-side
    - Passwords are never exposed in client code or fetch responses

---

## 🧪 Testing

Basic unit tests written using **Vitest**.

Tested:

- `useInitials()` utility with edge cases:
    - undefined input
    - single word
    - full name
    - extra spaces

Command:

```bash
npm run test
```

---

## 📦 Tech Stack

- [Nuxt 3](https://nuxt.com)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [VueSelect](https://vue-select.org/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Project Structure Highlights

```
/server/api/       ← Local JSON-based API endpoints
/middleware/        ← Route protection with SSR-aware logic
/composables/       ← Reusable animated counters, initials utils, etc.
/pages/             ← Login, Dashboard, Users, Profile
/stores/auth.ts     ← Pinia store with persistent user state
```

---

## 🛡 Security Considerations

- No password ever leaves the backend or JSON file.
- Login endpoint only returns safe user info.
- Middleware prevents unauthorized access before page renders (SSR-safe).

---

## ✅ Getting Started

```bash
npm install
npm run dev
```

---

## 🔗 Author

Andrey Samaiev  
Frontend Engineer | Vue, Nuxt, SSR, TypeScript  
Location: Greece (Remote)  
Email: andreysamaev@gmail.com