import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ModelsPage } from "./pages/ModelsPage";
import { ModelDetailPage } from "./pages/ModelDetailPage";
import { DatasetsPage } from "./pages/DatasetsPage";
import { DatasetDetailPage } from "./pages/DatasetDetailPage";
import { DocsPage } from "./pages/DocsPage";
import { LoginPage } from "./pages/LoginPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CreatorProfilePage } from "./pages/CreatorProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { DeveloperDashboardPage } from "./pages/DeveloperDashboardPage";
import { AddModelPage } from "./pages/AddModelPage";
import { SubscriptionManagementPage } from "./pages/SubscriptionManagementPage";
import { ModelDocumentationPage } from "./pages/ModelDocumentationPage";
import { AddSubscriptionPlanPage } from "./pages/AddSubscriptionPlanPage";
import { TermsPage } from "./pages/TermsPage";

export function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/models/:id" element={<ModelDetailPage />} />
            <Route path="/datasets" element={<DatasetsPage />} />
            <Route path="/datasets/:id" element={<DatasetDetailPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/creators/:name" element={<CreatorProfilePage />} />
            <Route path="/dev/dashboard" element={<DeveloperDashboardPage />} />
            <Route path="/add/model" element={<AddModelPage />} />
            <Route path="/models/:id/subscriptions" element={<SubscriptionManagementPage />} />
            <Route path="/models/:id/docs" element={<ModelDocumentationPage />} />
            <Route path="/subscriptions/new" element={<AddSubscriptionPlanPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
