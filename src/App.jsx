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
import { StaffIdleManager } from './staff/pages/StaffIdleManager';
import { AdminCenter } from './admin/pages/AdminCenter';
import { ExamTypesManager } from './admin/pages/ExamTypesManager';
import { ExamCheckList } from './staff/pages/ExamCheckList';
import { ExamHistory } from './staff/pages/ExamHistory';
import { ReportsPage } from './admin/pages/ReportsPage';
import { IncomesExams } from './staff/pages/IncomesExams';
import { Error404Page } from './app/pages/Error404Page';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer 
          position="top-left"
          limit={1}
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

            <Route path={router.staffIdle} element={<StaffIdleManager />} />
            <Route path={router.medicalStaffHistory} element={<ExamCheckList />} />
            <Route path={router.administration} element={<AdminCenter />} />
            <Route path={router.examTypesManager} element={<ExamTypesManager />} />
            <Route path={router.examHistory} element={<ExamHistory />} />
            <Route  path={router.reportsPage} element={<ReportsPage />} />
            <Route path={router.incomeExam} element={<IncomesExams />} />
          </Route>

          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>  
    </AuthProvider>
  )
}