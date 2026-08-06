# AGENTS.md

## Review Procedure

The code review follows the steps listed below. If there are critical issues at the top level, the review stops until they are fixed.

- **User-Friendly Application Behavior**: Includes error output, button disabling, and display of ongoing processes.
- **Slice Organization**: Proper structuring of slices in the application.
- **Component Implementation**: Correct implementation of all required components.
- **Styling**: Adherence to the specified design guidelines.
- **README.md Badges**: GitHub Actions badges are present in the README.md file.
- **Repository Cleanliness**: No unnecessary temporary files or directories in the repository. All irrelevant items are added to .gitignore.
- **Reference to Example**: Ensure alignment with the provided design reference. The reference implementation is located in the file `reference-chat.html` within the `/examples` directory. Pay special attention to:
    - Layout structure (flexbox containers: `.header`, `.main-container`, `.sidebar`, `.chat-area`).
    - Color variables defined in `:root`.
    - Interaction states (hover/focus effects on buttons and list items).

## Services

- **GitHub Actions Badge**: The GitHub Actions badge must be green, indicating that all checks pass.
- **Code Standards Checks**: GitHub Actions verify adherence to coding standards.

## Code

- **Bootstrap Usage**: Only standard Bootstrap mechanisms are used (no custom overrides).
- **API Routing**: API links are constructed using functions rather than being hardcoded (routing via functions).

