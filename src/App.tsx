import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages'
import { AuthenticatedRoute } from './components/Auth/AuthenticatedRoute'
import LoginPage from './pages/Login'
import QueryDetails from './pages/QueryDetails'
import HelpStudents from './pages/HelpStudents'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <AuthenticatedRoute>
              <HomePage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path={'/login'}
          element={
            <AuthenticatedRoute inverse redirectTo={'/'}>
              <LoginPage />
            </AuthenticatedRoute>
          }
        />

        <Route
          path={'/query/:queryId'}
          element={
            <AuthenticatedRoute>
              <QueryDetails />
            </AuthenticatedRoute>
          }
        />

        <Route
          path={'/resolve/:queryId'}
          element={
            <AuthenticatedRoute>
              <HelpStudents />
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
