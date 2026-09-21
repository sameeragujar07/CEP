# Walkthrough - CourtSync Backend & API Integration

We have completed the backend implementation for **CourtSync – Badminton Academy Management System** using **Node.js, Express, TypeScript, MongoDB, and Mongoose**, and successfully integrated it with the existing React + TypeScript + Vite frontend.

---

## 🛠️ Key Accomplishments

### 1. Clean Backend Architecture (`backend/`)
- Setup Express application configured with TypeScript (`tsconfig.json`), CORS, environment variables (`dotenv`), and error handling middleware.
- Configured MongoDB connection utility in `backend/src/config/db.ts`.

### 2. Mongoose Schemas & Models (`backend/src/models/`)
- Created structured models for:
  - **`User`**: Admin, Coach, Student credentials with `bcryptjs` password hashing and password verification methods.
  - **`Player`**: Skills matrix (`smashPower`, `footwork`, `stamina`, `netControl`, `tacticalMind`), tier, batch, coach assignment, attendance %, notes.
  - **`Coach`**: Specializations, assigned courts, student count, rating, bio, experience years.
  - **`Batch`**: Name, tier, capacity, training days, timings, court assignment, player roster.
  - **`Court`**: Name, court type, hourly rate, surface, features, availability status.
  - **`Booking`**: Court, date, start/end time, booked by, purpose, status.
  - **`Attendance`**: Date, student ID, student name, batch, status (`Present` | `Absent` | `Late` | `Excused`), remarks.

### 3. JWT Authentication & Role Authorization (`backend/src/middleware/auth.ts`)
- JWT authentication middleware (`protect`) to verify `Bearer <token>`.
- Role-based authorization guard (`authorize('admin', 'coach')`) for restricted actions.

### 4. REST API Routes (`backend/src/routes/` & `backend/src/controllers/`)
Implemented comprehensive RESTful API endpoints:
- **`GET /api/health`**: Service health status.
- **`POST /api/auth/login`**: User authentication & JWT generation.
- **`GET /api/auth/me`**: Current user profile.
- **`GET`, `POST`, `PUT`, `DELETE /api/players`**: Player CRUD & search/filter.
- **`GET`, `POST`, `PUT`, `DELETE /api/coaches`**: Coach CRUD.
- **`GET`, `POST`, `PUT`, `DELETE /api/batches`**: Batch management, scheduling, coach assignment, player roster management.
- **`GET`, `POST`, `PUT`, `DELETE /api/courts`**: Court management & availability schedule.
- **`GET`, `POST`, `PUT`, `DELETE /api/bookings`**: Court booking with **Double Booking Conflict Detection**.
- **`GET`, `POST /api/attendance`**: Single & bulk attendance tracking with automatic player attendance % recalculation.
- **`GET /api/dashboard`**: Academy dashboard metrics aggregation.

### 5. Double Booking Conflict Detection
- Implemented time overlap boundary checks: `(newStart < existEnd) && (newEnd > existStart)`.
- Rejects conflicting booking attempts with HTTP 400 Bad Request and detailed conflict warning.

### 6. Database Seeder Script (`backend/src/utils/seed.ts`)
- Command: `npm run backend:seed`
- Seeds default Admin (`admin@courtsync.com` / `admin123password`), Coach, Student accounts, courts, batches, bookings, and attendance records.

### 7. Seamless Frontend API Client & Fallbacks
- Built frontend API client service in `src/services/api.ts`.
- Updated `AuthContext` and `DataContext` to perform live API interactions with smooth fallbacks.

---

## 🧪 Verification Results

1. **TypeScript Build Verification**:
   - `cd backend && npm run build` compiled with **0 errors**.
   - `npm run build` at root compiled with **0 errors**.

2. **Backend Server & Endpoint Verification**:
   - Backend running on `http://localhost:5000`.
   - `GET http://localhost:5000/api/health` returned `200 OK`:
     ```json
     {
       "status": "OK",
       "service": "CourtSync Backend API",
       "timestamp": "2026-08-22T12:29:22.809Z",
       "uptime": 56.56
     }
     ```

3. **Documentation**:
   - Updated [README.md](file:///d:/Sameera/courtsync/README.md) with complete setup commands, environment configuration, and API reference.

---

## 🚀 How to Run

### Backend Server (Port 5000):
```bash
npm run backend:dev
```

### Frontend Server (Port 5173):
```bash
npm run dev
```

### Seed MongoDB Data:
```bash
npm run backend:seed
```
