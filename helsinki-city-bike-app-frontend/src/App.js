import './App.css';
import TripsTable from "./screens/TripsTable";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripScreen from "./screens/TripScreen";
import StationsTable from "./screens/StationsTable";
import StationDetails from "./screens/StationDetails";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
        <NavBar />
        <Routes>
            <Route path="/" element={<TripsTable />} />
            <Route path="/stations" element={<StationsTable />} />
            <Route path="/trip/:id" element={<TripScreen />} />
            <Route path="/stations/:id" element={<StationDetails />} />
        </Routes>
    </Router>
  );
}

export default App;
