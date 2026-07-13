# Day Out — Smart Trip Planning & Location Discovery Platform

A MERN stack application for discovering places and planning day trips.

- **M**ongoDB — database (via Mongoose)
- **E**xpress — REST API
- **R**eact — frontend (Vite)
- **N**ode.js — runtime

## Project Structure

```
Day-Out/
├── backend/                  # Express + MongoDB API
│   ├── src/
│   │   ├── config/           # DB connection
│   │   │   └── db.js
│   │   ├── controllers/      # Route handlers (business logic)
│   │   │   ├── authController.js
│   │   │   ├── placeController.js
│   │   │   └── tripController.js
│   │   ├── middleware/       # Auth & error handling
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── models/           # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Place.js
│   │   │   └── Trip.js
│   │   ├── routes/           # API route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── placeRoutes.js
│   │   │   └── tripRoutes.js
│   │   ├── utils/            # Helpers (JWT, async wrapper)
│   │   │   ├── asyncHandler.js
│   │   │   └── generateToken.js
│   │   └── app.js            # Express app setup
│   ├── server.js             # Entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/                 # React + Vite client
│   ├── src/
│   │   ├── api/              # Axios instance
│   │   │   └── axios.js
│   │   ├── components/       # Reusable UI
│   │   │   ├── Navbar.jsx
│   │   │   ├── PlaceCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/         # Global state (auth)
│   │   │   └── AuthContext.jsx
│   │   ├── pages/           # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Trips.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then edit values (Windows: copy .env.example .env)
npm run dev
```

The API runs at `http://localhost:5000`. Health check: `GET /api/health`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies `/api` to the backend.

## API Endpoints

### Auth
| Method | Endpoint             | Access  | Description            |
| ------ | -------------------- | ------- | ---------------------- |
| POST   | `/api/auth/register` | Public  | Register a new user    |
| POST   | `/api/auth/login`    | Public  | Login & receive token  |
| GET    | `/api/auth/me`       | Private | Get current user       |

### Places
| Method | Endpoint             | Access  | Description                    |
| ------ | -------------------- | ------- | ------------------------------ |
| GET    | `/api/places`        | Public  | List/search places             |
| GET    | `/api/places/nearby` | Public  | Nearby places (geo query)      |
| GET    | `/api/places/:id`    | Public  | Get a place                    |
| POST   | `/api/places`        | Private | Create a place                 |
| PUT    | `/api/places/:id`    | Private | Update a place                 |
| DELETE | `/api/places/:id`    | Private | Delete a place                 |

### Trips
| Method | Endpoint          | Access  | Description        |
| ------ | ----------------- | ------- | ------------------ |
| GET    | `/api/trips`      | Private | List user's trips  |
| GET    | `/api/trips/:id`  | Private | Get a trip         |
| POST   | `/api/trips`      | Private | Create a trip      |
| PUT    | `/api/trips/:id`  | Private | Update a trip      |
| DELETE | `/api/trips/:id`  | Private | Delete a trip      |

## License

MIT
