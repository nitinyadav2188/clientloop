/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/use-toast';
import LandingPage from './pages/LandingPage';
import AuthLayout from './components/layout/AuthLayout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Pipeline from './pages/Pipeline';
import Settings from './pages/Settings';
import Proposals from './pages/Proposals';

import Revenue from './pages/Revenue';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route element={<AuthLayout />}>
            <Route path="/app" element={<Dashboard />} />
            <Route path="/app/revenue" element={<Revenue />} />
            <Route path="/app/leads" element={<Leads />} />
            <Route path="/app/leads/:id" element={<LeadDetail />} />
            <Route path="/app/pipeline" element={<Pipeline />} />
            <Route path="/app/settings" element={<Settings />} />
            <Route path="/app/proposals" element={<Proposals />} />
            {/* Fallback for other routes */}
            <Route path="/app/*" element={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
                  <p className="text-muted-foreground">This feature is under development.</p>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
