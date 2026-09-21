# CourtSync – Badminton Academy Management System

CourtSync is a complete, full-stack Badminton Academy Management System built with a **React + TypeScript + Vite** frontend and a robust **Node.js + Express + TypeScript + MongoDB** backend.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS, Custom Glassmorphism UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context API (`AuthContext`, `DataContext`, `ThemeContext`, `ToastContext`)

### Backend
- **Runtime**: Node.js, TypeScript (`ts-node-dev`)
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) & `bcryptjs` password hashing
- **Security & Middleware**: CORS, Centralized Error Handling, Role-Based Authorization Guards

---

## 📁 Project Structure

```
courtsync/
├── src/                    # React Frontend
│   ├── components/         # Layout & UI components
│   ├── context/            # Global Auth, Data, Theme & Toast contexts
│   ├── pages/              # Dashboard, Students, Coaches, Attendance, Payments, Matches, Reports, Profile, Settings
│   ├── services/           # API Client Service (api.ts)
│   ├── types/              # TypeScript interfaces
│   └── data/               # Mock data & fallback initializers
├── backend/                # Express & TypeScript Backend
│   ├── src/
│   │   ├── config/         # Database configuration (db.ts)
│   │   ├── controllers/    # Route handler controllers (Auth, Players, Coaches, Batches, Courts, Bookings, Attendance, Dashboard)
│   │   ├── middleware/     # Auth guard & Error handling middleware
│   │   ├── models/         # Mongoose Schemas (User, Player, Coach, Batch, Court, Booking, Attendance)
│   │   ├── routes/         # Express Router modules
│   │   ├── utils/          # Seeder script (seed.ts)
│   │   └── server.ts       # Main Express application entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── package.json            # Root workspace scripts
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18+ installed
- **MongoDB**: Local MongoDB server running at `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI.

---

### Step 1: Install Dependencies

Install root and backend packages:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

---

### Step 2: Configure Environment Variables

Create a `.env` file in the `backend/` folder (or copy from `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/courtsync
JWT_SECRET=courtsync_super_secret_jwt_key_2026_safe_key
CORS_ORIGIN=http://localhost:5173
```

---

### Step 3: Seed Sample Data

Populate MongoDB with default Admin, Coach, Student accounts, courts, batches, and bookings:

```bash
# From the root directory:
npm run backend:seed

# Or inside the backend directory:
cd backend
npm run seed
```

Default credentials seeded into MongoDB:
- **Admin**: `admin@courtsync.com` / `admin123password`
- **Coach**: `vikram@courtsync.com` / `coach123password`
- **Student**: `alex.chen@courtsync.com` / `student123password`

---

### Step 4: Run the Application

You can run both servers in separate terminal tabs:

#### 1. Start the Backend API (Port 5000):
```bash
# From root directory:
npm run backend:dev

# Or from backend directory:
cd backend
npm run dev
```

#### 2. Start the Frontend App (Port 5173):
```bash
# From root directory:
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 REST API Endpoints Overview

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/health` | GET | Public | Health check endpoint |
| `/api/auth/login` | POST | Public | User authentication & JWT issuance |
| `/api/auth/me` | GET | Private | Fetch authenticated user profile |
| `/api/players` | GET, POST | Private | Get player list (with search/filters) / Add player |
| `/api/players/:id` | GET, PUT, DELETE | Private | Get profile / Update / Delete player |
| `/api/coaches` | GET, POST | Private | Get coach list / Add coach |
| `/api/coaches/:id` | GET, PUT, DELETE | Private | Get profile / Update / Delete coach |
| `/api/batches` | GET, POST | Private | Get batches / Create new batch |
| `/api/batches/:id/schedule` | PUT | Private | Set training days and timings |
| `/api/batches/:id/assign-coach` | PUT | Private | Assign head coach to batch |
| `/api/courts` | GET, POST | Private | List courts / Add new court |
| `/api/courts/availability` | GET | Public | Check court slot availability for a date |
| `/api/bookings` | GET, POST | Private | View bookings / Book court with conflict detection |
| `/api/bookings/:id/cancel` | PUT | Private | Cancel court booking |
| `/api/attendance` | GET, POST | Private | View attendance / Mark single player attendance |
| `/api/attendance/bulk` | POST | Private | Mark bulk attendance for a batch |
| `/api/attendance/history/:studentId` | GET | Private | Get player attendance history |
| `/api/dashboard` | GET | Private | Summary metrics (Total players, coaches, courts, bookings) |

---

## 🛡️ Double Booking Conflict Prevention

The CourtSync backend prevents overlapping bookings on the same court for the same date. When a request is sent to `POST /api/bookings`, the system checks:
- Existing confirmed bookings for the target court and date.
- Overlapping time slots using boundary checks: `(newStart < existingEnd) && (newEnd > existingStart)`.
- Returns an HTTP `400 Bad Request` with an explicit conflict warning if an overlap occurs.
