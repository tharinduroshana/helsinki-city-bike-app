import './App.css';
import TripsTable from "./components/TripsTable";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripScreen from "./components/TripScreen";
import StationsTable from "./components/StationsTable";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<TripsTable />} />
            <Route path="/stations" element={<StationsTable />} />
            <Route path="/trip/:id" element={<TripScreen />} />
        </Routes>
    </Router>
  );
}

export default App;
