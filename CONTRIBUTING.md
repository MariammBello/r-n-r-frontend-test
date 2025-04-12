# Contributing to Roots n Routes

Thank you for contributing to the Roots n Routes project! As a small team, clear communication and a consistent workflow are key. This document outlines how we contribute to the code.

## Development Workflow


1.  **Find an Issue:**
    *   Go to the project's **Issues** tab on GitHub: [Link to Issues/Project Board](PROJECT_TASKS.md). This is our primary task board.
    *   Look for issues in the `To Do` column that are unassigned.
    *   If you have an idea or find a bug not listed, please create a new issue first to discuss it with the team.

2.  **Claim the Issue:**
    *   Assign the issue to yourself on GitHub. This lets the team know you're working on it.

3.  **Create a Branch:**
    *   Ensure your local `main` branch is up-to-date:
        ```bash
        git checkout main
        git pull origin main
        ```
    *   Create a new branch from `main`. Use the following naming convention:
        ```bash
        # Example: git checkout -b feature/123-flight-search-ui
        git checkout -b <type>/<issue-number>-<short-description>
        ```
        *   `<type>`: `feature`, `bugfix`, `refactor`, `chore`, `docs`.
        *   `<issue-number>`: The number from the GitHub Issue.
        *   `<short-description>`: A brief, kebab-case summary (e.g., `flight-search-ui`, `fix-header-layout`).

4.  **Develop:**
    *   Write your code, following the guidelines in the **[Feature Implementation Guide](FEATURE_IMPLEMENTATION_GUIDE.md)**.
    *   Make sure your changes address all requirements of the issue.
    *   Commit your changes frequently with clear messages. Reference the issue number (e.g., `git commit -m "feat: Add search input component (#123)"`).

5.  **Push Your Branch:**
    *   Push your feature branch to the GitHub repository:
        ```bash
        git push origin <your-branch-name>
        ```

6.  **Create a Pull Request (PR):**
    *   Go to the repository page on GitHub and create a Pull Request from your branch targeting the `main` branch.
    *   **Title:** Write a clear title (e.g., "Feature #123: Implement Flight Search UI").
    *   **Description:**
        *   Briefly describe the changes ("What and Why").
        *   Link the PR to the issue using `Closes #123`, `Fixes #123`, or `Resolves #123`.
        *   Include screenshots/GIFs for UI changes.
    *   Assign one or both other team members as reviewers.

7.  **Code Review:**
    *   Review each other's code promptly. Provide constructive feedback.
    *   Address any requested changes by pushing additional commits to your feature branch. Discuss any disagreements respectfully.

8.  **Merge:**
    *   Once the PR has at least **one approval** and any automated checks pass, the **PR author** can merge it into the `main` branch (using "Squash and merge" is preferred).
    *   Delete the source branch after merging via the GitHub UI.

## Technical Guidelines

*   **Implementation Details:** For specifics on code structure, component creation, styling, data handling, etc., refer to the **[Feature Implementation Guide](FEATURE_IMPLEMENTATION_GUIDE.md)**.
*   **Code Style:** We use Prettier (auto-formatting) and ESLint (linting). Ensure these checks pass. Configure your editor to format on save if possible.
*   **Commit Messages:** Use conventional commit messages (e.g., `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).

