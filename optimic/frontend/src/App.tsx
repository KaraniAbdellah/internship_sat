import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import OptimicPage from "./pages/OptimicPage";
import NotFoundPage from "./pages/NotFoundPage";
import Terms_of_ServicePage from "./pages/Terms_of_Service";
import ProtectedRoute from "./ProtectedRoute";

// Contexts & Types
import { DatasetContext } from "./global/context/DatasetContext";
import { CustomerDataContext } from "./global/context/CustomerDataContext";
import { DatasetType } from "./global/types/DatasetType";
import { CustomerDataType } from "./global/types/CustomerDataType";
import { OfferResultContext } from "./global/context/OfferResultContext";
import { OfferResultType } from "./global/types/OfferResultType";
import { UserDataType } from "./global/types/UserDataType";
import UserDataContext from "./global/context/UserDataContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [datasets, setDatasets] = useState<DatasetType[]>([]);
  const [activeDataset, setActiveDataset] = useState<DatasetType | null>(null);
  const [customerData, setCustomerData] = useState<CustomerDataType[]>([]);
  const [offreResult, setOffreResult] = useState<OfferResultType[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataType[]>([]);

  // Auth check states
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/me`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Sends the auth_token cookie
        });

        if (response.ok) {
          const data = await response.json();
          setUserData([data.user]);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <UserDataContext.Provider value={{ user_data: userData, setUserData }}>
        <DatasetContext.Provider
          value={{ datasets, setDatasets, activeDataset, setActiveDataset }}
        >
          <CustomerDataContext.Provider
            value={{ customerData, setCustomerData }}
          >
            <OfferResultContext.Provider
              value={{
                offreResult,
                setOffreResult,
                isGenerated,
                setIsGenerated,
              }}
            >
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
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/auth"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/optimic" replace />
                    ) : (
                      <AuthPage />
                    )
                  }
                />
                <Route
                  path="/terms-of-service"
                  element={<Terms_of_ServicePage />}
                />

                {/* Protected Route */}
                <Route
                  path="/optimic"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      isLoading={isLoadingAuth}
                    >
                      <OptimicPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </OfferResultContext.Provider>
          </CustomerDataContext.Provider>
        </DatasetContext.Provider>
      </UserDataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
