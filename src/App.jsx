import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import MainApp from "./MainApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/restaurant" element={<MainApp />} />
        <Route path="/farmer" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


