import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import OptimicPage from "./pages/OptimicPage";
import NotFoundPage from "./pages/NotFoundPage";
import Terms_of_ServicePage from "./pages/Terms_of_Service";

// Contexts & Types
import { DatasetContext } from "./global/context/DatasetContext";
import { CustomerDataContext } from "./global/context/CustomerDataContext";
import { DatasetType } from "./global/types/DatasetType";
import { CustomerDataType } from "./global/types/CustomerDataType";
import { OfferResultContext } from "./global/context/OfferResultContext";
import { OfferResultType } from "./global/types/OfferResultType";

function App() {
  const [datasets, setDatasets] = useState<DatasetType[]>([]);
  const [activeDataset, setActiveDataset] = useState<DatasetType | null>(null);
  const [customerData, setCustomerData] = useState<CustomerDataType[]>(
    [],
  );
  const [offreResult, setOffreResult] = useState<OfferResultType[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <DatasetContext.Provider
        value={{ datasets, setDatasets, activeDataset, setActiveDataset }}
      >
        <CustomerDataContext.Provider value={{ customerData, setCustomerData }}>
          <OfferResultContext.Provider
            value={{
              offreResult,
              setOffreResult,
              isGenerated,
              setIsGenerated,
            }}
          >
            {/* Global Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#334155",
                  color: "#fff",
                  fontSize: "14px",
                },
                success: {
                  style: {
                    background: "#059669",
                  },
                },
                error: {
                  style: {
                    background: "#e11d48",
                  },
                },
              }}
            />

            <Routes>
              <Route path="/optimic" element={<OptimicPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/terms-of-service"
                element={<Terms_of_ServicePage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </OfferResultContext.Provider>
        </CustomerDataContext.Provider>
      </DatasetContext.Provider>
    </BrowserRouter>
  );
}

export default App;
