# Feature Implementation Guide - Roots n Routes

This guide provides technical details and conventions for developing features within the Roots n Routes codebase. Please refer to this guide when building new components or adding functionality.

## 1. Directory Structure

Understanding the project layout is key:

*   **`app/`**: Contains all application routes, following the Next.js App Router conventions.
    *   Each folder represents a URL segment.
    *   `page.tsx`: Defines the UI for a specific route.
    *   `layout.tsx`: Defines shared UI for a segment and its children.
    *   `loading.tsx` / `error.tsx`: Convention-based files for loading and error UI.
    *   `[folderName]/`: Dynamic route segments (e.g., `app/destinations/[city]/page.tsx`).
*   **`components/`**: Holds all React components.
    *   **`components/ui/`**: Base UI components generated by `shadcn/ui`. These are generally not modified directly but are imported and used by custom components.
    *   **`components/` (root):** Custom components specific to this application (e.g., `Header`, `FlightCard`, `DestinationsSection`). These often compose components from `components/ui/`.
*   **`contexts/`**: Contains React Context providers for global state management (e.g., `AuthContext`).
*   **`lib/`**: Utility functions, constants, type definitions, and potentially shared data structures.
    *   `lib/utils.ts`: General utility functions (like the `cn` helper).
    *   `lib/navigationData.ts`: Example of static data definition. Consider creating a `lib/data/` subdirectory if static data grows.
*   **`public/`**: Static assets accessible directly via URL.
    *   **`public/images/`**: Store all images and icons here.
*   **`styles/`**: Contains global stylesheets.
    *   `app/globals.css`: Used for base Tailwind directives and potentially global custom styles.

## 2. Component Development

*   **Location:** Create new custom components directly within the `components/` directory unless they are highly specific UI primitives (which is unlikely given `shadcn/ui`).
*   **Naming:** Use PascalCase for component file names and component function names (e.g., `UserProfileButton.tsx`, `function UserProfileButton() {}`).
*   **Composition:** Prefer composing smaller components. Utilize components from `components/ui/` as building blocks for your custom components.
*   **Props:** Use TypeScript interfaces to define component props clearly.
    ```typescript
    interface FlightCardProps {
      isHighlighted?: boolean;
      // ... other props
    }

    export default function FlightCard({ isHighlighted = false, ... }: FlightCardProps) {
      // ... component logic
    }
    ```
*   **State:** Use React hooks (`useState`, `useReducer`) for local component state. Use the `AuthContext` (or other future contexts) for global state. Avoid prop drilling where possible; consider Context or state management libraries if state needs to be shared across many distant components.
*   **Server vs. Client Components:** Understand the difference in the App Router. Use `"use client"` at the top of files that require hooks (`useState`, `useEffect`, `useContext`) or event handlers. Keep components as Server Components where possible for better performance.

## 3. Styling

*   **Tailwind CSS:** This is the primary styling method. Use utility classes directly in your JSX.
*   **`cn` Utility:** Use the `cn` function imported from `lib/utils` for conditionally applying Tailwind classes:
    ```jsx
    <div className={cn("p-4", isHighlighted ? "border-2 border-yellow-500" : "border border-gray-200")}>
      {/* ... */}
    </div>
    ```
*   **Custom CSS:** Avoid writing custom CSS files unless absolutely necessary. If needed, add global styles to `app/globals.css`. For component-specific complex styles not achievable with Tailwind, consider CSS Modules (though Tailwind should cover most cases).
*   **`shadcn/ui` Theming:** Colors and styles are largely controlled by Tailwind configuration (`tailwind.config.js`) and CSS variables defined in `app/globals.css`, following `shadcn/ui` conventions. Modify these for theme adjustments.

## 4. Data Handling

*   **Static Data:** For data that doesn't change often (like navigation links, categories), define it in files within the `lib/` directory (e.g., `lib/navigationData.ts`). Import this data into components as needed.
*   **Dynamic Data (Current):** Currently, some "dynamic" data is hardcoded within component files (e.g., `recentlyViewedItems`). This is suitable for prototyping but should be replaced.
*   **Dynamic Data (Future - API):**
    *   For data fetched from an API:
        *   Use Server Components with `async/await` for server-side fetching where possible.
        *   Use `useEffect` in Client Components for client-side fetching (e.g., data that depends on user interaction).
        *   Implement loading states (e.g., using `loading.tsx` or conditional rendering with state variables).
        *   Implement error handling (e.g., using `error.tsx` or try/catch blocks).

## 5. Routing & Linking

*   **Pages:** Create new pages by adding folders and `page.tsx` files within the `app/` directory.
*   **Linking:** Use the `Link` component from `next/link` for internal navigation. This enables client-side navigation without full page reloads.
    ```jsx
    import Link from 'next/link';

    <Link href="/destinations/lagos">Explore Lagos</Link>
    ```

## 6. Icons

*   Use the `lucide-react` library for icons consistently. Import icons directly:
    ```jsx
    import { ChevronRight, Star } from 'lucide-react';

    <ChevronRight size={16} />
    <Star className="text-yellow-500" />
    ```

## 7. Other Conventions

*   **TypeScript:** Leverage TypeScript for type safety. Define interfaces for props and complex objects.
*   **Accessibility (A11y):** Use semantic HTML elements. Ensure interactive elements are keyboard navigable. Add appropriate ARIA attributes where necessary (though `shadcn/ui` handles much of this). Use meaningful `alt` text for images.

---

*This guide provides a starting point. Feel free to discuss and update these conventions as the project evolves.*
