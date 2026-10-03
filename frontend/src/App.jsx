import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import Results from "./pages/Results";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ================================
          PUBLIC ROUTES
      ================================= */}

      <Route path="/" element={<Login />} />

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* ================================
          PROTECTED ROUTES
      ================================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-resume"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />

      <Route
        path="/insights"
        element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />


      {/* ================================
          FALLBACK
      ================================= */}

      <Route
        path="*"
        element={<Login />}
      />

    </Routes>
  );
}

export default App;