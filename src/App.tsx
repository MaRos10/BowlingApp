import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./pages/Loading/Loading";
import Booking from "./pages/Booking/Booking";
import Confirmation from "./pages/Confirmation/Confirmation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
