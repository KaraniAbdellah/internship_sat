// App.tsx
import { BrowserRouter, Routes, Route} from "react-router-dom";

// Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import OptimicPage from "./pages/OptimicPage";
import NotFoundPage from "./pages/NotFoundPage";
import Terms_of_ServicePage from "./pages/Terms_of_Service";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="optimic" element={<OptimicPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="terms-of-service" element={<Terms_of_ServicePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
