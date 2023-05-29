import './App.css';
import TripsTable from "./screens/TripsTable";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripScreen from "./screens/TripScreen";
import StationsTable from "./screens/StationsTable";

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
