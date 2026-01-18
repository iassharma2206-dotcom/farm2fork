import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import WhySection from "./components/WhySection";
import BuyRequestForm from "./components/BuyRequestForm";
import RequestsList from "./components/RequestsList";
import { buyRequestAPI } from "./utils/api";

function MainApp() {
  const formRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const response = await buyRequestAPI.getAll();
      if (response.success) {
        const formattedRequests = response.data.map(req => {
          const dateObj = new Date(req.deliveryDate);
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return {
            _id: req._id,
            id: req._id,
            item: req.item,
            quantity: req.quantity,
            delivery: days[dateObj.getDay()],
            status: req.status === 'open' ? 'Open' : req.status === 'claimed' ? 'Claimed' : req.status,
            recommendations: req.recommendations || [],
          };
        });
        setRequests(formattedRequests);
      }
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const addRequest = (newRequest) => {
    setRequests([newRequest, ...requests]);
  };

  const claimRequest = async (requestId) => {
    try {
      await buyRequestAPI.claim(requestId);
      await loadRequests();
    } catch (error) {
      alert(error.message || "Failed to claim request");
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
      <Hero onScrollToForm={scrollToForm} />
      <Features />
      <WhySection />
      <div className="dashboard-section">
        <div className="container" ref={formRef}>
          <BuyRequestForm onAddRequest={addRequest} />
          <RequestsList requests={requests} onClaimRequest={claimRequest} />
        </div>
      </div>
    </div>
  );
}

export default MainApp;
