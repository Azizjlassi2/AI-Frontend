import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/base/HomePage";
import { ModelsPage } from "./pages/models/ModelsPage";
import { ModelDetailPage } from "./pages/models/ModelDetailPage";
import { DatasetsPage } from "./pages/datasets/DatasetsPage";
import { DatasetDetailPage } from "./pages/datasets/DatasetDetailPage";
import { DocsPage } from "./pages/base/DocsPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { AboutPage } from "./pages/base/AboutPage";
import { ContactPage } from "./pages/base/ContactPage";
import { CreatorProfilePage } from "./pages/developer/CreatorProfilePage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { DeveloperDashboardPage } from "./pages/developer/DeveloperDashboardPage";
import { AddModelPage } from "./pages/models/AddModelPage";
import { SubscriptionManagementPage } from "./pages/developer/SubscriptionManagementPage";
import { ModelDocumentationPage } from "./pages/models/ModelDocumentationPage";
import { AddSubscriptionPlanPage } from "./pages/developer/AddSubscriptionPlanPage";
import { TermsPage } from "./pages/base/TermsPage";
import { ClientDashboardPage } from "./pages/client/ClientDashboardPage";
import { ClientSettingsPage } from "./pages/client/ClientSettingsPage";
import { DeveloperSettingsPage } from "./pages/developer/DeveloperSettingsPage";
import { ResetLinkSentPage } from "./pages/auth/ResetLinkSentPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";
import { AddDatasetPage } from "./pages/datasets/AddDatasetPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminModelsPage } from "./pages/admin/AdminModelsPage";
import { AdminDatasetsPage } from "./pages/admin/AdminDatasetsPage";

import { AdminSettingsPage } from './pages/admin/AdminSettingsPage'
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage'
import { AdminSupportPage } from './pages/admin/AdminSupportPage'
import { AdminReportsPage } from './pages/admin/AdminReportsPage'
import { AdminInvoicesPage } from './pages/admin/AdminInvoicesPage'



import { Error403Page } from "./pages/error/Error403Page";
import { Error500Page } from "./pages/error/Error500Page";
import { Error404Page } from "./pages/error/Error404Page";
import { InvoiceDetailPage } from "./pages/admin/InvoiceDetailPage";
import { ModelPaymentPage } from "./pages/models/ModelPaymentPage";


function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/models/:id" element={<ModelDetailPage />} />
          <Route path="/models/:id/payment" element={<ModelPaymentPage />} />

          <Route path="/models/add" element={<AddModelPage />} />
          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/datasets/:id" element={<DatasetDetailPage />} />
          <Route path="/datasets/add" element={<AddDatasetPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-password/send-link" element={<ResetLinkSentPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/creators/:name" element={<CreatorProfilePage />} />
          <Route path="/dev/dashboard" element={<DeveloperDashboardPage />} />
          <Route path="/dev/settings" element={<DeveloperSettingsPage />} />
          <Route path="/models/:id/subscriptions" element={<SubscriptionManagementPage />} />
          <Route path="/models/:id/docs" element={<ModelDocumentationPage />} />
          <Route path="/subscriptions/new" element={<AddSubscriptionPlanPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/client/dashboard" element={<ClientDashboardPage />} />
          <Route path="/client/settings" element={<ClientSettingsPage />} />
          <Route path="/403" element={<Error403Page />} />
          <Route path="/*" element={<Error404Page />} />
          <Route path="/500" element={<Error500Page />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/models" element={<AdminModelsPage />} />
          <Route path="/admin/datasets" element={<AdminDatasetsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/support" element={<AdminSupportPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/invoices" element={<AdminInvoicesPage />} />
          <Route path="/admin/invoices/:id" element={<InvoiceDetailPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
