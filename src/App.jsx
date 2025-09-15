import './app/assets/css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from './app/config/config';
import { AuthProvider } from './auth/context/AuthContext';
import { ProtectedRoute } from './auth/components/ProtectedRoute';
import { HomePage } from './app/pages/HomePage';
import { Error404Page } from './app/pages/Error404Page';
import { StaffManager } from './staff/pages/StaffManager';
import { StaffIdleManager } from './staff/pages/StaffIdleManager';
import { ExamCheckList } from './staff/pages/ExamCheckList';
import { ExamHistory } from './staff/pages/ExamHistory';
import { IncomesExams } from './staff/pages/IncomesExams';
import { EgressExams } from './staff/pages/EgressExams';
import { SurveillancePage } from './surveillance/pages/SurveillancePage';
import { PpePage } from './ppe/pages/PpePage';
import { SafetyPage } from './safety/pages/SafetyPage';
import { HygienePage } from './hygiene/pages/HygienePage';
import { AdminCenter } from './admin/pages/AdminCenter';
import { ExamTypesManager } from './admin/pages/ExamTypesManager';
import { ReportsPage } from './admin/pages/ReportsPage';
import { UsersPage } from './admin/pages/UsersPage';
import { RolesAndPermissions } from './admin/pages/RolesAndPermissions';

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
            <Route path={router.staffIdle} element={<StaffIdleManager />} />
            <Route path={router.medicalStaffHistory} element={<ExamCheckList />} />
            <Route path={router.examHistory} element={<ExamHistory />} />
            <Route path={router.incomeExam} element={<IncomesExams />} />
            <Route path={router.egressExam} element={<EgressExams />} />

            <Route path={router.surveillance} element={<SurveillancePage />} />
            <Route path={router.ppe} element={<PpePage />} />
            <Route path={router.safety} element={<SafetyPage />} />
            <Route path={router.hygiene} element={<HygienePage />} />

            <Route path={router.administration} element={<AdminCenter />} />
            <Route path={router.adminUsers} element={<UsersPage />} />
            <Route path={router.reportsPage} element={<ReportsPage />} />
            <Route path={router.examTypesManager} element={<ExamTypesManager />} />
            <Route path={router.rolesAndPermissions} element={<RolesAndPermissions />} />
          </Route>

          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>  
    </AuthProvider>
  )
}
