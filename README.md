# E-Commerce Product Customization System

E-Commerce Product Customization System with multi-step variant selection, real-time 3D preview, dynamic pricing and advanced cart management.

## Features

1. 3D Product Preview - Interactive 3D models with real-time customization

1. Product Configurator - Customize color, material, and size with instant pricing

1. Smart Cart - Persistent storage, multi-tab sync, save for later

1. Advanced Search - Faceted filtering, real-time search, URL persistence

1. Performance Optimized - Code splitting, lazy loading, virtualized lists

## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Next.js
- **State Management:** Zustand

## Known Limitations

1. No real backend — all data is static mock.
2. Checkout button is present but has no payment flow (placeholder).
3. IndexedDB persistence means cart survives page refresh; clearing cookies/storage resets it.

## Project Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Sabbir2809/ecommerce-product-customization
   cd ecommerce-product-customization
   ```

2. Install dependencies:

   ```bash
   yarn install # npm install
   ```

3. Run the development server:
   ```bash
   yarn dev
   ```
4. Open `http://localhost:3000` in your browser.
