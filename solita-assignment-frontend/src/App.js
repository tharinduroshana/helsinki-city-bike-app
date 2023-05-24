import './App.css';
import TripsTable from "./components/TripsTable";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripScreen from "./components/TripScreen";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<TripsTable />} />
            <Route path="/trip/:id" element={<TripScreen />} />
        </Routes>
    </Router>
  );
}

export default App;
