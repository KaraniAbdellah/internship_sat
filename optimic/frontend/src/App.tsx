// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import OptimicPage from "./pages/OptimicPage";
import NotFoundPage from "./pages/NotFoundPage";
import Terms_of_ServicePage from "./pages/Terms_of_Service";
import { useState } from "react";

import { FileContext } from "./global/context/FileContext";
import { CustomerDataContext } from "./global/context/CustomerDataContext";
import { FileType } from "./global/types/FileType";
import { CustomerDataType } from "./global/types/CustomerDataType";

function App() {
  const [file, setFile] = useState<FileType | null>(null);
  const [customerData, setCustomerData] = useState<CustomerDataType | null>(
    null,
  );
  return (
    <BrowserRouter>
      <FileContext.Provider value={{ file, setFile }}>
        <CustomerDataContext.Provider value={{ customerData, setCustomerData }}>
          <Routes>
            <Route path="optimic" element={<OptimicPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="terms-of-service" element={<Terms_of_ServicePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CustomerDataContext.Provider>
      </FileContext.Provider>
    </BrowserRouter>
  );
}

export default App;
