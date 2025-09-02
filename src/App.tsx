import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/base/HomePage";
import { DatasetsPage } from "./pages/datasets/DatasetsPage";
import { DatasetDetailPage } from "./pages/datasets/DatasetDetailPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { AboutPage } from "./pages/base/AboutPage";
import { ContactPage } from "./pages/base/ContactPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { DeveloperDashboardPage } from "./pages/developer/DeveloperDashboardPage";
import { SubscriptionManagementPage } from "./pages/developer/SubscriptionManagementPage";
import { AddSubscriptionPlanPage } from "./pages/developer/AddSubscriptionPlanPage";
import { TermsPage } from "./pages/base/TermsPage";
import { ClientDashboardPage } from "./pages/client/ClientDashboardPage";
import { ClientSettingsPage } from "./pages/client/ClientSettingsPage";
import { DeveloperSettingsPage } from "./pages/developer/DeveloperSettingsPage";
import { ResetLinkSentPage } from "./pages/auth/ResetLinkSentPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";
import { AddDatasetPage } from "./pages/datasets/AddDatasetPage";

import { AddModelPage } from "./pages/models/AddModelPage";
import { ModelsPage } from "./pages/models/ModelsPage";
import { ModelDetailPage } from "./pages/models/ModelDetailPage";

import { CreatorProfilePage } from "./pages/developer/CreatorProfilePage";

import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminModelsPage } from "./pages/admin/AdminModelsPage";
import { AdminDatasetsPage } from "./pages/admin/AdminDatasetsPage";
import { AdminUserDetailPage } from "./pages/admin/AdminUserDetailPage";
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage'
import { AdminSupportPage } from './pages/admin/AdminSupportPage'
import { AdminReportsPage } from './pages/admin/AdminReportsPage'
import { AdminInvoicesPage } from './pages/admin/AdminInvoicesPage'



import { Error403Page } from "./pages/error/Error403Page";
import { Error500Page } from "./pages/error/Error500Page";
import { Error404Page } from "./pages/error/Error404Page";
import { InvoiceDetailPage } from "./pages/admin/InvoiceDetailPage";
import { UnderMaintenancePage } from "./pages/error/UnderMaintenancePage";
import { ModelTestingPage } from "./pages/models/ModelTestingPage";
import { ModelCheckoutPage } from "./pages/models/ModelCheckoutPage";
import { DeveloperProfilePage } from "./pages/developer/DeveloperProfilePage";
import { DeveloperSubscribersPage } from "./pages/developer/DeveloperSubscribersPage";
import { DeveloperPaymentsPage } from "./pages/developer/DeveloperPaymentsPage";
import { DeveloperAnalyticsPage } from "./pages/developer/DeveloperAnalyticsPage";
import { DeveloperReviewsPage } from "./pages/developer/DeveloperReviewsPage";
import { DeveloperModelsPage } from "./pages/developer/DeveloperModelsPage";
import { DeveloperDatasetsPage } from "./pages/developer/DeveloperDatasetsPage";
import { ClientProfilePage } from "./pages/client/ClientProfilePage";
import { ErrorProvider } from "./context/ErrorContext";
import { ErrorModal } from "./Modal/ErrorModal";
import { AuthProvider } from "./context/AuthContext";
import { SuccessProvider } from "./context/SuccessContext";
import { SuccessModal } from "./Modal/SuccessModal";
import { DeveloperUpdateModelPage } from "./pages/developer/DeveloperUpdateModelPage";
import { DeveloperModelDetailPage } from "./pages/developer/DeveloperModelDetailsPage";


function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDevelopeRoute = location.pathname.startsWith("/developer");
  const isClientRoute = location.pathname.startsWith("/client");

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      {!isAdminRoute && !isDevelopeRoute && !isClientRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>

          {/* Models Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/models/:id" element={<ModelDetailPage />} />
          <Route path="/models/test/:modelId" element={<ModelTestingPage />} />
          <Route path="/models/:id/subscriptions" element={<SubscriptionManagementPage />} />
          <Route path="/developer/models/checkout/:modelId" element={<ModelCheckoutPage />} />


          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/datasets/:id" element={<DatasetDetailPage />} />
          <Route path="/datasets/add" element={<AddDatasetPage />} />

          <Route path="/docs" element={<UnderMaintenancePage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-password/send-link" element={<ResetLinkSentPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/creators/:id" element={<CreatorProfilePage />} />

          {/* Developer Routes */}
          <Route path="/developer/dashboard" element={<DeveloperDashboardPage />} />
          <Route path="/developer/settings" element={<DeveloperSettingsPage />} />
          <Route path="/developer/profile" element={<DeveloperProfilePage />} />
          <Route path="/developer/models" element={<DeveloperModelsPage />} />
          <Route path="/developer/datasets" element={<DeveloperDatasetsPage />} />
          <Route path="/developer/analytics" element={<DeveloperAnalyticsPage />} />
          <Route path="/developer/reviews" element={<DeveloperReviewsPage />} />
          <Route path="/developer/payments" element={<DeveloperPaymentsPage />} />
          <Route path="/developer/subscribers" element={<DeveloperSubscribersPage />} />

          <Route path="developer/models/add" element={<AddModelPage />} />
          <Route path="developer/models/:id/update" element={<DeveloperUpdateModelPage />} />
          <Route path="developer/models/:id" element={<DeveloperModelDetailPage />} />

          <Route path="/subscriptions/new" element={<AddSubscriptionPlanPage />} />

          {/* Client Routes */}
          <Route path="/client/dashboard" element={<ClientDashboardPage />} />
          <Route path="/client/settings" element={<ClientSettingsPage />} />
          <Route path="/client/profile" element={<ClientProfilePage />} />



          {/* Error Routes */}
          <Route path="/403" element={<Error403Page />} />
          <Route path="/500" element={<Error500Page />} />
          <Route path="/*" element={<Error404Page />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/users/:id" element={<AdminUserDetailPage />} />
          <Route path="/admin/models" element={<AdminModelsPage />} />
          <Route path="/admin/datasets" element={<AdminDatasetsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/support" element={<AdminSupportPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/invoices" element={<AdminInvoicesPage />} />
          <Route path="/admin/invoices/:id" element={<InvoiceDetailPage />} />
        </Routes>
      </main>
      {!isAdminRoute && !isDevelopeRoute && !isClientRoute && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SuccessProvider>
          <ErrorProvider>
            <SuccessModal />
            <ErrorModal />
            <AppContent />
          </ErrorProvider>
        </SuccessProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
