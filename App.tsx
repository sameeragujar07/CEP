import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Coaches } from './pages/Coaches';
import { Attendance } from './pages/Attendance';
import { Payments } from './pages/Payments';
import { Matches } from './pages/Matches';
import { Reports } from './pages/Reports';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* Login Route */}
                <Route path="/login" element={<Login />} />

                {/* Main App Layout */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />

                  {/* Standard Navigation Routes */}
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="students" element={<Students />} />
                  <Route path="coaches" element={<Coaches />} />
                  <Route path="attendance" element={<Attendance />} />
                  <Route path="payments" element={<Payments />} />
                  <Route path="matches" element={<Matches />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />

                  {/* Admin Sub-Routes Aliases */}
                  <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
                  <Route path="admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
                  <Route path="admin/students" element={<ProtectedRoute allowedRoles={['admin']}><Students /></ProtectedRoute>} />
                  <Route path="admin/coaches" element={<ProtectedRoute allowedRoles={['admin']}><Coaches /></ProtectedRoute>} />
                  <Route path="admin/attendance" element={<ProtectedRoute allowedRoles={['admin']}><Attendance /></ProtectedRoute>} />
                  <Route path="admin/payments" element={<ProtectedRoute allowedRoles={['admin']}><Payments /></ProtectedRoute>} />
                  <Route path="admin/matches" element={<ProtectedRoute allowedRoles={['admin']}><Matches /></ProtectedRoute>} />
                  <Route path="admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><Reports /></ProtectedRoute>} />
                  <Route path="admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><Settings /></ProtectedRoute>} />

                  {/* Coach Sub-Routes Aliases */}
                  <Route path="coach" element={<ProtectedRoute allowedRoles={['coach', 'admin']}><Dashboard /></ProtectedRoute>} />
                  <Route path="coach/dashboard" element={<ProtectedRoute allowedRoles={['coach', 'admin']}><Dashboard /></ProtectedRoute>} />
                  <Route path="coach/students" element={<ProtectedRoute allowedRoles={['coach', 'admin']}><Students /></ProtectedRoute>} />
                  <Route path="coach/attendance" element={<ProtectedRoute allowedRoles={['coach', 'admin']}><Attendance /></ProtectedRoute>} />
                  <Route path="coach/matches" element={<ProtectedRoute allowedRoles={['coach', 'admin']}><Matches /></ProtectedRoute>} />
                  <Route path="coach/reports" element={<ProtectedRoute allowedRoles={['coach', 'admin']}><Reports /></ProtectedRoute>} />

                  {/* Student Sub-Routes Aliases */}
                  <Route path="student" element={<ProtectedRoute allowedRoles={['student', 'admin']}><Dashboard /></ProtectedRoute>} />
                  <Route path="student/dashboard" element={<ProtectedRoute allowedRoles={['student', 'admin']}><Dashboard /></ProtectedRoute>} />
                  <Route path="student/attendance" element={<ProtectedRoute allowedRoles={['student', 'admin']}><Attendance /></ProtectedRoute>} />
                  <Route path="student/payments" element={<ProtectedRoute allowedRoles={['student', 'admin']}><Payments /></ProtectedRoute>} />
                  <Route path="student/matches" element={<ProtectedRoute allowedRoles={['student', 'admin']}><Matches /></ProtectedRoute>} />
                  <Route path="student/profile" element={<ProtectedRoute allowedRoles={['student', 'admin']}><Profile /></ProtectedRoute>} />

                  {/* Fallback Catch-All */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
