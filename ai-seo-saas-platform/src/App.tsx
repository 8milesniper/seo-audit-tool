import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuditProvider } from "./contexts/AuditContext";
import LandingPage from "./components/LandingPage";
import AuditDashboard from "./components/AuditDashboard";

function App() {
  return (
    <AuditProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/audit" element={<AuditDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuditProvider>
  );
}

export default App;
