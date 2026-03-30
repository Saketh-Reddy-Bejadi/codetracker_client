# CodeTracker: Competitive Programming Leaderboard

CodeTracker is a powerful web application designed to track and visualize competitive programming performance for students. It aggregates data from multiple platforms, providing a unified leaderboard and personalized insights for batches and individual students. The system ensures data privacy through institutional email authentication and offers a modern, interactive experience.

## Features

*   **Institutional Authentication:** Secure Google Login restricted to institutional email addresses (e.g., `@cmrithyderabad.edu.in`).
*   **Dynamic Leaderboards:** Real-time performance tracking for different batches (e.g., 2026, 2027) with metrics across various platforms.
*   **Personal Dashboard:** Each student gets a dedicated dashboard to view their historical performance and platform-specific stats.
*   **User Profiles:** Manage and update handles for multiple competitive programming platforms from a single interface.
*   **Real-time Scraping Updates:** Visual indicators for the latest leaderboard data refreshes.
*   **Search and Filter:** Quickly find students by roll number or specific handles within their batch.
*   **Interactive UI:** Modern design with smooth transitions and animated components for a premium user experience.

## Technologies Used

*   **Frontend:**
    *   React 19: The latest version of the JavaScript library for building user interfaces.
    *   Vite 7: A next-generation frontend tool that focuses on speed and performance.
    *   Tailwind CSS 4: A utility-first CSS framework for rapid UI development.
    *   `react-router-dom`: Declarative routing for React applications.
    *   `axios`: Promise-based HTTP client for API communication.
    *   `jwt-decode`: Library for decoding JSON Web Tokens.
    *   `clsx` and `tailwind-merge`: Utilities for efficient Tailwind CSS class management.
    *   `lucide-react`, `react-icons`: Comprehensive icon sets.
    *   `motion`: Modern animation library for fluid UI transitions.
    *   `magicui`: High-performance UI components for enhanced aesthetics.
*   **Linting:**
    *   ESLint: Modern JavaScript and React linting configuration.

## Project Structure

```
.
├── public/
│   └── Codetrackr.svg       # Application logo
├── src/
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── magicui/         # Animated UI components
│   │   ├── Leaderboard.jsx  # Main leaderboard component
│   │   ├── UserProfile.jsx  # User profile and handle management
│   │   ├── Navbar.jsx       # Main navigation component
│   │   └── ...              # Other UI and layout components
│   ├── contexts/
│   │   └── AuthContext.jsx  # Authentication state management
│   ├── hooks/
│   │   └── useDebounce.js   # Custom React hooks
│   ├── lib/
│   │   └── utils.js         # Utility functions
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── App.jsx              # Main application with routing
│   ├── index.css            # Global styles and Tailwind imports
│   └── main.jsx             # Entry point
├── .env.example             # Example environment variables
├── package.json             # Dependencies and scripts
└── vite.config.js           # Vite configuration
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js) or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Saketh-Reddy-Bejadi/codetracker_client.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd codetracker_client
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variable:

```
VITE_API_BASE_URL=YOUR_BACKEND_API_URL
```

Replace `YOUR_BACKEND_API_URL` with the base URL of your backend API.

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically run on `http://localhost:5173` (or another available port).

To run the application on your network:

```bash
npm run host
# or
yarn host
```

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with the production-ready build.

## API Integration

The application interacts with a backend API for fetching user data, scraping statistics, and managing user handles. The API endpoints are defined in `src/services/api.js`.

## Deployment

The project is configured for deployment on Vercel, with a rewrite rule in `vercel.json` to serve `index.html` for all routes, which is typical for Single Page Applications (SPAs).

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---