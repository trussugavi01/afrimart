# Afrimart Agro Trade

A stunning, responsive landing page for Africa's premier agricultural network, connecting farmers, suppliers, and businesses.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/trussugavi01/afrimart)

## Project Overview

This project is a visually stunning and pixel-perfect implementation of the Afrimart Agro Trade landing page. The application serves as the primary online presence for a premier agricultural network in Africa, designed to connect farmers, suppliers, and businesses. The page is built with a minimalist and clean aesthetic, emphasizing clarity, professionalism, and user trust.

## Key Features

- **Stunning Hero Section:** A powerful introduction with a clear call-to-action.
- **Feature Highlights:** A "Why Join" section showcasing key benefits with modern icons.
- **Social Proof:** A statistics section to build credibility and trust.
- **Compelling Call-to-Action:** A final, prominent CTA to drive user engagement.
- **Responsive Design:** A fully responsive layout that looks great on all devices, from mobile to desktop.
- **Professional Footer:** A clean and simple footer with essential information.

## Technology Stack

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Deployment:** Cloudflare Workers & Pages

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/afrimart-agro-trade.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd afrimart-agro-trade
    ```
3.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To run the development server and see the application in action, use the following command:

```sh
bun run dev
```

This will start the Vite development server, typically on `http://localhost:3000`. The page will automatically reload if you make changes to the source files.

## Deployment

This project is configured for easy deployment to the Cloudflare network.

To deploy the application, run the following command:

```sh
bun run deploy
```

This command will build the application and deploy it using the Wrangler CLI.

Alternatively, you can deploy directly from your GitHub repository with a single click:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/trussugavi01/afrimart)

## Project Structure

-   `src/`: Contains all the frontend source code.
    -   `components/`: Reusable React components, including shadcn/ui components.
    -   `pages/`: Main page components for different routes.
    -   `lib/`: Utility functions.
    -   `index.css`: Global styles and Tailwind CSS directives.
    -   `main.tsx`: The main entry point for the React application.
-   `worker/`: Contains the Cloudflare Worker server-side code.
-   `public/`: Static assets that are served directly.

## Contributing

Contributions are welcome! If you have suggestions for improving the application, please feel free to fork the repository and create a pull request. You can also open an issue with the "enhancement" tag.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.