# Lumière — Curated Luxury Fashion Marketplace

Lumière is a premium, high-end marketplace web application designed for independent fashion creators, luxury curators, and premium sellers. It offers a visually stunning, editorial-inspired shopping experience powered by a robust backend and a highly responsive React client.

The application features a **Premium Motion System** modeled after editorial luxury brands, ensuring smooth, cubic-bezier transitions, progressive content reveals, and minimal visual noise.

---

## 🌟 Key Features

### 🛍️ Luxury Marketplace Home
- **Curated Discoveries**: Discover exclusive fashion pieces presented on an elegant card layout.
- **Search & Filtering**: Real-time search, sorting (newest, low-to-high, high-to-low), and currency filtering.
- **Shared Image Carousel**: A custom, highly optimized image carousel with subtle dot indicators, absolute slide count badges, and smooth horizontal slide animations.
- **View Details Banner**: Replaced the central eye button overlay with a premium slide-up glassmorphic "VIEW DETAILS" banner at the bottom of the image card container on hover.

### 🛒 Premium Shopping Cart
- **Protected Cart Route**: Access to the `/cart` page is restricted to logged-in buyers. Guest users are redirected to `/login` smoothly.
- **Interactive Stepper**: A custom-designed `[-] Quantity [+]` stepper with micro-interaction hover and click scaling, replacing default browser number controls.
- **Silent Background Syncing**: Quantity changes update silently in the background, removing unmount/remount loading flashes for a seamless user experience.
- **Variant-Specific Rendering**: Dynamically matches and displays selected variant attributes (Color, Size, Material) and displays the variant-specific image (with product image fallback).
- **Redux-Integrated Local State**: Manage quantities, removals, and additions instantly with clean state slice actions.
- **Price Update Alert Banner**: Renders a warning notification container displaying old vs. new price differences if an item's price changed after being added to the cart.
- **Original Product Reversion**: Attribute group selectors feature an `"Original"` chip that resets active selections and safely points the viewport back to the base product.
- **Dynamic Summary**: Order summary module powered directly by the backend Mongoose aggregation pipeline, displaying subtotal, platform fee, tax, and grand totals without redundant frontend client-side calculation loops.
- **Available Stock Counters & Caps**: Real-time inline counter badges color-coded in muted luxury shades (emerald green for high stock, amber for low inventory, red for last items) that disable the stepper increment controls automatically when stock caps are reached.
- **Animated Cart Icon & Badge**: Fixed header shopping bag icon displaying current cart item counts with a subtle scale pop animation on badge count changes.

### 👔 Seller Workspace
- **Personal Dashboard**: Track and manage all active listings with interactive controls.
- **Seamless Creation Flow**: Add and edit listings using a clean wizard-style form built with reusable, bottom-bordered inputs (`WorkspaceInput`).
- **Variant Attribute Deduplication**: Key preset choices (Size, Color, Material) are filtered out dynamically from selection dropdowns once used in another row to prevent duplicate configuration conflicts.
- **State-Batched Custom Inputs**: Preset dropdowns instantly toggle into manual text inputs upon choosing the top-aligned "Custom..." option.
- **Interactive Image Upload**: Drag-and-drop or select multiple photos with an interactive preview grid.

### 🔒 Secure Authentication
- **Dual-Method Auth**: Local credentials (secured via JWT and BCrypt) and integrated Google OAuth login.
- **Security Trust Badges**: Inline certificates and badges verifying encryption and trust directly below submit actions.
- **Form Validation**: Client-side validation with real-time animated error states and server-side model constraints.

### 🎬 Editorial Motion System
- **Page Transitions**: Content fades and staggers progressively from `20px` below on entry over `650ms`.
- **Scroll Reveals**: Native `IntersectionObserver`-based fade-ups when sections enter the viewport.
- **Subtle Image Zoom**: Limits image scaling on hover to `1.02` max over a slow `900ms` transition.
- **Sleek Hover Cards**: Soft translation upward (`-3px`) on product and listing cards.

---

## 💻 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (ODM via [Mongoose](https://mongoosejs.com/))
- **Auth**: [Passport.js](https://www.passportjs.org/) (Local & Google OAuth 2.0) + [JSON Web Tokens (JWT)](https://jwt.io/) + [BCrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **File Uploads**: [Multer](https://github.com/expressjs/multer) + [@imagekit/nodejs](https://imagekit.io/)
- **Validation**: [Zod](https://zod.dev/) + [Express Validator](https://express-validator.github.io/docs/)

---

## 📁 Repository Structure

```filepath
day-27-snitch/
├── Backend/                   # Node.js Express server workspace
│   ├── src/
│   │   ├── config/            # DB, passport, and third-party API configs
│   │   ├── controllers/       # HTTP controllers (handling requests/responses)
│   │   ├── models/            # Mongoose schemas (User, Product, Payment)
│   │   ├── repositories/      # Database Access Layer (isolating DB queries)
│   │   ├── services/          # Business Logic Layer (handling workflows/integrations)
│   │   ├── routes/            # Express route groups (auth.routes.js, product.routes.js)
│   │   ├── middlewares/       # Authentication, file uploads, errors
│   │   └── validators/        # Express Request input validation rules
│   ├── server.js              # Entrypoint file
│   └── .env                   # Environment configurations (local-only)
│
├── Frontend/                  # React client workspace (Vite)
│   ├── src/
│   │   ├── app/               # Root routing config & App.css styles
│   │   ├── features/
│   │   │   ├── auth/          # Authentication pages, components, & assets
│   │   │   ├── cart/          # Premium shopping cart layout, item lists, summaries, & Redux state
│   │   │   ├── shared/        # Shared application components (Nav.jsx, Footer.jsx, Toast.jsx)
│   │   │   └── products/      # Products catalog, marketplace, and seller dashboard
│   │   │       ├── components/
│   │   │       │   ├── shared/# Deduplicated widgets (ImageCarousel, WorkspaceInput)
│   │   │       │   └── ...
│   │   │       └── pages/     # Home, Dashboard, Create Listing, Product details
│   │   └── main.jsx           # React app mount script
│   └── package.json           # Frontend dependency list
```

---

## 🏛️ Architectural Patterns

### Service/Repository Pattern (Backend)
To decouple database implementation details from business workflows, the codebase implements the **Service/Repository Pattern**:
- **Controllers** (`controllers/`): Primarily parse request inputs, delegate processing to Services, and format output API responses.
- **Services** (`services/`): Handle the business validation, workflow coordination, calculations, and integrations (e.g., Razorpay API orchestration).
- **Repositories** (`repositories/`): Contain isolated Mongoose database query and mutation logic, shielding higher layers from direct model interactions.

### Dynamic Role-Based Layouts (Frontend)
The frontend utilizes reactive state-based conditions to toggle views immediately after changes to the authenticated user's state:
- **Navbar Integration**: Dynamically toggles navigation links (e.g., showing `"Become a Seller"` for Guests and Buyers, and `"Dashboard"` for Sellers) utilizing the Redux Toolkit auth slice.


## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB running locally or a MongoDB Atlas connection string
- ImageKit Account (for listing image hosting)
- Google Developer Console credentials (if Google OAuth is enabled)

---

### Backend Configuration

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (or update the existing one) with the following values:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_signing_secret
   NODE_ENV=development
   
   # Passport Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # ImageKit Configuration (for asset uploads)
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will launch on `http://localhost:3000`.

---

### Frontend Configuration

1. Navigate to the `Frontend` directory:
   ```bash
   cd ../Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be served at `http://localhost:5173`.

4. **Production Build**:
   To compile and minify the frontend assets for production:
   ```bash
   npm run build
   ```

---

## 🚀 Running the Whole Project

In development mode, you should keep both the backend and frontend dev servers running simultaneously. 

Once started:
1. Open your browser and go to `http://localhost:5173`.
2. Registers or logs in using standard inputs or your Google account.
3. Access the **Seller Dashboard** to post a product, upload luxury item images, and set pricing details.
4. Return to the homepage to verify searching, filters, and staggered scroll-reveal animations.
