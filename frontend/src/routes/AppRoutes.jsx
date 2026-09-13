import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

// Guards
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { RoleRoute } from '@/routes/RoleRoute';
import { USER_ROLES } from '@/constants/roles';

// Pages
import LandingPage from '@/features/landing/pages/LandingPage';
import RoleSelectionPage from '@/features/role-selection/pages/RoleSelectionPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import SignupPage from '@/features/auth/pages/SignupPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';
import SupplierOnboardingPage from '@/features/supplier/pages/SupplierOnboardingPage';
import BuyerOnboardingPage from '@/features/buyer/pages/BuyerOnboardingPage';
import AdminOnboardingPage from '@/features/admin/pages/AdminOnboardingPage';
import SupplierDashboardPage from '@/features/supplier/pages/SupplierDashboardPage';
import SupplierProfilePage from '@/features/supplier/pages/SupplierProfilePage';
import CreateListingPage from '@/features/supplier/pages/CreateListingPage';
import ListingDetailPage from '@/features/supplier/pages/ListingDetailPage';
import BuyerDashboardPage from '@/features/buyer/pages/BuyerDashboardPage';
import MatchingEnginePage from '@/features/matching-engine/pages/MatchingEnginePage';
import OpportunityEnginePage from '@/features/opportunity-engine/pages/OpportunityEnginePage';
import MarketplacePage from '@/features/marketplace/pages/MarketplacePage';
import DigitalTwinPage from '@/features/digital-twin/pages/DigitalTwinPage';
import SustainabilityPage from '@/features/sustainability/pages/SustainabilityPage';
import TrustVerificationPage from '@/features/trust-verification/pages/TrustVerificationPage';
import TransactionsPage from '@/features/transactions/pages/TransactionsPage';
import NotificationsPage from '@/features/notifications/pages/NotificationsPage';
import AdminDashboardPage from '@/features/admin/pages/AdminDashboardPage';
import SettingsPage from '@/features/settings/pages/SettingsPage';
import SearchResultsPage from '@/features/search/pages/SearchResultsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Public Marketing & Search */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Public Search & AI Match Results */}
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
      <Route path="/marketplace/search" element={<SearchResultsPage />} />
      <Route path="/ai-match-results" element={<MatchingEnginePage />} />
      <Route path="/ai-matches" element={<MatchingEnginePage />} />
      <Route path="/ai-matching" element={<MatchingEnginePage />} />

      {/* 2. Authentication & Onboarding Flow */}
      <Route element={<AuthLayout />}>
        <Route path="/role-selection" element={<RoleSelectionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/supplier/onboarding" element={<SupplierOnboardingPage />} />
        <Route path="/onboarding/supplier" element={<SupplierOnboardingPage />} />
        <Route path="/buyer/onboarding" element={<BuyerOnboardingPage />} />
        <Route path="/onboarding/buyer" element={<BuyerOnboardingPage />} />
        <Route path="/buyer/profile" element={<BuyerOnboardingPage />} />
        <Route path="/admin/onboarding" element={<AdminOnboardingPage />} />
        <Route path="/onboarding/admin" element={<AdminOnboardingPage />} />
        <Route path="/supplier/dashboard" element={<SupplierDashboardPage />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboardPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/supplier/profile" element={<SupplierProfilePage />} />
        <Route path="/profile" element={<SupplierProfilePage />} />
        <Route path="/supplier/create-listing" element={<CreateListingPage />} />
        <Route path="/supplier/listings/create" element={<CreateListingPage />} />
        <Route path="/create-listing" element={<CreateListingPage />} />
        <Route path="/supplier/listings/:id" element={<ListingDetailPage />} />
        <Route path="/supplier/listing/:id" element={<ListingDetailPage />} />
        <Route path="/supplier/listing-details" element={<ListingDetailPage />} />
        <Route path="/listing-details" element={<ListingDetailPage />} />
        <Route path="/listings/:id" element={<ListingDetailPage />} />
        <Route path="/marketplace/listing/:id" element={<ListingDetailPage />} />
      </Route>

      {/* 3. Authenticated App Workspaces */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>

          {/* Buyer Specific Routes */}
          <Route element={<RoleRoute allowedRoles={[USER_ROLES.BUYER, USER_ROLES.ADMIN]} />}>
            <Route path="/buyer/dashboard" element={<BuyerDashboardPage />} />
          </Route>

          {/* Admin Specific Routes */}
          <Route element={<RoleRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>

          {/* Shared Ecosystem Features */}
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/matching-engine" element={<MatchingEnginePage />} />
          <Route path="/opportunity-engine" element={<OpportunityEnginePage />} />
          <Route path="/digital-twin" element={<DigitalTwinPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/trust-verification" element={<TrustVerificationPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
