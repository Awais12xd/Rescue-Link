import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import ReportInjuredAnimalPage from './pages/ReportInjuredAnimalPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import { Bounce, ToastContainer } from 'react-toastify';
import AnimalLoader from './components/AnimalLoader.jsx';
import AdoptStraysPage from './pages/AdoptStraysPage.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report-injured-animals" element={<ReportInjuredAnimalPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/adopt" element={<AdoptStraysPage />} />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          pauseOnHover
          closeOnClick
          theme="dark"
          transition={Bounce}
        />
      </Router>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <AnimalLoader />
        </div>
      )}
    </>
  );
}

export default App;
