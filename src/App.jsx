import './app/assets/css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from './app/config/config';
import { HomePage } from './app/pages/HomePage';
import { AuthProvider } from './auth/context/AuthContext';
import { StaffManager } from './staff/pages/StaffManager';
import { SurveillancePage } from './surveillance/pages/SurveillancePage';
import { PpePage } from './ppe/pages/PpePage';
import { SafetyPage } from './safety/pages/SafetyPage';
import { HygienePage } from './hygiene/pages/HygienePage';
import { ProtectedRoute } from './auth/components/ProtectedRoute';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer 
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path={router.home} element={<HomePage />} />

          <Route element={<ProtectedRoute />}>
            <Route path={router.staff} element={<StaffManager />} />
            <Route path={router.surveillance} element={<SurveillancePage />} />
            <Route path={router.ppe} element={<PpePage /> } />
            <Route path={router.safety} element={<SafetyPage /> } />
            <Route path={router.hygiene} element={<HygienePage /> } />
          </Route>
         

        </Routes>
      </Router>  
    </AuthProvider>
  )
}
