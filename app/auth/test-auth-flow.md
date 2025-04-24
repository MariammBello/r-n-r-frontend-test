# Authentication Flow Testing Guide (Mock Implementation)

This document outlines the steps to manually test the different authentication flows using the current mock API setup.

**Prerequisite:** Ensure the development server is running (`pnpm run dev`).

---

## Test Flow 1: Existing User Sign-In (Password)

1.  **Start:** Go to `/auth/login` in your browser.
2.  **Email:** Enter `test@example.com`.
3.  **Click "Continue"**:
    *   **Expected:** Redirect to `/auth/verify?flowType=signin&email=test%40example.com`.
4.  **Verification Page (`/auth/verify`):**
    *   Verify heading is "Let's confirm it's you".
    *   Verify "Sign In with Password" button *is visible*.
    *   Click the **"Sign In with Password"** button.
5.  **Password Page (`/auth/input-password`):**
    *   **Expected:** Redirect to `/auth/input-password?email=test%40example.com`.
    *   Verify the page design.
    *   Enter the mock password: `password`.
    *   Click the **"Sign In"** button.
6.  **Verification Page (Again):**
    *   **Expected:** Redirect back to `/auth/verify?flowType=signin&email=test%40example.com`.
    *   Enter the mock OTP: `123456`.
    *   Click **"Continue"**.
7.  **Result:**
    *   **Expected:** Redirect to the homepage (`/`) and appear logged in (as "Verified User").

---

## Test Flow 2: Existing User Sign-In (OTP)

1.  **Start:** Go to `/auth/login` in your browser.
2.  **Email:** Enter `test@example.com`.
3.  **Click "Continue"**:
    *   **Expected:** Redirect to `/auth/verify?flowType=signin&email=test%40example.com`.
4.  **Verification Page (`/auth/verify`):**
    *   Verify heading is "Let's confirm it's you".
    *   Verify "Sign In with Password" button *is visible*.
    *   Enter the mock OTP: `123456`.
    *   Click **"Continue"**.
5.  **Result:**
    *   **Expected:** Redirect to the homepage (`/`) and appear logged in (as "Verified User").

---

## Test Flow 3: New User Sign-Up

1.  **Start:** Go to `/auth/login` in your browser.
2.  **Email:** Enter any email *other than* `test@example.com` (e.g., `new.user@example.com`).
3.  **Click "Continue"**:
    *   **Expected:** Redirect to `/auth/verify?flowType=signup&email=new.user%40example.com`.
4.  **Verification Page (`/auth/verify`):**
    *   Verify heading is "Let's confirm your mail".
    *   Verify "Sign In with Password" button is *hidden*.
    *   Enter the mock OTP: `123456`.
    *   Click **"Continue"**.
5.  **Sign-Up Page (`/auth/signup`):**
    *   **Expected:** Redirect to `/auth/signup?email=new.user%40example.com`.
    *   Verify the page design ("Complete Sign Up").
    *   Fill in the form fields (First Name, Last Name, etc.).
    *   Click **"Continue"**.
6.  **Result:**
    *   **Expected:** Redirect to the homepage (`/`) and appear logged in (as a new user with the details entered).

---

## Test Flow 4: Forgot Password

1.  **Start:** Go to `/auth/forgot-password` in your browser.
2.  **Email:** Enter any email (e.g., `test@example.com`).
3.  **Click "Continue"**:
    *   **Expected:** Redirect to `/auth/verify?flowType=forgot&email=test%40example.com`.
4.  **Verification Page (`/auth/verify`):**
    *   Verify heading is "Let's confirm it's you".
    *   Verify "Sign In with Password" button is *hidden*.
    *   Verify "Contact our help center" link *is visible*.
    *   Enter the mock OTP: `123456`.
    *   Click **"Continue"**.
5.  **Result:**
    *   **Expected:** Redirect to the homepage (`/`) and appear logged in (as "Verified User").

---

## Key Mock Values for Testing

*   **Existing User Email:** `test@example.com`
*   **Existing User Password (for mock login):** `password`
*   **Valid OTP (for mock verification):** `123456`
