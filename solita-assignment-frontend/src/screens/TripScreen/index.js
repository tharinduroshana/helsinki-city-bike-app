import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./TripScreen.css";


const TripScreen = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);

    const fetchTrip = async () => {
        try {
            const trip = await fetch(`http://localhost:4000/trips/${id}`);
            const json = await trip.json();
            setTrip(json);
        } catch (e) {
            console.error(`Error fetching trip with ID: ${id}`, e);
            throw e;
        }
    }

    useEffect(() => {
        (async () => {
            fetchTrip();
        })();
    }, [])

    return (
        <div>
            <div className="trip-details-container">
                <h2>Trip Details</h2>
                <div className="trip-details">
                    <div className="detail">
                        <span className="label">Start Date:</span>
                        <span>{trip && trip["departure_date"]}</span>
                    </div>
                    <div className="detail">
                        <span className="label">End Date:</span>
                        <span>{trip && trip["return_date"]}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Start Place:</span>
                        <span>{trip && trip["departure_station_name"]}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Destination:</span>
                        <span>{trip && trip["return_station_name"]}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Distance Travelled:</span>
                        <span>{trip && trip["covered_distance"]}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Spent Time:</span>
                        <span>{trip && trip["duration"]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TripScreen;