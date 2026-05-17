# Hintro Mock Dashboard

This project is a pixel-perfect, responsive React frontend implementation of the Hintro Mock Dashboard. It strictly follows the provided Figma designs, fetches dynamic data from a mock backend API, and ensures a clean, modern user interface.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Functional Features](#functional-features)
- [Conventions and Assumptions](#conventions-and-assumptions)
- [Project Structure](#project-structure)
- [Local Setup and Run Instructions](#local-setup-and-run-instructions)

## Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (CSS Variables / Design Tokens for consistent theming)
- **Data Fetching:** Fetch API with Custom React Hooks
- **Icons:** Inline SVGs matching Figma specifications

## Functional Features
- **Pixel-Perfect Parity:** Implements the exact margins, typography, and SVG icons from the provided Figma layouts.
- **Dynamic Data Integration:** Connects to the Hintro mock APIs to populate user statistics, call sessions, and profile data. 
- **Empty vs. Populated States:** Handles "No Recent Calls" and empty stat blocks dynamically based on the active user session data. Includes a simple toggle in the header to switch between User 1 (Empty) and User 2 (Populated).
- **Responsive Layout:** Automatically adapts to mobile screens (max-width: 768px) featuring a slide-out hamburger sidebar.
- **Feedback Module:** Includes an interactive Feedback modal that persists user feedback directly to the browser's LocalStorage.

## Conventions and Assumptions
- **Design Overrides:** Global styling and themes are driven by a centralized `index.css` acting as a single source of truth for color tokens, radiuses, and fonts. Hardcoded hex colors are strictly avoided outside of index.css and specific exact SVG colorations.
- **Component Modularity:** Each piece of the UI is broken into its own folder (e.g., `src/components/Header/Header.jsx` and `Header.css`) to maintain clean separation of concerns and styling.
- **Time Measurements:** The mock API data for durations is assumed to be provided in seconds. A formatting utility converts these directly to "m" and "sec" displays.
- **Icons:** Rather than importing a heavy external library (like FontAwesome or Lucide), required icons have been hand-coded as inline SVGs for maximum performance and visual accuracy against Figma.

## Project Structure
```text
src/
├── api/             # API request wrappers
├── components/      # React components and scoped CSS files
├── context/         # React Context (UserContext for switching profiles)
├── hooks/           # Custom React hooks (useApi)
├── utils/           # Helper functions (Time formatters, text formatting)
├── App.jsx          # Main application orchestrator
├── main.jsx         # React application entrypoint
└── index.css        # Global CSS theme variables
```

## Local Setup and Run Instructions

1. **Prerequisites**
   Ensure you have Node.js installed (v18 or higher is recommended).

2. **Installation**
   Open your terminal and navigate to the project root directory. Install the necessary dependencies using npm:
   ```bash
   npm install
   ```

3. **Running the Development Server**
   Start the Vite development server to view the application:
   ```bash
   npm run dev
   ```

4. **Viewing the Dashboard**
   Once the server starts, it will output a localhost URL (usually `http://localhost:5173`). Open this URL in your web browser. 

5. **Building for Production**
   If you wish to create a production-ready optimized build, run:
   ```bash
   npm run build
   ```
   The compiled output will be placed in the `dist` directory.
